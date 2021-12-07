import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import handlebars from "vite-plugin-handlebars";

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
            rawMarkdownFile: await readFile(`${directory}/${filename}`, {
              encoding: "utf-8",
            }).then((file) => file.toString()),
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
    data: {
      postsJson: JSON.stringify(
        Object.entries(postPages)
          // We don't want duplicates, so only include the "canonical" index file copy of the page.
          .filter((page) => page[0].endsWith("index"))
          .map((page) => ({
            url: page[0],
            date: page[1],
          }))
      ),
    },
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
