import { cpus } from "node:os";
import makeDir from "make-dir";
import copy from "cpy";
import { constants, createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import { globby } from "globby";
import sharp from "sharp";
import { format as formatPath, parse } from "node:path";
import PQueue from "p-queue";
import ora from "ora";

sharp.simd(true);
sharp.concurrency(1);

const cpuCount = cpus().length;

await makeDir("./node_modules/.prynne/");
await copy("./public/", "./node_modules/.prynne/", { parents: true });

const images = await globby("./node_modules/.prynne/public", {
  expandDirectories: {
    extensions: ["png", "jpg", "jpeg"],
  },
});

function changeExtWithSuffix(path, extension, suffix = "") {
  const baseParts = path.base.split(".");

  baseParts.pop();

  return {
    ...path,
    base: [...baseParts, suffix, "." + extension].join(""),
    ext: "." + extension,
    name: [...baseParts, suffix, "." + extension].join(""),
  };
}

const exists = (path) =>
  access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);

function sharpOptimize(sharpStream, path) {
  const sharpInstance = sharpStream.clone();

  return ["jpeg", "avif", "webp"].map((format) => async () => {
    const output = formatPath(changeExtWithSuffix(path, format, "-opt"));
    if (await exists(output)) {
      return `Output ${output} exists. Passing.`;
    }

    await sharpInstance.toFormat(format).toFile(output).catch(console.error);

    return `Created ${output}`;
  });
}

function sharpResize(sharpStream, path, width, height, options = {}) {
  const sharpInstance = sharpStream
    .clone()
    .resize(width, height === "retain" ? undefined : height, options);

  return ["jpeg", "avif", "webp"].map((format) => async () => {
    const output = formatPath(
      changeExtWithSuffix(path, format, `-opt-${width}-${height}`)
    );
    if (await exists(output)) {
      return `Output ${output} exists. Passing.`;
    }

    await sharpInstance.toFormat(format).toFile(output).catch(console.error);
    return `Created ${output}`;
  });
}

const spinner = ora("Processing Images").start();
// const queue = new PQueue({ concurrency: process.env.CI ? 1 : cpuCount });
const queue = new PQueue({ concurrency: cpuCount });

let count = 0;

queue.on("active", () => {
  spinner.start(
    `Working on item #${++count}.  Size: ${queue.size}  Pending: ${
      queue.pending
    }`
  );
});

queue.on("completed", (result) => {
  spinner.succeed(
    `Completed item ${count} ${result}.  Size: ${queue.size}  Pending: ${queue.pending}`
  );
});

queue.on("error", (error) => {
  spinner.warn(
    `Error on item ${count}: ${error}.  Size: ${queue.size}  Pending: ${queue.pending}`
  );
});

// Set a Budget of half of CI allocation (in seconds) for all images processing
const totalImageBudget = (15 / 2) * 60;

console.log("Seconds Allocated to Image Processing: " + totalImageBudget);

const opsPerImage = /* formats */ 3 * /* transformations */ 2;

const totalOperations =
  images.filter((filename) => !filename.includes("-opt")).length * opsPerImage;

console.log("Total Operations to Run: " + totalOperations);

// At least one second. Sharp will go to infinite if provided a timeout of 0.
const operationBudget = Math.round(totalImageBudget / totalOperations) || 1;

console.log("Budgetted Time Per Operation: " + operationBudget);

queue.addAll(
  images
    .filter((filename) => !filename.includes("-opt"))
    .flatMap((filename) => {
      const path = parse(filename);

      const sharpStream = sharp(filename, {
        failOnError: false,
        // Might improve performance on CI?
        // sequentialRead: true,
      }).timeout({ seconds: operationBudget });

      const sizeBreakpoints = [
        256, 512, 768, 1024,
        // 720p
        1280,
        // 1080p
        1920,
        // 4k
        // 3840,
        // 5k
        // 5120,
        // 8k
        // 7680,
      ];

      return [
        ...sharpOptimize(sharpStream, path),
        ...sizeBreakpoints.flatMap((width) =>
          sharpResize(sharpStream, path, width, "retain", {
            withoutEnlargement: true,
          })
        ),
        // 16:9 Images
        // ...sizeBreakpoints.flatMap((width) =>
        //   sharpResize(sharpStream, path, width, width * (9 / 16), {
        //     withoutEnlargement: true,
        //   })
        // ),
      ];
    })
);
