import * as React from "react";
import { Helmet } from "react-helmet";
import { Global, css } from "@emotion/core";
import { useStaticQuery, graphql } from "gatsby";
import { Navbar } from "../components/Navbar";

import "modern-normalize";

interface Props {
  title?: string;
  description?: string;
  hideNavbar?: boolean;
}

const BaseLayout = (
  props: React.PropsWithChildren<Props>
): React.ReactElement<React.PropsWithChildren<Props>> => {
  const data = useStaticQuery(graphql`
    query BaseLayoutData {
      site {
        siteMetadata {
          title
          description
          siteUrl
          social {
            name
            id
            url
          }
        }
      }

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
  `);

  const twitter = data.site.siteMetadata.social.find(
    (social: { name: string }): boolean => social.name === "Twitter"
  );

  return (
    <>
      <Helmet
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      >
        <html lang="en" />
        <meta name="author" content="Kepler Sticka-Jones" />
        props.title && <title>{props.title}</title>
        <meta
          name="description"
          content={props.description || data.site.siteMetadata.description}
        />
        <meta name="theme-color" content="#409040" />
        <meta
          property="og:title"
          content={
            (props.title &&
              `${props.title} | ${data.site.siteMetadata.title}`) ||
            data.site.siteMetadata.title
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
        <meta
          property="og:image"
          content={data.file.childImageSharp.fixed.base64}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="480" />
        <meta property="og:image:height" content="480" />
        <meta
          property="og:description"
          content={props.description || data.site.siteMetadata.description}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitter.id} />
        <meta name="twitter:creator" content={twitter.id} />
      </Helmet>

      <Global
        styles={css`
          html {
            text-rendering: optimizeLegibility;
            text-size-adjust: 100%;
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
          ol,
          textarea {
            margin: 0;
            padding: 0;
          }

          body {
            color: #4a4a4a;
            line-height: 1.5;
          }

          a {
            color: #4a4a4a;
          }

          @media (prefers-color-scheme: dark) {
            body {
              background-color: #4a4a4a;
              color: white;
            }

            a {
              color: white;
            }

            /* For some reason Atom One Dark is setting this element to black, manual override. */
            span.mtk1 {
              color: white !important;
            }
          }
        `}
      />

      {!props.hideNavbar && <Navbar />}

      <main>{props.children}</main>
    </>
  );
};

export default BaseLayout;
