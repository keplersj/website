import * as React from "react";
import Helmet from "react-helmet";
import { Global, css } from "@emotion/core";
import { StaticQuery, graphql } from "gatsby";

interface Props {}

export default ({ children }: React.PropsWithChildren<Props>) => (
  <StaticQuery
    query={graphql`
      query {
        file(
          relativePath: { eq: "avatar.jpg" }
          sourceInstanceName: { eq: "images" }
        ) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 480, height: 480) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
  >
    {data => (
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
          <meta name="twitter:site" content="@realKeplerSJ" />
          <meta name="twitter:creator" content="@realKeplerSJ" />
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

        {children}
      </>
    )}
  </StaticQuery>
);
