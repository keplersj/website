import * as React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import styled from "@emotion/styled";

const Avatar = styled(Img)`
  margin-top: -100px;
  margin-bottom: 10px;
  border-radius: 140px;

  @media screen and (max-width: 768px) {
    margin-top: -60px;
  }
`;

const ContactSectionContainer = styled.section`
  background-color: #409040 !important;

  * {
    color: #363636 !important;
  }

  .has-nice-link a:not(.button):not(.no-underline) {
    box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.5);
  }

  .has-nice-link a:not(.button):not(.no-underline):hover {
    box-shadow: inset 0 -2px 0 0 rgba(255, 255, 255, 0.7);
  }
`;

const Centered = styled.div`
  margin-left: auto;
  margin-right: auto;
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
            "https://twitter.com/keplersj",
            "https://www.instagram.com/keplersj_/",
            "https://www.linkedin.com/in/keplersj/",
            "https://github.com/keplersj"
          ]
        })}
      </script>
    </Helmet>

    <section className="hero is-fullheight is-default">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <Centered className="column is-two-thirds has-nice-link">
              <Avatar fixed={data.file.childImageSharp.fixed} />
              <h1 className="title is-2">Kepler Sticka-Jones</h1>
              <h2 className="subtitle is-4" />
              <p />
              <br />
              <p className="has-text-centered">
                <a
                  className="button is-large is-white"
                  href="https://github.com/keplersj"
                >
                  <span className="icon">
                    <i className="fa fa-github" />
                  </span>
                  <span>Code</span>
                </a>
                <a
                  className="button is-large is-white"
                  href="https://twitter.com/keplersj"
                >
                  <span className="icon">
                    <i className="fa fa-twitter" />
                  </span>
                  <span>Tweets</span>
                </a>
              </p>
            </Centered>
          </div>
        </div>
      </div>
    </section>

    <ContactSectionContainer className="hero is-fullheight">
      <div id="contact" className="hero-body">
        <div className="container has-text-centered has-nice-link">
          <h1 className="title is-1">Contact</h1>
          <h3 className="title is-3">
            Email:{" "}
            <a href="mailto:kepler@stickajones.org">kepler@stickajones.org</a>
          </h3>
          <h3 className="title is-3">
            Public Key:{" "}
            <a href="https://keybase.io/keplersj/pgp_keys.asc?fingerprint=bd03eb5926203455cf0a838ef711c2d538d9cf6c">
              BD03 EB59 2620 3455 CF0A 838E F711 C2D5 38D9 CF6C
            </a>
          </h3>
        </div>
      </div>
    </ContactSectionContainer>
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
