import { useRemark } from "atomico-use-remark";
import { Plugin } from "unified";
import yaml from "js-yaml";
import rehypeRewrite from "rehype-rewrite";
import remarkPresetClient from "../util/remark-preset-client";
import rehypePresetClient from "../util/rehype-preset-client";
import { useEffect } from "atomico";
import "../components/Image"; // Need to load component if document has `img`

interface MarkdownHookOptions {
  additionalRemarkPlugins: Plugin[];
  additionalRehypePlugins: Plugin[];
}

const defaultMarkdownHookOptions: MarkdownHookOptions = {
  additionalRemarkPlugins: [],
  additionalRehypePlugins: [],
};

export function useMarkdown(
  documentUrl: string,
  options: Partial<MarkdownHookOptions> = defaultMarkdownHookOptions
) {
  const [tree, setContent, vfile] = useRemark("", {
    rehypePlugins: [
      ...(rehypePresetClient as Plugin[]),
      [
        rehypeRewrite,
        {
          selector: "img",
          rewrite: (node) => {
            if (node.type === "element" && node.properties.src) {
              node.tagName = "kepler-image";
            }
          },
        },
      ] as unknown as Plugin,
      ...(options.additionalRehypePlugins ||
        defaultMarkdownHookOptions.additionalRehypePlugins),
    ],
    remarkPlugins: [
      ...(remarkPresetClient as Plugin[]),
      () => (root, file) => {
        const yamlNode = root.children.find((child) => child.type === "yaml");
        if (yamlNode) {
          const parsed = yaml.load(yamlNode.value);
          file.data.frontmatter = parsed;
        }
      },
      ...(options.additionalRemarkPlugins ||
        defaultMarkdownHookOptions.additionalRemarkPlugins),
    ],
  });

  useEffect(() => {
    async function run() {
      const fetched = await fetch(documentUrl);
      const content = await fetched.text();
      setContent(content);
    }

    run();
  }, [documentUrl]);

  return [tree, vfile];
}
