import { c } from "atomico";
import styled from "styled-custom-elements";
import posts from "@kepler/blog";
import "../components/Navbar";
import "@a11y/skip-navigation";
import "starstuff-components";
import { Image } from "../components/Image";
import { useHead } from "atomico-use-head";
import { useSEO } from "../util/use-seo";

const Main = styled.main`
  display: block;
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

customElements.define("kepler-blog-main", Main, { extends: "main" });

const Card = styled("starstuff-card")`
  display: flex;

  @media screen and (min-width: 512px) {
    min-height: 192px;
  }
  @media screen and (max-width: 512px) {
    flex-direction: column;
  }
`;

customElements.define("kepler-blog-card", Card);

const Info = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

customElements.define("kepler-blog-info", Info, { extends: "div" });

const Figure = styled.figure`
  height: 100%;
  /* min-width: 256px; */
  max-width: 55em;
  @media screen and (max-width: 321px) {
    display: none;
  }
`;

customElements.define("kepler-blog-figure", Figure, { extends: "figure" });

const FeaturedImage = styled(Image)`
  picture {
    display: block;
    /* min-width: 20em; */
    /* max-width: 25vw; */
    max-width: 55em;
    position: relative;
    padding-top: ${(3 / 4) * 100}%;

    @media screen and (min-width: 512px) {
      min-width: 20em;
    }
  }

  img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    @media screen and (max-width: 512px) {
      border-bottom-left-radius: 0;
      border-top-right-radius: 10px;
    }

    position: absolute;
    top: 0;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

customElements.define("kepler-blog-featured-image", FeaturedImage);

function component() {
  useSEO({
    title: "Blog",
    path: "/blog",
  });

  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <main is="kepler-blog-main">
        <h1>Blog</h1>
        {posts
          .sort(
            (a, b) =>
              new Date(b.frontmatter?.data?.date).getTime() -
              new Date(a.frontmatter?.data?.date).getTime()
          )
          .map((post) => (
            <Card key={post.url} data-hydrate>
              {post.frontmatter.data.featured_image && (
                <a href={post.url}>
                  <figure is="kepler-blog-figure">
                    <FeaturedImage
                      src={
                        new URL(
                          post.frontmatter.data.featured_image,
                          new URL(post.markdownUrl, window.location.href)
                        ).href
                      }
                    ></FeaturedImage>
                  </figure>
                </a>
              )}
              <div is="kepler-blog-info">
                <a href={post.url}>
                  <h2>{post.frontmatter?.data?.title || post.url}</h2>
                </a>
                <span>
                  Published{" "}
                  <time datetime={post.frontmatter?.data?.date}>
                    {new Date(post.frontmatter?.data?.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </span>
                <p>
                  {post.frontmatter?.data?.description ||
                    post.frontmatter.excerpt}
                </p>
              </div>
            </Card>
          ))}
      </main>
    </host>
  );
}

const BlogIndexPage = c(component);
export default BlogIndexPage;

customElements.define("kepler-blog-index", BlogIndexPage);
