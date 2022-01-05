import { c } from "atomico";
import styled from "styled-custom-elements";
import { css } from "@emotion/css";
import "starstuff-components";
import bannerUrlLight from "../../public/assets/images/banner.jpg";
import bannerUrlDark from "../../public/assets/images/banner_dark.jpg";

const Anchor = styled.a`
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

customElements.define("kepler-navbar-anchor", Anchor, { extends: "a" });

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
            <a is="kepler-navbar-anchor" href="/">
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
            <a is="kepler-navbar-anchor" href="/blog">
              Blog
            </a>
            <a is="kepler-navbar-anchor" href="/portfolio">
              Portfolio
            </a>
            <a is="kepler-navbar-anchor" href="/about">
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
