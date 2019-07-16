import * as React from "react";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

const StyledBackgroundImage = styled(BackgroundImage)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default ({
  data
}: {
  data: { desktop: { childImageSharp: { fluid: any } } };
}) => (
  <>
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
          color: #505050;
          font-size: 1.5em;
          font-weight: 500;
          line-height: 1.5;
        }
      `}
    />

    <StyledBackgroundImage
      Tag="section"
      fluid={data.desktop.childImageSharp.fluid}
      backgroundColor={`#040e18`}
    >
      <div>
        <h1>404!</h1>
        <span>
          Maybe, go back to the <Link to="/">home page</Link>?
        </span>
      </div>
    </StyledBackgroundImage>
  </>
);

export const query = graphql`
  query {
    desktop: file(
      relativePath: { eq: "banner.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4608) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
