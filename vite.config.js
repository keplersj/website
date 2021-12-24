import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import handlebars from "vite-plugin-handlebars";
import frontmatter from "gray-matter";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeMinifyJsonScript from "rehype-minify-json-script";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import express from "express";
import puppeteer from "puppeteer";

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
      rawBiographyFile: await readFile("./content/about/biography.md", {
        encoding: "utf-8",
      }).then((file) => file.toString()),
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
  assetsInclude: ["content/**/*"],
  plugins: [
    virtualHtmlTemplate({ pages }),
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    {
      name: "html-transform",
      transformIndexHtml: async (html, context) => {
        // console.log(context);

        console.log(`Rendering ${context.path}`);

        const app = express();
        app.get(context.path, (req, res) => {
          res.send(html);
        });

        for (const [path, value] of Object.entries(context.bundle)) {
          app.get("/" + path, (req, res) => {
            res.type(path.split(".").pop());
            res.send(value.code || value.source || "");
          });
        }

        const server = app.listen(3000);

        const browser = await puppeteer.launch({
          // headless: false,
          args: [
            //   ...puppeteer.defaultArgs(),
            //   // IMPORTANT: you can't render shadow DOM without this flag
            //   // getInnerHTML will be undefined without it
            "--enable-experimental-web-platform-features",
            process.env.CI && "--no-sandbox",
          ].filter(Boolean),
        });
        const page = await browser.newPage();

        await page.goto(`http://localhost:3000${context.path}`, {
          waitUntil: ["domcontentloaded", "networkidle0"],
        });

        const renderedHtml =
          "<html>" +
          (await page.$eval(
            "html",
            /* istanbul ignore next */
            (element) => {
              return element.getInnerHTML({ includeShadowRoots: true });
            }
          )) +
          "</html>";
        await browser.close();

        const engine = unified()
          .use(rehypeParse)
          .use([
            rehypeMinifyWhitespace,
            rehypeRemoveComments,
            rehypeMinifyJsonScript,
          ])
          .use(rehypeStringify);

        const processed = await engine.process(renderedHtml);

        server.close();

        console.log(`Rendered ${context.path}`);

        return String(processed);
      },
    },
  ],
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
