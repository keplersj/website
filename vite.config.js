import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import handlebars from "vite-plugin-handlebars";
import frontmatter from "gray-matter";
import { babel } from "@rollup/plugin-babel";
import lazySSRPlugin from "vite-plugin-lazy-ssr";
import vitePluginRehype from "vite-plugin-rehype";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeMinifyJsonScript from "rehype-minify-json-script";
import rehypeHighlight from "rehype-highlight";
import rehypeRewrite from "rehype-rewrite";

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
            markdownUrl: `/${prefix}/${filename}`,
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
  "./public/blog",
  "blog",
  "src/templates/blog-post.html"
);
const portfolioPages = await pagesFromDir(
  "./public/portfolio",
  "portfolio",
  "src/templates/portfolio-piece.html"
);

const postsJson = JSON.stringify(
  Object.entries(postPages)
    // We don't want duplicates, so only include the "canonical" index file copy of the page.
    .filter((page) => page[0].endsWith("index"))
    .map((page) => ({
      url: `${page[0]}.html`,
      frontmatter: {
        ...frontmatter(page[1].data.rawMarkdownFile),
        content: undefined,
      },
    }))
);

const pages = {
  index: {
    template: "src/templates/home-page.html",
    entry: `src/main.js`,
    data: {
      biographyMarkdownUrl: "/about/biography.md",
      postsJson,
    },
  },
  ...pageAndDir("blog", {
    template: "src/templates/blog-index.html",
    entry: `src/main.js`,
    data: {
      postsJson,
    },
  }),
  ...postPages,
  ...pageAndDir("portfolio", {
    template: "src/templates/portfolio-index.html",
    entry: `src/main.js`,
  }),
  ...portfolioPages,
  ...pageAndDir("about", {
    template: "src/templates/about-page.html",
    entry: `src/main.js`,
  }),
};

const pageData = Object.fromEntries(
  Object.entries(pages).map((page) => [`/${page[0]}.html`, page[1].data || {}])
);

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxInject: `import {h} from 'atomico'`,
  },
  plugins: [
    virtualHtmlTemplate({ pages }),
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      plugins: ["@emotion"],
    }),
    !process.env.NO_SSR &&
      lazySSRPlugin({
        puppeteerArgs: [process.env.CI && "--no-sandbox"].filter(Boolean),
      }),
    vitePluginRehype({
      plugins: [
        [
          rehypeRewrite,
          {
            selector: "html",
            rewrite: (node) => {
              console.log(node);
              if (node.type === "element") {
                delete node.properties.dataPrerender;
              }
            },
          },
        ],
        rehypeMinifyWhitespace,
        rehypeRemoveComments,
        rehypeMinifyJsonScript,
        rehypeHighlight,
      ],
    }),
  ].filter(Boolean),
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map((page) => [page[0], `${page[0]}.html`])
      ),
    },
  },
});
