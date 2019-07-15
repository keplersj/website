import * as React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

const Avatar = styled(Img)`
  margin-top: -100px;
  margin-bottom: 10px;
  border-radius: 140px;

  @media screen and (max-width: 768px) {
    margin-top: -60px;
  }
`;

const Hero = styled.section`
  min-height: 100vh;

  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactHero = styled(Hero)`
  background-color: #409040 !important;

  * {
    color: #363636 !important;
  }
`;

const Centered = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.h1`
  color: #363636;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.125;
`;

const Contact = styled.h1`
  color: #363636;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.125;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ContactItems = styled.h3`
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const NiceLink = styled.a`
  text-decoration: none;
  box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.5);

  :hover {
    box-shadow: inset 0 -2px 0 0 rgba(255, 255, 255, 0.7);
  }
`;

const Container = styled.div`
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
`;

const Icon = styled.span`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
`;

const HeroBody = styled.div`
  align-items: center;
  display: flex;

  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
`;

const Button = styled.a`
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  height: 2.25em;
  line-height: 1.5;
  position: relative;
  vertical-align: top;
  text-decoration: none;

  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.375em - 1px);
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: calc(0.375em - 1px);
  text-align: center;
  white-space: nowrap;

  background-color: white;
  border-color: transparent;
  color: #0a0a0a;

  font-size: 1.5rem;

  :hover {
    border-color: #b5b5b5;
    background-color: #f9f9f9;
    border-color: transparent;
    color: #0a0a0a;
  }

  :active {
    outline: none;
    background-color: #f2f2f2;
    border-color: transparent;
    color: #0a0a0a;
  }

  ${Icon} {
    height: 1.5em;
    width: 1.5em;
  }

  ${Icon}:first-of-type:not(:last-child) {
    margin-left: calc(-0.375em - 1px);
    margin-right: 0.1875em;
  }
`;

const Columns = styled.div`
  align-items: center;

  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;

  :last-child {
    margin-bottom: -0.75rem;
  }

  @media screen and (min-width: 769px), print {
    :not(.is-desktop) {
      display: flex;
    }
  }
`;

const CenteredColumn = styled(Centered)`
  display: block;
  padding: 0.75rem;

  flex: none;
  width: 66.6666%;
`;

export default ({
  data
}: {
  data: { file: { childImageSharp: { fixed: any } } };
}) => (
  <>
    <Helmet>
      <html lang="en" />
      <meta name="author" content="Kepler Sticka-Jones" />
      <meta name="description" content="" />
      <meta name="theme-color" content="#409040" />
      <meta property="og:title" content="Kepler Sticka-Jones" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://keplersj.com" />
      <meta
        property="og:image"
        content={data.file.childImageSharp.fixed.base64}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="480" />
      <meta property="og:image:height" content="480" />
      <meta property="og:description" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@keplersj" />
      <meta name="twitter:creator" content="@keplersj" />
      <title>Kepler Sticka-Jones</title>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "person",
          name: "Kepler Sticka-Jones",
          url: "https://keplersj.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Salt Lake City",
            addressRegion: "UT",
            addressCountry: "USA"
          },
          email: "kepler@stickajones.org",
          sameAs: [
            "https://twitter.com/realKeplerSJ",
            "https://www.instagram.com/keplersj_/",
            "https://www.linkedin.com/in/keplersj/",
            "https://github.com/keplersj"
          ]
        })}
      </script>
    </Helmet>

    <Global
      styles={css`
        html {
          background-color: #fff;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          min-width: 300px;
          overflow-x: hidden;
          overflow-y: scroll;
          text-rendering: optimizeLegibility;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        *,
        :after,
        :before {
          box-sizing: inherit;
        }

        blockquote,
        body,
        dd,
        dl,
        dt,
        fieldset,
        figure,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        html,
        iframe,
        legend,
        li,
        ol,
        p,
        pre,
        textarea,
        ul {
          margin: 0;
          padding: 0;
        }

        body,
        button,
        input,
        select,
        textarea {
          font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            Helvetica, Arial, sans-serif;
        }

        body {
          color: #4a4a4a;
          font-size: 1em;
          font-weight: 400;
          line-height: 1.5;
        }
      `}
    />

    <Hero>
      <HeroBody>
        <Container>
          <Columns>
            <CenteredColumn>
              <Avatar fixed={data.file.childImageSharp.fixed} />
              <Name>Kepler Sticka-Jones</Name>
              <br />
              <Centered>
                <Button href="https://github.com/keplersj">
                  <Icon>
                    <FontAwesomeIcon icon={faGithub} />
                  </Icon>
                  <span>Code</span>
                </Button>
                <Button href="https://twitter.com/realKeplerSJ">
                  <Icon>
                    <FontAwesomeIcon icon={faTwitter} />
                  </Icon>
                  <span>Tweets</span>
                </Button>
              </Centered>
            </CenteredColumn>
          </Columns>
        </Container>
      </HeroBody>
    </Hero>

    <ContactHero>
      <HeroBody>
        <Container>
          <Contact>Contact</Contact>
          <ContactItems>
            Email:{" "}
            <NiceLink href="mailto:kepler@stickajones.org">
              kepler@stickajones.org
            </NiceLink>
          </ContactItems>
          <ContactItems>
            Public Key:{" "}
            <NiceLink href="https://keybase.io/keplersj/pgp_keys.asc?fingerprint=bd03eb5926203455cf0a838ef711c2d538d9cf6c">
              BD03 EB59 2620 3455 CF0A 838E F711 C2D5 38D9 CF6C
            </NiceLink>
          </ContactItems>
        </Container>
      </HeroBody>
    </ContactHero>
  </>
);

export const query = graphql`
  query {
    file(
      relativePath: { eq: "avatar.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 140, height: 140) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
