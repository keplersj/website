import { c } from "atomico";
import styled from "styled-custom-elements";
import "starstuff-components";
import { Avatar } from "../components/Avatar";

const Base = styled.header`
  display: block;
  position: relative;
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

    background-image: url("/assets/images/banner.jpg");
    background-image: url("/assets/images/banner-opt.jpeg");
    background-image: image-set(
      url("/assets/images/banner-opt.avif") type("image/avif"),
      url("/assets/images/banner-opt.webp") type("image/webp"),
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
  }
`;

customElements.define("kepler-hero-base", Base, { extends: "header" });

const Container = styled.div`
  min-height: 66vh;
  backdrop-filter: blur(20px);
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

customElements.define("kepler-hero-container", Container, { extends: "div" });

const Content = styled.div`
  padding: 3rem 1.5rem;
  color: #fff;
  text-align: center;
  position: relative;
  @media screen and (min-width: 1024px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1216px) {
    max-width: 1152px;
  }
  margin-left: auto;
  margin-right: auto;
  display: block;
  flex: none;
  width: 66.6666%;
`;

customElements.define("kepler-hero-content", Content, { extends: "div" });

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 1.5rem;
`;

customElements.define("kepler-hero-name", Name, { extends: "h1" });

const LinkContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

customElements.define("kepler-hero-link-container", LinkContainer, {
  extends: "div",
});

function component() {
  return (
    <host>
      <Base>
        <Container>
          <Content>
            <Avatar />
            <Name>Kepler Sticka-Jones</Name>
            <LinkContainer>
              <starstuff-hyperbutton
                style="--starstuff-hyperbutton-color: 255, 255, 255"
                href="/blog/"
                data-hydrate
              >
                Blog
              </starstuff-hyperbutton>
              <starstuff-hyperbutton
                style="--starstuff-hyperbutton-color: 255, 255, 255"
                href="/portfolio/"
                data-hydrate
              >
                Portfolio
              </starstuff-hyperbutton>
              <starstuff-hyperbutton
                style="--starstuff-hyperbutton-color: 255, 255, 255"
                href="/about/"
                data-hydrate
              >
                About
              </starstuff-hyperbutton>
            </LinkContainer>
          </Content>
        </Container>
      </Base>
    </host>
  );
}

export const Hero = c(component);

customElements.define("kepler-hero", Hero);
