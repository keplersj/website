import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Navbar } from "../components/Navbar";

import "modern-normalize";
import "starstuff-style";
import "./styles.css";
import { FixedObject } from "gatsby-image";

interface Props {
  title?: string;
  description?: string;
  hideNavbar?: boolean;
}

interface BaseLayoutData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      social: {
        name: string;
        id: string;
        url: string;
      }[];
    };
  };
  file: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const BaseLayout = (
  props: React.PropsWithChildren<Props>
): React.ReactElement<React.PropsWithChildren<Props>> => {
  const data = useStaticQuery<BaseLayoutData>(graphql`
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
    (social): boolean => social.name === "Twitter"
  );

  return (
    <>
      <Helmet
        title={props.title}
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      >
        <html lang="en" />
        <meta name="author" content="Kepler Sticka-Jones" />
        <meta
          name="description"
          content={props.description || data.site.siteMetadata.description}
        />
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
        {twitter && <meta name="twitter:site" content={twitter.id} />}
        {twitter && <meta name="twitter:creator" content={twitter.id} />}
      </Helmet>

      {!props.hideNavbar && <Navbar />}

      <main>{props.children}</main>
    </>
  );
};

export default BaseLayout;
