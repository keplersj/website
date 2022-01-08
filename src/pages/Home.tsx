import { c } from "atomico";
import styled from "styled-custom-elements";
import "../components/Hero";
import "../components/Markdown";
import posts from "@kepler/blog";
import "starstuff-components";
import { Image } from "../components/Image";

const Content = styled("section")`
  padding: 1em;

  @media screen and (min-width: 512px) {
    padding: 1em 2.5em;
  }

  @media screen and (min-width: 1024px) {
    padding: 1em 5em;
  }
`;

customElements.define("kepler-home-content", Content, { extends: "section" });

const ContentCarousel = styled.div`
  display: flex;
  overflow: scroll;
`;

customElements.define("kepler-home-carousel", ContentCarousel, {
  extends: "div",
});

const Featured = styled("starstuff-card")`
  min-width: 20em;
  max-width: 25vw;
`;

customElements.define("kepler-home-featured", Featured);

const FeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

customElements.define("kepler-home-featured-content", FeaturedContent, {
  extends: "div",
});

const FeaturedImage = styled(Image)`
  picture {
    display: block;
    min-width: 20em;
    max-width: 25vw;
    position: relative;
    padding-top: ${(3 / 4) * 100}%;
  }

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    position: absolute;
    top: 0;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

customElements.define("kepler-home-featured-image", FeaturedImage);

const FlexReadMoreLink = styled.a`
  align-self: flex-end;
`;

customElements.define("kepler-home-flex-read-more", FlexReadMoreLink, {
  extends: "a",
});

function component() {
  return (
    <host>
      <kepler-hero data-hydrate></kepler-hero>
      <main>
        <section is="kepler-home-content">
          <h2>Biography</h2>
          <kepler-markdown
            src="/about/biography.md"
            data-hydrate
          ></kepler-markdown>
          <a href="/about">Read More...</a>
        </section>
        <section is="kepler-home-content">
          <h2>Blog Posts</h2>
          <div is="kepler-home-carousel">
            {posts
              .sort(
                (a, b) =>
                  new Date(b.frontmatter?.data?.date).getTime() -
                  new Date(a.frontmatter?.data?.date).getTime()
              )
              .map((post, index) => (
                <Featured key={`post-${index}`}>
                  {post.frontmatter.data.featured_image && (
                    <a href={post.url}>
                      <FeaturedImage
                        src={
                          new URL(
                            post.frontmatter.data.featured_image,
                            new URL(post.markdownUrl, window.location.href)
                          ).href
                        }
                      ></FeaturedImage>
                    </a>
                  )}
                  <div is="kepler-home-featured-content">
                    <a href={post.url}>
                      <h3>{post.frontmatter.data.title}</h3>
                    </a>
                    <time datetime={post.frontmatter.data.date}>
                      {new Date(post.frontmatter.data.date).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </time>
                    <p>
                      {post.frontmatter?.data?.description ||
                        post.frontmatter.excerpt}
                    </p>
                    <a is="kepler-home-flex-read-more" href={post.url}>
                      Read More...
                    </a>
                  </div>
                </Featured>
              ))}
          </div>
        </section>
      </main>
    </host>
  );
}

customElements.define("kepler-home", c(component));
