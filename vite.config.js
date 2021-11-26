import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir } from "fs/promises";

function pageAndDir(path, options) {
  return {
    [path]: options,
    [`${path}/index`]: options,
  };
}

async function pagesFromDir(directory, prefix, template) {
  const files = await readdir(directory);
  const pages = files.map((filename) => filename.replace(".md", ""));
  return Object.fromEntries(
    pages.flatMap((post) =>
      Object.entries(
        pageAndDir(`${prefix}/${post}`, {
          template: template,
          entry: `src/main.js`,
        })
      )
    )
  );
}

const postPages = await pagesFromDir(
  "./content/posts",
  "blog",
  "src/blog-post.html"
);
const portfolioPages = await pagesFromDir(
  "./content/portfolio",
  "portfolio",
  "src/blog-post.html"
);

const pages = {
  index: { template: "src/home-page.html", entry: `src/main.js` },
  ...pageAndDir("blog", {
    template: "src/blog-index.html",
    entry: `src/main.js`,
  }),
  ...postPages,
  ...pageAndDir("portfolio", {
    template: "src/portfolio-index.html",
    entry: `src/main.js`,
  }),
  ...portfolioPages,
};

export default defineConfig({
  plugins: [virtualHtmlTemplate({ pages })],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map((page) => [page[0], `${page[0]}.html`])
      ),
    },
  },
});
