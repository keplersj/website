import { c, Props } from "atomico";
import { Plugin } from "unified";
import rehypeRewrite from "rehype-rewrite";
import yaml from "js-yaml";
import styled from "styled-custom-elements";
import { Image } from "../components/Image";
import { useHead } from "atomico-use-head";
import { useMarkdown } from "../util/use-markdown";

const Article = styled.article`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;
customElements.define("kepler-markdown-post-article", Article, {
  extends: "article",
});

const ContentContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

customElements.define("kepler-markdown-post-content", ContentContainer, {
  extends: "div",
});

function component(props: Props<typeof component.props>) {
  const [tree, vfile] = useMarkdown(props.src!, {
    additionalRehypePlugins: [
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
    ],
    additionalRemarkPlugins: [
      () => (root, file) => {
        const yamlNode = root.children.find((child) => child.type === "yaml");
        if (yamlNode) {
          const parsed = yaml.load(yamlNode.value);
          file.data.frontmatter = parsed;
        }
      },
    ],
  });

  const title: String = (vfile as any).data.frontmatter?.title;
  const datePublished: Date = (vfile as any).data.frontmatter?.date;
  const featuredImageUrl: String = (vfile as any).data.frontmatter
    ?.featured_image;

  useHead(
    {
      title: `${title} | Kepler Sticka-Jones`,
    },
    {
      hydrate: true,
    }
  );

  return (
    <host>
      <Article>
        <header>
          <h1>{title}</h1>
          <div>
            <span>
              Published{" "}
              <time datetime={datePublished}>
                {new Date(datePublished).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
          </div>
          {featuredImageUrl && (
            <figure>
              <Image src={featuredImageUrl}></Image>
            </figure>
          )}
        </header>
        <ContentContainer>{tree}</ContentContainer>
      </Article>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown-post", c(component));
