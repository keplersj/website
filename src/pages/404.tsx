import { c } from "atomico";
import styled from "styled-custom-elements";
import { useHead } from "atomico-use-head";

const BackgroundImage = styled.div`
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url("/assets/images/banner.jpg");
  background-image: url("/assets/images/banner-opt.jpeg");
  background-image: image-set(
    url("/assets/images/banner-opt.avif") type("image/avif"),
    url("/assets/images/banner-opt.wpeg") type("image/webp"),
    url("/assets/images/banner-opt.jpeg") type("image/jpeg")
  );

  @media (prefers-color-scheme: dark) {
    background-image: url("/assets/images/banner_dark.jpg");
    background-image: url("/assets/images/banner_dark-opt.jpeg");
    background-image: image-set(
      url("/assets/images/banner_dark-opt.avif") type("image/avif"),
      url("/assets/images/banner_dark-opt.webp") type("image/webp"),
      url("/assets/images/banner_dark-opt.jpeg") type("image/jpeg")
    );
  }
`;

customElements.define("kepler-page-not-found-background", BackgroundImage, {
  extends: "div",
});

const Container = styled.div`
  color: #505050;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.5;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(5px);
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

customElements.define("kepler-page-not-found-content", Container, {
  extends: "div",
});

function component() {
  useHead(
    {
      title: "404 | Kepler Sticka-Jones",
    },
    { hydrate: true }
  );

  return (
    <host>
      <div is="kepler-page-not-found-background">
        <div is="kepler-page-not-found-content">
          <main>
            <h1>404!</h1>
            <span>
              Maybe, go back to the <a href="/">home page</a>?
            </span>
          </main>
        </div>
      </div>
    </host>
  );
}

customElements.define("kepler-page-not-found", c(component));
