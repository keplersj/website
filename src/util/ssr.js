import express from "express";
import puppeteer from "puppeteer";

/**
 *
 * @param {Object} options
 * @param {Boolean} options.verbose
 * @param {Boolean} options.headless
 * @param {Array<String>} options.puppeteerArgs
 * @param {Number} options.port
 * @returns {import("vite".Plugin)}
 */
export default function vitePluginLazySSR(options = {}) {
  const verboseLoggingEnabled = options.verbose || true;
  const log = (output) => {
    if (verboseLoggingEnabled) {
      console.log(output);
    }
  };

  const headless = options.headless || true;
  const additionalPuppeteerArgs = options.puppeteerArgs || [];
  const port = options.port || 3000;

  let publicDir = "public";

  return {
    name: "puppeteer",

    configResolved: (config) => {
      publicDir = config.publicDir;
    },

    transformIndexHtml: async (html, context) => {
      log(`Rendering ${context.path}`);

      const app = express();
      app.get(context.path, (req, res) => {
        res.send(html);
      });

      app.use(express.static(publicDir));

      for (const [path, value] of Object.entries(context.bundle)) {
        app.get("/" + path, (req, res) => {
          res.type(path.split(".").pop());
          res.send(value.code || value.source || "");
        });
      }

      const server = app.listen(port);

      const browser = await puppeteer.launch({
        headless,
        args: [
          //   // IMPORTANT: you can't render shadow DOM without this flag
          //   // getInnerHTML will be undefined without it
          "--enable-experimental-web-platform-features",
          ...additionalPuppeteerArgs,
        ].filter(Boolean),
      });
      const page = await browser.newPage();

      await page.goto(`http://localhost:${port}${context.path}`, {
        timeout: 0,
        waitUntil: ["domcontentloaded", "networkidle0"],
      });

      const renderedHtml =
        "<!DOCTYPE html>\n<html>\n" +
        (await page.$eval(
          "html",
          /* istanbul ignore next */
          (element) => {
            return element.getInnerHTML({ includeShadowRoots: true });
          }
        )) +
        "\n</html>\n";
      await browser.close();
      server.close();

      log(`Rendered ${context.path}`);

      return renderedHtml;
    },
  };
}
