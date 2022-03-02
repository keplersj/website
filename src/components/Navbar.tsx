import { c } from "atomico";
import styled from "styled-custom-elements";
import "starstuff-components";

const Navigation = styled.nav`
  width: 100%;
  height: 3rem;
  margin-bottom: 1em;
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

  @media print {
    display: none;
  }
`;

customElements.define("kepler-navbar-navigation", Navigation, {
  extends: "nav",
});

const NavigationContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 3rem;
  padding-right: 1rem;
  padding-left: 1rem;
  backdrop-filter: blur(5px);
`;
import "../components/Markdown";

customElements.define("kepler-navbar-content", NavigationContent, {
  extends: "div",
});

const LeftAlignLinks = styled.div`
  max-width: 50%;
  text-align: start;
`;

customElements.define("kepler-navbar-left-links", LeftAlignLinks, {
  extends: "div",
});

const RightAlignLinks = styled.div`
  max-width: 50%;
  text-align: end;

  & > :not(:last-child) {
    margin-right: 1em;
  }
`;

customElements.define("kepler-navbar-right-links", RightAlignLinks, {
  extends: "div",
});

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
      <Navigation>
        <NavigationContent>
          <LeftAlignLinks>
            <Anchor href="/">Kepler Sticka-Jones</Anchor>
          </LeftAlignLinks>
          <RightAlignLinks>
            <Anchor href="/blog">Blog</Anchor>
            <Anchor href="/portfolio">Portfolio</Anchor>
            <Anchor href="/about">About</Anchor>
          </RightAlignLinks>
        </NavigationContent>
      </Navigation>
    </host>
  );
}

component.props = {};

export const NavBar = c(component);

customElements.define("kepler-navbar", NavBar);
