import { c } from "atomico";
import { useChildNodes } from "@atomico/hooks/use-child-nodes";
import "starstuff-components";
import { css } from "@emotion/css";

function component() {
  const [childNodes] = useChildNodes();
  const content =
    childNodes && childNodes.length !== 0
      ? childNodes[0].textContent || "[]"
      : "[]";
  const posts: any[] = JSON.parse(content);

  return (
    <host
      class={css`
        display: block;
        margin-left: 2em;
        margin-right: 2em;
      `}
    >
      <h1>Portfolio</h1>
      <div
        class={css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
        `}
      >
        {posts.map((post) => (
          <starstuff-card
            key={post.url}
            data-hydrate
            class={css`
              @media screen and (min-width: 1024px) {
                min-height: 192px;
              }
              @media screen and (max-width: 512px) {
                max-width: 100vw;
              }
              @media screen and (min-width: 768px) {
                max-width: 33vw;
              }
              @media screen and (min-width: 1024px) {
                max-width: 25vw;
              }
            `}
          >
            <div
              class={css`
                padding: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
              `}
            >
              <a href={"/" + post.url}>
                <h2>{post.frontmatter?.data?.title || post.url}</h2>
              </a>
              <p>{post.frontmatter?.data?.description}</p>
            </div>
          </starstuff-card>
        ))}
      </div>
    </host>
  );
}

customElements.define("kepler-portfolio-index", c(component));
