import { c, css, html } from "atomico";
import "starstuff-components";
import bannerUrlLight from "../../content/assets/banner.jpg";
import bannerUrlDark from "../../content/assets/banner_dark.jpg";
import avatarUrl from "../../content/assets/avatar.jpg";

function component() {
  return html`
    <host shadowDom>
      <section>
        <div class="heroBody">
          <div class="container">
            <div class="columns">
              <div class="columnCentered">
                <div class="avatar">
                  <img src=${avatarUrl} />
                </div>
                <h1>Kepler Sticka-Jones</h1>
                <div class="centered">
                  <starstuff-hyperbutton
                    style="color: #fff !important"
                    href="/blog/"
                    >Blog</starstuff-hyperbutton
                  >
                  <starstuff-hyperbutton
                    style="color: #fff !important"
                    href="/portfolio/"
                  >
                    Portfolio
                  </starstuff-hyperbutton>
                  <starstuff-hyperbutton
                    style="color: #fff !important"
                    href="/about/"
                    >About</starstuff-hyperbutton
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </host>
  `;
}

component.styles = css`
  :host {
    /* position: relative; */
    min-height: 66vh;
  }

  :host::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    /* height: 100%; */
    min-height: 66vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    z-index: -100;

    background-image: url(${bannerUrlLight});

    @media (prefers-color-scheme: dark) {
      background-image: url(${bannerUrlDark});
    }
  }

  section {
    min-height: 66vh;
    backdrop-filter: blur(20px);
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .avatar {
    margin-bottom: 10px;
    border-radius: 140px;
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 200px;
    height: 200px;
  }

  .avatar > img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .heroBody {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 3rem 1.5rem;
    color: #fff;
  }

  .container {
    text-align: center !important;
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0 auto;
    position: relative;
    width: auto;
    @media screen and (min-width: 1024px) {
      max-width: 960px;
    }
    @media screen and (min-width: 1216px) {
      max-width: 1152px;
    }
  }

  .columns {
    align-items: center;
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -0.75rem;
    :last-child {
      margin-bottom: -0.75rem;
    }
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }

  .columnCentered {
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding: 0.75rem;
    flex: none;
    width: 66.6666%;
  }

  /* :host div {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 1.5rem;
  } */

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 1.5rem;
  }
`;

customElements.define("kepler-hero", c(component));
