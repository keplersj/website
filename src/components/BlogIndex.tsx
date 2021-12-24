import { c, css, useRef } from "atomico";
import { useSlot } from "@atomico/hooks/use-slot";
import "starstuff-components";

function component() {
  const inlineContentRef = useRef();
  const inlineContentChildNodes = useSlot(inlineContentRef);
  const content =
    inlineContentChildNodes && inlineContentChildNodes.length !== 0
      ? inlineContentChildNodes[0].textContent
      : "[]";
  const posts = JSON.parse(content);

  return (
    <host shadowDom>
      <slot name="posts" ref={inlineContentRef}>
        <script type="application/json"></script>
      </slot>
      <h1>Blog</h1>
      {posts
        .sort(
          (a, b) =>
            new Date(b.frontmatter?.data?.date) -
            new Date(a.frontmatter?.data?.date)
        )
        .map((post) => (
          <starstuff-card key={post.url}>
            <div>
              <a href={"/" + post.url}>
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
              <p>{post.frontmatter?.data?.description}</p>
            </div>
          </starstuff-card>
        ))}
    </host>
  );
}

component.styles = css`
  :host {
    display: block;
    max-width: 55em;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 55em) {
    :host {
      margin-left: 2em;
      margin-right: 2em;
    }
  }

  starstuff-card {
    display: flex;
  }

  @media screen and (min-width: 512px) {
    starstuff-card {
      min-height: 192px;
    }
  }
  @media screen and (max-width: 512px) {
    starstuff-card {
      flex-direction: column;
    }
  }

  starstuff-card > div {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

customElements.define("kepler-blog-index", c(component));
