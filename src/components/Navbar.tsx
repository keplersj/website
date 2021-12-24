import { c, html } from "atomico";
import { css } from "@emotion/css";
import "starstuff-components";
import bannerUrlLight from "../../content/assets/banner.jpg";
import bannerUrlDark from "../../content/assets/banner_dark.jpg";

const AnchorStyle = css`
  color: #141414;
  font-weight: 600;
  text-decoration: none;
  :hover,
  :focus {
    text-decoration: underline;
  }
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

function component() {
  return (
    <host>
      <nav
        class={css`
          width: 100vw;
          height: 3rem;
          margin-bottom: 1em;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          background-image: url(${bannerUrlLight});

          @media (prefers-color-scheme: dark) {
            background-image: url(${bannerUrlDark});
          }
        `}
      >
        <div
          class={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 100vw;
            height: 3rem;
            padding-right: 1rem;
            padding-left: 1rem;
            backdrop-filter: blur(5px);
          `}
        >
          <div
            class={css`
              max-width: 50%;
              text-align: start;
            `}
          >
            <a class={AnchorStyle} href="/">
              Kepler Sticka-Jones
            </a>
          </div>
          <div
            class={css`
              max-width: 50%;
              text-align: end;

              & > :not(:last-child) {
                margin-right: 1em;
              }
            `}
          >
            <a class={AnchorStyle} href="/blog">
              Blog
            </a>
            <a class={AnchorStyle} href="/portfolio">
              Portfolio
            </a>
            <a class={AnchorStyle} href="/about">
              About
            </a>
          </div>
        </div>
      </nav>
    </host>
  );
}

component.props = {};

customElements.define("kepler-navbar", c(component));
