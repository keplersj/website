import { c, css, html } from "atomico";
import "starstuff-components";
import bannerUrlLight from "../../content/assets/banner.jpg";
import bannerUrlDark from "../../content/assets/banner_dark.jpg";

function component() {
  return html`
    <host>
      <nav class="background">
        <div class="contentContainer">
          <div class="leftContent">
            <a href="/">Kepler Sticka-Jones</a>
          </div>
          <div class="rightContent">
            <a href="/blog">Blog</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/about">About</a>
          </div>
        </div>
      </nav>
    </host>
  `;
}

component.props = {};

component.styles = css`
  .background {
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
  }

  .contentContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 100vw;
    height: 3rem;
    padding-right: 1rem;
    padding-left: 1rem;
    backdrop-filter: blur(5px);
  }

  .leftContent {
    max-width: 50%;
    text-align: start;
  }

  .rightContent {
    max-width: 50%;
    text-align: end;
  }

  .rightContent > :not(:last-child) {
    margin-right: 1em;
  }

  a {
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
  }
`;

customElements.define("kepler-navbar", c(component));
