import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import handlebars from "vite-plugin-handlebars";
import { posthtmlPlugin } from "vite-plugin-posthtml";
import HTMLNano from "htmlnano";

function pageAndDir(path, options) {
  return {
    [path]: options,
    [`${path}/index`]: options,
  };
}

async function pagesFromDir(directory, prefix, template) {
  const files = await readdir(directory);
  const pages = await Promise.all(
    files.map(async (filename) =>
      Object.entries(
        pageAndDir(`${prefix}/${filename.replace(".md", "")}`, {
          template: template,
          entry: `src/main.js`,
          data: {
            markdownSource: `${directory}/${filename}`,
            rawMarkdownFile: await readFile(`${directory}/${filename}`),
          },
        })
      )
    )
  );
  return Object.fromEntries(pages.flat());
}

const postPages = await pagesFromDir(
  "./content/posts",
  "blog",
  "src/templates/blog-post.html"
);
const portfolioPages = await pagesFromDir(
  "./content/portfolio",
  "portfolio",
  "src/templates/portfolio-piece.html"
);

const pages = {
  index: { template: "src/templates/home-page.html", entry: `src/main.js` },
  ...pageAndDir("blog", {
    template: "src/templates/blog-index.html",
    entry: `src/main.js`,
  }),
  ...postPages,
  ...pageAndDir("portfolio", {
    template: "src/templates/portfolio-index.html",
    entry: `src/main.js`,
  }),
  ...portfolioPages,
};

const pageData = Object.fromEntries(
  Object.entries(pages).map((page) => [`/${page[0]}.html`, page[1].data || {}])
);

export default defineConfig({
  plugins: [
    virtualHtmlTemplate({ pages }),
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    // posthtmlPlugin({
    //   plugins: [
    //     HTMLNano({
    //       removeComments: false, // Disable the module "removeComments"
    //       collapseWhitespace: "conservative", // Pass options to the module "collapseWhitespace"
    //     }),
    //   ],
    // }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map((page) => [page[0], `${page[0]}.html`])
      ),
    },
  },
});
