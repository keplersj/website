import { readFile } from "node:fs/promises";
import jsdomGlobal from "global-jsdom";
import "whatwg-fetch";
import express from "express";

const app = express();

app.use(express.static("./dist/server"));

const server = app.listen(3000);

const file = await readFile("./dist/server/index.html");

jsdomGlobal(file.toString(), {
  url: `http://localhost:3000${process.argv[2] || "/index.html"}`,
});

const { sheet } = await import("@emotion/css");
// const { options } = await import("atomico");

// speedy is disabled when the app is being prerendered so that styles render into the DOM
// speedy is significantly faster though so it should only be disabled during prerendering
sheet.speedy(false);

// Optimize Atomico for SSR
// options.sheet = false;
// options.ssr = true;

try {
  await import("./dist/server/index.js");
} catch (e) {
  console.error(e);
}

// Uses a MutationObserver to wait until the Document is not mutated for 100 ms
await new Promise((resolve) => {
  const timer = setTimeout(() => {
    observer.disconnect();
    resolve();
  }, 100);

  const observer = new MutationObserver(() => {
    timer.refresh();
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

const styles = Array.from(
  window.document.head.querySelectorAll("style[data-emotion=css]")
)
  .map((style) => style.outerHTML)
  .join();

const body = window.document.body.innerHTML;

process.send({
  styles,
  body,
});

server.close();
