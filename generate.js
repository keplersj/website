import { cpus } from "node:os";
import { readdir, writeFile } from "node:fs/promises";
import { fork } from "node:child_process";
import { parse } from "node:path";
import pMap from "p-map";
import makeDir from "make-dir";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
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

const mapper = async (fileName) => {
  fileName = "/" + fileName + ".html";
  console.log(`Rendering ${fileName}`);

  const process = fork("./prerender.js", [fileName]);

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
  console.log(`Rendered ${fileName}`);
};

await pMap(files, mapper, { concurrency: process.env.CI ? 1 : cpuCount / 2 });
