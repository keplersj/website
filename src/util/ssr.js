import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeMinifyJsonScript from "rehype-minify-json-script";
import rehypeHighlight from "rehype-highlight";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import express from "express";
import puppeteer from "puppeteer";

export default function vitePluginLazySSR() {
  return {
    name: "html-transform",
    transformIndexHtml: async (html, context) => {
      // console.log(context);

      let renderedHtml = html;

      if (!process.env.NO_SSR) {
        console.log(`Rendering ${context.path}`);

        const app = express();
        app.get(context.path, (req, res) => {
          res.send(html);
        });

        // TODO: Set this using Vite config API?
        app.use(express.static("public"));

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
          timeout: 0,
          waitUntil: ["domcontentloaded", "networkidle0"],
        });

        renderedHtml =
          "<!DOCTYPE html><html>" +
          (await page.$eval(
            "html",
            /* istanbul ignore next */
            (element) => {
              return element.getInnerHTML({ includeShadowRoots: true });
            }
          )) +
          "</html>";
        await browser.close();
        server.close();
      }

      const engine = unified()
        .use(rehypeParse)
        .use([
          rehypeMinifyWhitespace,
          rehypeRemoveComments,
          rehypeMinifyJsonScript,
          rehypeHighlight,
        ])
        .use(rehypeStringify);

      const processed = await engine.process(renderedHtml);

      console.log(`Rendered ${context.path}`);

      return String(processed);
    },
  };
}
