import { defineConfig } from "vite";
import { readdir, readFile } from "fs/promises";
import frontmatter from "gray-matter";
import { babel } from "@rollup/plugin-babel";
import vitePluginRehype from "vite-plugin-rehype";
import rehypePlugins from "./src/util/rehype-preset-build.js";
import dataVirtualFile from "./src/util/vite-plugin-virtual-file.js";
import { VitePWA } from "vite-plugin-pwa";

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
  // publicDir: process.env.PREBUILD ? "node_modules/.prynne/public" : "public",
  publicDir: process.env.PREBUILD ? ".prynne/bake/public" : "public",
  esbuild: {
    jsxFactory: "h",
    jsxInject: `import {h} from 'atomico'`,
  },
  plugins: [
    VitePWA({
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Kepler Sticka-Jones",
        short_name: "Kepler S-J",
        start_url: "/",
        description:
          "Kepler Sticka-Jones is a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development.",
        background_color: "#ffffff",
        theme_color: "#4a4a4a",
        display: "minimal-ui",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      plugins: [
        [
          "@emotion",
          {
            importMap: {
              "styled-custom-elements": {
                default: { canonicalImport: ["@emotion/styled", "default"] },
              },
            },
          },
        ],
      ],
    }),
    dataVirtualFile("@kepler/blog", postsJson),
    dataVirtualFile("@kepler/portfolio", portfolioPiecesJson),
    dataVirtualFile("@kepler/experience", experienceJson),
    dataVirtualFile("@kepler/education", educationJson),
    vitePluginRehype({
      plugins: rehypePlugins,
    }),
  ],
  optimizeDeps: {
    include: ["atomico"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
