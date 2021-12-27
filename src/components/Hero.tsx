import { c } from "atomico";
import { css } from "@emotion/css";
import "starstuff-components";
import bannerUrlLight from "../../content/assets/banner.jpg";
import bannerUrlDark from "../../content/assets/banner_dark.jpg";
import avatarUrl from "../../content/assets/avatar.jpg";

function component() {
  return (
    <host
      class={css`
        display: block;
        position: relative
        min-height: 66vh;

        :after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;

          z-index: -100;

          background-image: url(${bannerUrlLight});

          @media (prefers-color-scheme: dark) {
            background-image: url(${bannerUrlDark});
          }
        }
      `}
    >
      <header
        class={css`
          min-height: 66vh;
          backdrop-filter: blur(20px);
          align-items: stretch;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <div
          class={css`
            align-items: center;
            display: flex;
            flex-grow: 1;
            flex-shrink: 0;
            padding: 3rem 1.5rem;
            color: #fff;
          `}
        >
          <div
            class={css`
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
            `}
          >
            <div
              class={css`
                align-items: center;
                margin-left: -0.75rem;
                margin-right: -0.75rem;
                margin-top: -0.75rem;
                :last-child {
                  margin-bottom: -0.75rem;
                }
              `}
            >
              <div
                class={css`
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                  padding: 0.75rem;
                  flex: none;
                  width: 66.6666%;
                `}
              >
                <div
                  class={css`
                    margin-bottom: 10px;
                    border-radius: 140px;
                    position: relative;
                    overflow: hidden;
                    display: inline-block;
                    width: 200px;
                    height: 200px;
                  `}
                >
                  <img
                    class={css`
                      position: absolute;
                      top: 0px;
                      left: 0px;
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                      object-position: center center;
                    `}
                    src={avatarUrl}
                  />
                </div>
                <h1
                  class={css`
                    font-size: 2.5rem;
                    font-weight: 600;
                    line-height: 1.125;
                    margin-bottom: 1.5rem;
                  `}
                >
                  Kepler Sticka-Jones
                </h1>
                <div
                  class={css`
                    margin-left: auto;
                    margin-right: auto;
                  `}
                >
                  <starstuff-hyperbutton
                    style="--starstuff-hyperbutton-color: 255, 255, 255"
                    href="/blog/"
                  >
                    Blog
                  </starstuff-hyperbutton>
                  <starstuff-hyperbutton
                    style="--starstuff-hyperbutton-color: 255, 255, 255"
                    href="/portfolio/"
                  >
                    Portfolio
                  </starstuff-hyperbutton>
                  <starstuff-hyperbutton
                    style="--starstuff-hyperbutton-color: 255, 255, 255"
                    href="/about/"
                  >
                    About
                  </starstuff-hyperbutton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </host>
  );
}

customElements.define("kepler-hero", c(component));
