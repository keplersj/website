import rehypeMinifyWhitespace from "rehype-minify-whitespace";
import rehypeRemoveComments from "rehype-remove-comments";
import rehypeMinifyJsonScript from "rehype-minify-json-script";
import rehypeHighlight from "rehype-highlight";
import rehypeRewrite from "rehype-rewrite";

export default [
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
];
