import { defineConfig } from "vite";
import virtualHtmlTemplate from "vite-plugin-virtual-html-template";
import { readdir, readFile } from "fs/promises";
import frontmatter from "gray-matter";
import { babel } from "@rollup/plugin-babel";
import vitePluginRehype from "vite-plugin-rehype";
import rehypePlugins from "./src/util/rehype-preset-build.js";
import viteJsdomSsg from "./src/util/vite-jsdom-ssg.js";

function pageAndDir(path, options) {
  return {
    [path]: options,
    [`${path}/index`]: options,
  };
}

const defaultPage = {
  template: "src/index.html",
  entry: `src/main.js`,
};

async function pagesFromDir(directory, prefix) {
  const files = await readdir(directory);
  const pages = await Promise.all(
    files.map(async (filename) =>
      Object.entries(
        pageAndDir(`${prefix}/${filename.replace(".md", "")}`, defaultPage)
      )
    )
  );
  return Object.fromEntries(pages.flat());
}

const postPages = await pagesFromDir("./public/blog", "blog");
const portfolioPages = await pagesFromDir("./public/portfolio", "portfolio");

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

const pages = {
  index: defaultPage,
  ...pageAndDir("blog", defaultPage),
  ...postPages,
  ...pageAndDir("portfolio", defaultPage),
  ...portfolioPages,
  ...pageAndDir("about", defaultPage),
  "ipfs-404": defaultPage,
  ...pageAndDir("404", defaultPage),
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
    process.env.SSG && viteJsdomSsg,
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
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map((page) => [page[0], `${page[0]}.html`])
      ),
    },
  },
});
