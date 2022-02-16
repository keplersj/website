import { c, Props } from "atomico";
import { NavBar } from "../components/Navbar";
import "@a11y/skip-navigation";
import { useMarkdown } from "../util/use-markdown";
import { Article } from "../components/Article";
import { MarkdownContentContainer } from "../components/MarkdownContentContainer";
import styled from "styled-custom-elements";
import { readableColor } from "polished";
import { useSEO } from "../util/use-seo";

const SupportingDetails = styled.div`
  margin: 0.5em 0;

  @media screen and (min-width: 1024px) {
    margin: 0.5em;
  }
`;

customElements.define(
  "kepler-portfolio-supporting-details",
  SupportingDetails,
  { extends: "div" }
);

const SupportingDetail = styled.span`
  --kepler-portfolio-supporting-detail-color: 0, 0, 0;
  --kepler-portfolio-supporting-detail-text-color: 255, 255, 255;

  text-transform: uppercase;
  margin-bottom: 1em;

  @media screen and (max-width: 1023px) {
    :not(:last-child) {
      ::after {
        content: " · ";
      }
    }
  }

  /* The parallelogram effect is really cool, but I can't get it to consistently work at anything less than a laptop-class display. Will get it to work one day. */
  @media screen and (min-width: 1024px) {
    position: relative;
    padding: 0.3em 0.45em;

    /* stylelint-disable value-keyword-case */
    /* stylelint-disable function-name-case */
    color: var(--kepler-portfolio-supporting-detail-text-color);

    a {
      color: var(--kepler-portfolio-supporting-detail-text-color);
    }
    /* stylelint-enable function-name-case */

    ::before,
    ::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: skew(20deg);
      background-color: var(--kepler-portfolio-supporting-detail-color);
      z-index: -1;
      content: "";
      position: absolute;
      white-space: nowrap;
    }
    /* stylelint-enable value-keyword-case */
  }
`;

customElements.define("kepler-portfolio-supporting-detail", SupportingDetail, {
  extends: "span",
});

function component({ location }: Props<typeof component.props>) {
  const src =
    "/portfolio/" + location?.params.slug.replace(".html", "") + ".md";
  const [tree, vfile] = useMarkdown(src);

  const title: string = (vfile as any).data.frontmatter?.title;
  const frontmatter = (vfile as any).data.frontmatter || {};

  useSEO({
    title,
  });

  return (
    <host>
      <skip-button></skip-button>
      <NavBar data-hydrate></NavBar>
      <skip-anchor></skip-anchor>
      <link
        as="fetch"
        href={src}
        crossorigin=""
        type="text/markdown"
        rel="preload"
      />
      <Article>
        <header>
          <h1>{title}</h1>
          <SupportingDetails>
            {frontmatter.type && (
              <SupportingDetail
                style={`
                --kepler-portfolio-supporting-detail-color: slategray;
                --kepler-portfolio-supporting-detail-text-color:${readableColor(
                  "slategray"
                )};`}
              >
                Type: {frontmatter.type.join(", ")}
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.status && (
              <SupportingDetail
                style={`
                --kepler-portfolio-supporting-detail-color: darkolivegreen;
                --kepler-portfolio-supporting-detail-text-color:${readableColor(
                  "darkolivegreen"
                )};`}
              >
                Status: {frontmatter.status.join(", ")}
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.role && (
              <SupportingDetail
                style={`
                --kepler-portfolio-supporting-detail-color: maroon;
                --kepler-portfolio-supporting-detail-text-color:${readableColor(
                  "maroon"
                )};`}
              >
                Role: {frontmatter.role.join(", ")}
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.homepage && (
              <SupportingDetail
                style={`
                --kepler-portfolio-supporting-detail-color: #3d7e9a;
                --kepler-portfolio-supporting-detail-text-color:${readableColor(
                  "#3d7e9a"
                )};`}
              >
                <a href={frontmatter.homepage}>Homepage</a>
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.github_repo && (
              <SupportingDetail
                style={`
                --kepler-portfolio-supporting-detail-color: #24292e;
                --kepler-portfolio-supporting-detail-text-color:${readableColor(
                  "#24292e"
                )};`}
              >
                <a href={`https://www.github.com/${frontmatter.github_repo}`}>
                  GitHub
                </a>
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.npm_package_name && (
              <SupportingDetail
                style={`
              --kepler-portfolio-supporting-detail-color: #C12127;
              --kepler-portfolio-supporting-detail-text-color:${readableColor(
                "#C12127"
              )};`}
              >
                <a
                  href={`https://www.npmjs.com/package/${frontmatter.npm_package_name}`}
                >
                  npm
                </a>
                {"​\u200B"}
              </SupportingDetail>
            )}
            {frontmatter.rubygems_gem_name && (
              <SupportingDetail
                style={`
              --kepler-portfolio-supporting-detail-color: #e9573f;
              --kepler-portfolio-supporting-detail-text-color:${readableColor(
                "#e9573f"
              )};`}
              >
                <a
                  href={`https://rubygems.org/gems/${frontmatter.rubygems_gem_name}`}
                >
                  RubyGems
                </a>
                {"​\u200B"}
              </SupportingDetail>
            )}
          </SupportingDetails>
        </header>
        <main>
          <MarkdownContentContainer>{tree}</MarkdownContentContainer>
        </main>
      </Article>
    </host>
  );
}

component.props = {
  location: Object,
};

class Element extends c(component) {
  async onBeforeEnter(location, commands, router) {
    const src =
      "/portfolio/" + location?.params.slug.replace(".html", "") + ".md";
    const srcFetch = await fetch(src);

    if (!srcFetch.ok) {
      return commands.redirect("/404");
    }
  }
}

export default Element;

customElements.define("kepler-portfolio-piece", Element);
