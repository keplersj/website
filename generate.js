import { cpus } from "node:os";
import { readdir, writeFile } from "node:fs/promises";
import { fork } from "node:child_process";
import { parse } from "node:path";
import PQueue from "p-queue";
import ora from "ora";
import makeDir from "make-dir";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import express from "express";
import rehypePresetBuild from "./src/util/rehype-preset-build.js";

const cpuCount = cpus().length;

const pageAndDir = (path) => [path, `${path}/index`];

async function pagesFromDir(directory, prefix) {
  const files = await readdir(directory);

  return files.flatMap((filename) =>
    pageAndDir(`${prefix}/${filename.replace(".md", "")}`)
  );
}

const postPages = await pagesFromDir("./public/blog", "blog");
const portfolioPages = await pagesFromDir("./public/portfolio", "portfolio");

const files = [
  "index",
  ...pageAndDir("blog"),
  ...postPages,
  ...pageAndDir("portfolio"),
  ...portfolioPages,
  ...pageAndDir("about"),
  "ipfs-404",
  ...pageAndDir("404"),
];

const engine = unified()
  .use(rehypeParse)
  .use(rehypePresetBuild)
  .use(rehypeStringify);

const app = express();

app.use(express.static("./dist/server"));

const server = await new Promise((resolve) => {
  const server = app.listen(() => {
    resolve(server);
  });
});

const port = server.address().port;

const spinner = ora("Rendering Pages").start();
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
  spinner.succeed(
    `Completed item ${count} ${result}.  Size: ${queue.size}  Pending: ${queue.pending}`
  );
});

queue.on("error", (error) => {
  spinner.warn(
    `Error on item ${count}: ${error}.  Size: ${queue.size}  Pending: ${queue.pending}`
  );
});

queue.on("idle", () => {
  console.log(`Queue is idle.  Size: ${queue.size}  Pending: ${queue.pending}`);
  console.log("Closing server.");
  server.close();
});

queue.addAll(
  files.map((fileName) => async () => {
    fileName = "/" + fileName + ".html";

    const process = fork("./prerender.js", [fileName, port]);

    let rendered = "";

    process.on("message", (message) => {
      rendered = message;
    });

    await new Promise((resolve, reject) => {
      process.on("exit", resolve);
      process.on("error", reject);
    });

    const destination = `./dist/client${fileName}`;
    const { dir } = parse(destination);

    await makeDir(dir);

    await writeFile(
      destination,
      await engine
        .process(rendered.replace('<base href="/">', ""))
        .then((file) => file.toString("utf-8"))
    );

    return fileName;
  })
);
