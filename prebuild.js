import { cpus } from "node:os";
import makeDir from "make-dir";
import copy from "cpy";
import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { globby } from "globby";
import sharp from "sharp";
import { format, parse } from "node:path";
import PQueue from "p-queue";
import ora from "ora";

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
  return [
    async () => {
      const output = format(changeExtWithSuffix(path, "jpeg", "-opt"));
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      await sharpStream.clone().jpeg().toFile(output).catch(console.error);

      return `Created ${output}`;
    },
    async () => {
      const output = format(changeExtWithSuffix(path, "avif", "-opt"));
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      await sharpStream.clone().avif().toFile(output).catch(console.error);
      return `Created ${output}`;
    },
    async () => {
      const output = format(changeExtWithSuffix(path, "webp", "-opt"));
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      await sharpStream.clone().webp().toFile(output).catch(console.error);
      return `Created ${output}`;
    },
  ];
}

function sharpResize(sharpStream, path, width, height, options = {}) {
  return [
    async () => {
      const output = format(
        changeExtWithSuffix(path, "jpeg", `-opt-${width}-${height}`)
      );
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      await sharpStream
        .clone()
        .resize(width, height === "retain" ? undefined : height, options)
        .jpeg()
        .toFile(output)
        .catch(console.error);
      return `Created ${output}`;
    },
    async () => {
      const output = format(
        changeExtWithSuffix(path, "avif", `-opt-${width}-${height}`)
      );
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      sharpStream
        .clone()
        .resize(width, height === "retain" ? undefined : height, options)
        .avif()
        .toFile(output)
        .catch(console.error);
      return `Created ${output}`;
    },
    async () => {
      const output = format(
        changeExtWithSuffix(path, "webp", `-opt-${width}-${height}`)
      );
      if (await exists(output)) {
        return `Output ${output} exists. Passing.`;
      }

      sharpStream
        .clone()
        .resize(width, height === "retain" ? undefined : height, options)
        .webp()
        .toFile(output)
        .catch(console.error);
      return `Created ${output}`;
    },
  ];
}

const spinner = ora("Processing Images").start();
const queue = new PQueue({ concurrency: cpuCount * 2 });

let count = 0;

queue.on("active", () => {
  spinner.start(
    `Working on item #${++count}.  Size: ${queue.size}  Pending: ${
      queue.pending
    }`
  );
});

queue.on("completed", (result) => {
  spinner.succeed(`Completed item ${count} ${result}`);
});

queue.on("error", (error) => {
  spinner.warn(`Error on item ${count}: ${error}`);
});

queue.addAll(
  images
    .filter((filename) => !filename.includes("-opt"))
    .flatMap((filename) => {
      const path = parse(filename);

      const sharpStream = sharp(filename, {
        failOnError: false,
      });

      const sizeBreakpoints = [
        256, 512, 768, 1024,
        // 720p
        1280,
        // 1080p
        1920,
        // 4k
        3840,
        // 5k
        5120,
        // 8k
        7680,
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
