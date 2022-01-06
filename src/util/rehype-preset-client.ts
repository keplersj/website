import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeShiftHeading from "rehype-shift-heading";
import rehypeHighlight from "rehype-highlight";

export default [
  rehypeSlug,
  rehypeAutolinkHeadings,
  [rehypeShiftHeading, { shift: 1 }],
  rehypeHighlight,
];
