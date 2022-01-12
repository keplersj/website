import { defineConfig } from "vite";
import { readdir, readFile } from "fs/promises";
import frontmatter from "gray-matter";
import { babel } from "@rollup/plugin-babel";
import vitePluginRehype from "vite-plugin-rehype";
import rehypePlugins from "./src/util/rehype-preset-build.js";
import dataVirtualFile from "./src/util/vite-plugin-virtual-file.js";

async function markdownArray(directory, prefix) {
  const files = await readdir(directory);

  return Promise.all(
    files.map(async (file) => ({
      url: `/${prefix}/${file.replace(".md", ".html")}`,
      slug: file.replace(".md", ""),
      markdownUrl: `/${prefix}/${file}`,
      frontmatter: {
        ...frontmatter(
          await readFile(`${directory}/${file}`, {
            encoding: "utf-8",
          }),
          {
            excerpt: (file) => {
              file.excerpt = file.content.slice(0, 140) + "...";
            },
          }
        ),
        content: undefined,
      },
    }))
  );
}

const postsJson = JSON.stringify(await markdownArray("./public/blog", "blog"));

const portfolioPiecesJson = JSON.stringify(
  await markdownArray("./public/portfolio", "portfolio")
);

async function markdownFiles(srcDirectory, publicDirectory) {
  const files = await readdir(srcDirectory);
  return Promise.all(
    files.map(async (file) => ({
      markdownUrl: `${publicDirectory}${file}`,
      frontmatter: {
        ...frontmatter(
          await readFile(`${srcDirectory}/${file}`, {
            encoding: "utf-8",
          })
        ).data,
      },
    }))
  );
}

const experienceJson = JSON.stringify(
  await markdownFiles("./public/about/experience", "/about/experience/")
);

const educationJson = JSON.stringify(
  await markdownFiles("./public/about/education", "/about/education/")
);

export default defineConfig({
  publicDir: process.env.PREBUILD ? "node_modules/.prynne/public" : "public",
  esbuild: {
    jsxFactory: "h",
    jsxInject: `import {h} from 'atomico'`,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      plugins: ["@emotion"],
    }),
    dataVirtualFile("@kepler/blog", postsJson),
    dataVirtualFile("@kepler/portfolio", portfolioPiecesJson),
    dataVirtualFile("@kepler/experience", experienceJson),
    dataVirtualFile("@kepler/education", educationJson),
    vitePluginRehype({
      plugins: rehypePlugins,
    }),
  ].filter(Boolean),
  optimizeDeps: {
    include: ["@vaadin/router", "atomico"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
