import { c } from "atomico";
import { css } from "@emotion/css";
import "../components/Hero";
import "../components/Markdown";

function component() {
  return (
    <host>
      <kepler-hero data-hydrate></kepler-hero>
      <main
        class={css`
          padding: 1em;

          @media screen and (min-width: 512px) {
            padding: 1em 2.5em;
          }

          @media screen and (min-width: 1024px) {
            padding: 1em 5em;
          }
        `}
      >
        <h2>Biography</h2>
        <kepler-markdown
          src="/about/biography.md"
          data-hydrate
        ></kepler-markdown>
        <a href="/about">Read More...</a>
      </main>
    </host>
  );
}

customElements.define("kepler-home", c(component));
