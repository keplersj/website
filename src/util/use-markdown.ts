import { useRemark } from "atomico-use-remark";
import { Plugin } from "unified";
import remarkPresetClient from "../util/remark-preset-client";
import rehypePresetClient from "../util/rehype-preset-client";
import { useEffect } from "atomico/core";

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
      ...(options.additionalRehypePlugins ||
        defaultMarkdownHookOptions.additionalRehypePlugins),
    ],
    remarkPlugins: [
      ...(remarkPresetClient as Plugin[]),
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
