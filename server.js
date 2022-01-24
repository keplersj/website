import { constants } from "node:fs";
import { readFile, access } from "fs/promises";
import express from "express";
import { createServer as createViteServer } from "vite";
import sharp from "sharp";
import { globby } from "globby";
import makeDir from "make-dir";

const exists = (path) =>
  access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);

await makeDir("./node_modules/.prynne/public/assets/images/");

const app = express();

const vite = await createViteServer({
  server: { middlewareMode: "html" },
});

app.get("/assets/images/:path-opt.:format", async (req, res) => {
  const cachedPath = `./node_modules/.prynne/public/assets/images/${req.params.path}-opt.${req.params.format}`;

  if (await exists(cachedPath)) {
    const cachedFile = await readFile(cachedPath);

    console.log(`Serving Optimized Image from Build Cache ${cachedPath}`);

    return res.send(cachedFile);
  }

  const globResult = await globby(`./public/assets/images/${req.params.path}*`);

  if (globResult.length > 0) {
    const sharpStream = sharp(globResult[0]).toFormat(req.params.format);

    console.log(`Optimizing Image ${globResult[0]} -> ${cachedPath}`);

    // Save the File in the Cache so we only need to optimize once
    await sharpStream.clone().toFile(cachedPath);

    console.log(`Optimized Image Saved ${cachedPath}`);

    const cachedFile = await readFile(cachedPath);
    return res.send(cachedFile);
  }

  res.sendStatus(500);
});

// use vite's connect instance as middleware
app.use(vite.middlewares);

app.listen(3000);

console.log("Server Running on https://localhost:3000/");
