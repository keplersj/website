import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import frontmatter from "gray-matter";
import { babel } from "@rollup/plugin-babel";
import vitePluginRehype from "vite-plugin-rehype";
import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeMinifyJsonScript from "rehype-minify-json-script";
import rehypeHighlight from "rehype-highlight";
import rehypeRewrite from "rehype-rewrite";
import { fork } from "node:child_process";

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

const postPages = await pagesFromDir("./public/blog", "blog", "src/index.html");
const portfolioPages = await pagesFromDir(
  "./public/portfolio",
  "portfolio",
  "src/index.html"
);

const postsJson = JSON.stringify(
  Object.entries(postPages)
    // We don't want duplicates, so only include the "canonical" index file copy of the page.
    .filter((page) => page[0].endsWith("index"))
    .map((page) => ({
      url: `${page[0]}.html`,
      slug: page[0].split("/").at(-2),
      markdownUrl: page[1].data.markdownUrl,
      frontmatter: {
        ...frontmatter(page[1].data.rawMarkdownFile),
        content: undefined,
      },
    }))
);

const portfolioPiecesJson = JSON.stringify(
  Object.entries(portfolioPages)
    // We don't want duplicates, so only include the "canonical" index file copy of the page.
    .filter((page) => page[0].endsWith("index"))
    .map((page) => ({
      url: `${page[0]}.html`,
      slug: page[0].split("/").at(-2),
      markdownUrl: page[1].data.markdownUrl,
      frontmatter: {
        ...frontmatter(page[1].data.rawMarkdownFile),
        content: undefined,
      },
    }))
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
          }).then((file) => file.toString())
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

const pages = {
  index: {
    template: "src/index.html",
    entry: `src/main.js`,
  },
  ...pageAndDir("blog", {
    template: "src/index.html",
    entry: `src/main.js`,
  }),
  ...postPages,
  ...pageAndDir("portfolio", {
    template: "src/index.html",
    entry: `src/main.js`,
    data: {
      portfolioPiecesJson,
    },
  }),
  ...portfolioPages,
  ...pageAndDir("about", {
    template: "src/index.html",
    entry: `src/main.js`,
  }),
};

const dataVirtualFile = (virtualModuleId, data) => {
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: `virtual-file (${virtualModuleId})`, // required, will show up in warnings and errors
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${data}`;
      }
    },
  };
};

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxInject: `import {h} from 'atomico'`,
  },
  plugins: [
    virtualHtmlTemplate({ pages }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      plugins: ["@emotion"],
    }),
    dataVirtualFile("@kepler/blog", postsJson),
    dataVirtualFile("@kepler/portfolio", portfolioPiecesJson),
    dataVirtualFile("@kepler/experience", experienceJson),
    dataVirtualFile("@kepler/education", educationJson),
    process.env.SSG && {
      name: "ssg",
      transformIndexHtml: async (html, context) => {
        console.log(context.path);

        const child = fork("./prerender.js", [context.path]);

        let rendered = { styles: "", body: "" };

        child.on("message", (message) => {
          rendered = message;
        });

        await new Promise((resolve) => {
          child.on("exit", resolve);
        });

        return html
          .replace("<!-- SSG-Style -->", rendered.styles)
          .replace("<!-- SSG-Body -->", rendered.body);
      },
    },
    vitePluginRehype({
      plugins: [
        [
          rehypeRewrite,
          {
            selector: "html",
            rewrite: (node) => {
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
  optimizeDeps: {
    include: ["@vaadin/router", "atomico"],
  },
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
