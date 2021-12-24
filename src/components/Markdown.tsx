import { c, useState, useCallback, Props } from "atomico";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeShiftHeading from "rehype-shift-heading";
import yaml from "js-yaml";
import "webcomponent-markdown";

// This is so hacky and I hate it, but I don't want to have to configure unified plugins more than once

function component(props: Props<typeof component.props>) {
  const [title, setTitle] = useState("");

  const frontMatterExtract = useCallback(
    () => (tree) => {
      const yamlNode = tree.children.find((child) => child.type === "yaml");
      if (yamlNode) {
        // console.dir(yamlNode);
        const parsed = yaml.load(yamlNode.value);
        // console.log(parsed);
        // setMetadata({
        //   title: parsed.title,
        //   datePublished: parsed.date,
        // });
        setTitle(parsed.title);
        return;
      } else {
        // console.log("No YAML node found");
      }
    },
    [setTitle]
  );

  return (
    <host>
      <header>
        <h1>{title}</h1>
      </header>
      <remark-markdown
        src={props.src}
        remarkPlugins={[remarkGfm, remarkFrontmatter]}
        rehypePlugins={[
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypeShiftHeading, { shift: 1 }],
        ]}
        data-hydrate
      ></remark-markdown>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown", c(component));
