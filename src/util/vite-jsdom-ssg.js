import { fork } from "node:child_process";

export default {
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
};
