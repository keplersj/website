import { c, html, useRef } from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import "webcomponent-markdown";

// This is so hacky and I hate it, but I don't want to have to configure unified plugins more than once

function component() {
  const inlineContentRef = useRef();
  const inlineContentChildNodes = useSlot(inlineContentRef);

  return html`
    <host shadowDom>
      <slot name="content" ref="${inlineContentRef}">
        <script type="text/markdown"></script>
      </slot>
      <remark-markdown
        remarkPlugins=${[remarkGfm, remarkFrontmatter]}
        rehypePlugins=${[rehypeSlug, rehypeAutolinkHeadings]}
      >
        <!-- prettier-ignore -->
        <script slot="content">
          ${inlineContentChildNodes[0]?.textContent || ""}
        </script>
      </remark-markdown>
    </host>
  `;
}

customElements.define("kepler-markdown", c(component));
