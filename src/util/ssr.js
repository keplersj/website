import express from "express";
import puppeteer from "puppeteer";

export default function vitePluginLazySSR() {
  return {
    name: "html-transform",
    transformIndexHtml: async (html, context) => {
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

      console.log(`Rendered ${context.path}`);

      return renderedHtml;
    },
  };
}
