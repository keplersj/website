import { c } from "atomico";
import posts from "@kepler/portfolio";
import "starstuff-components";
import "@a11y/skip-navigation";
import "../components/Navbar";
import styled from "styled-custom-elements";
import { useHead } from "atomico-use-head";
import { useSEO } from "../util/use-seo";

const Portfolio = styled.main`
  display: block;
  margin-left: 2em;
  margin-right: 2em;
`;

customElements.define("kepler-portfolio-main", Portfolio, { extends: "main" });

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

customElements.define("kepler-portfolio-content", Content, { extends: "div" });

const Card = styled("starstuff-card")`
  width: 20em;
`;

customElements.define("kepler-portfolio-card", Card);

const CardContent = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

customElements.define("kepler-portfolio-card-content", CardContent, {
  extends: "div",
});

function component() {
  useSEO({
    title: "Portfolio",
  });

  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <Portfolio>
        <h1>Portfolio</h1>
        <Content>
          {posts.map((post) => (
            <Card key={post.url} data-hydrate>
              <CardContent>
                <a href={post.url}>
                  <h2>{post.frontmatter?.data?.title || post.url}</h2>
                </a>
                <p>
                  {post.frontmatter?.data?.description ||
                    post.frontmatter.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </Content>
      </Portfolio>
    </host>
  );
}

customElements.define("kepler-portfolio-index", c(component));
