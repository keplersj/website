import { cpus } from "node:os";
import { readFile, writeFile } from "node:fs/promises";
import { fork } from "node:child_process";
import { parse } from "node:path";
import pMap from "p-map";
import makeDir from "make-dir";

const cpuCount = cpus().length;

const filesJson = await readFile("./dist/server/files.json");
const files = JSON.parse(filesJson);

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

  await writeFile(destination, rendered.replace('<base href="/">', ""));
  console.log(`Rendered ${fileName}`);
};

await pMap(files, mapper, { concurrency: cpuCount / 2 });
