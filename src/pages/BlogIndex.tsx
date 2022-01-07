import { c } from "atomico";
import { css } from "@emotion/css";
import posts from "@kepler/blog";
import "../components/Navbar";
import "@a11y/skip-navigation";
import "starstuff-components";

function component() {
  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <main
        class={css`
          display: block;
          max-width: 55em;
          margin-left: auto;
          margin-right: auto;

          @media (max-width: 55em) {
            margin-left: 2em;
            margin-right: 2em;
          }
        `}
      >
        <h1>Blog</h1>
        {posts
          .sort(
            (a, b) =>
              new Date(b.frontmatter?.data?.date).getTime() -
              new Date(a.frontmatter?.data?.date).getTime()
          )
          .map((post) => (
            <starstuff-card
              key={post.url}
              data-hydrate
              class={css`
                display: flex;

                @media screen and (min-width: 512px) {
                  min-height: 192px;
                }
                @media screen and (max-width: 512px) {
                  flex-direction: column;
                }
              `}
            >
              <div
                class={css`
                  margin: 1rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                `}
              >
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
                <p>{post.frontmatter?.data?.description}</p>
              </div>
            </starstuff-card>
          ))}
      </main>
    </host>
  );
}

customElements.define("kepler-blog-index", c(component));
