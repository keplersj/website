import { c, useState, useCallback, Props } from "atomico";
import remarkPreset from "../util/remark-preset-client";
import rehypePreset from "../util/rehype-preset-client";
import rehypeRewrite from "rehype-rewrite";
import yaml from "js-yaml";
import "webcomponent-markdown";
import { css } from "@emotion/css";
import { Image } from "../components/Image";
import { useHead } from "atomico-use-head";

// This is so hacky and I hate it, but I don't want to have to configure unified plugins more than once

function component(props: Props<typeof component.props>) {
  const [title, setTitle] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  useHead(
    {
      title: `${title} | Kepler Sticka-Jones`,
    },
    {
      hydrate: true,
    }
  );

  const frontMatterExtract = useCallback(
    () => (tree) => {
      const yamlNode = tree.children.find((child) => child.type === "yaml");
      if (yamlNode) {
        const parsed = yaml.load(yamlNode.value);
        setTitle(parsed.title);
        setDatePublished(String(parsed.date));
        setFeaturedImageUrl(parsed.featured_image);
        return;
      }
    },
    [setDatePublished, setTitle, setFeaturedImageUrl]
  );

  const relativeImgUrl = (imgUrl: string): string =>
    new URL(imgUrl, new URL(props.src!, window.location.href)).href;

  return (
    <host>
      <article
        class={css`
          max-width: 55em;
          margin-left: auto;
          margin-right: auto;

          @media (max-width: 55em) {
            margin-left: 2em;
            margin-right: 2em;
          }
        `}
      >
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
              <Image src={relativeImgUrl(featuredImageUrl)}></Image>
            </figure>
          )}
        </header>
        <remark-markdown
          src={props.src}
          class={css`
            img {
              max-width: 100%;
              height: auto;
            }
          `}
          remarkPlugins={[...remarkPreset, frontMatterExtract]}
          rehypePlugins={[
            ...rehypePreset,
            [
              rehypeRewrite,
              {
                selector: "img",
                rewrite: (node) => {
                  if (node.type === "element" && node.properties.src) {
                    node.properties.src = relativeImgUrl(node.properties.src);
                    node.tagName = "kepler-image";
                  }
                },
              },
            ],
          ]}
          data-hydrate
        ></remark-markdown>
      </article>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown-post", c(component));
