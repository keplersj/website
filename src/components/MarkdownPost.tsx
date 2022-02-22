import { c, Props } from "atomico";
import { Image } from "../components/Image";
import { useHead } from "atomico-use-head";
import { useMarkdown } from "../util/use-markdown";
import { MarkdownContentContainer } from "./MarkdownContentContainer";
import { Article } from "./Article";
import styled from "styled-custom-elements";
import { useSEO } from "../util/use-seo";

const FeaturedImage = styled.figure`
  picture {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    padding: ${(9 / 16) * 100}% 0 0 0;
  }

  picture img {
    display: block;
    /* max-width: 100%; */
    /* max-height: 100%; */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

customElements.define("kepler-blog-post-featured-image", FeaturedImage, {
  extends: "figure",
});

function component(props: Props<typeof component.props>) {
  const [tree, vfile] = useMarkdown(props.src!);

  const title: string = (vfile as any).data.frontmatter?.title;
  const datePublished: Date = (vfile as any).data.frontmatter?.date;
  const featuredImageUrl: string = (vfile as any).data.frontmatter
    ?.featured_image;

  useSEO({
    title,
  });

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
            <FeaturedImage>
              <Image src={featuredImageUrl}></Image>
            </FeaturedImage>
          )}
        </header>
        <main>
          <MarkdownContentContainer>{tree}</MarkdownContentContainer>
        </main>
      </Article>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown-post", c(component));
