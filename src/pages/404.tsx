import * as React from "react";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { Helmet } from "react-helmet";

const StyledBackgroundImage = styled(BackgroundImage)`
  max-height: 100vh;
  max-width: 100vw;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(5px);
`;

export default ({
  data
}: {
  data: { desktop: { childImageSharp: { fluid: any } } };
}) => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "WebPage",
          name: "404! | Kepler Sticka-Jones"
        })}
      </script>
    </Helmet>

    <BaseLayout title="404!" hideNavbar>
      <Global
        styles={css`
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
        <Container>
          <div>
            <h1>404!</h1>
            <span>
              Maybe, go back to the <Link to="/">home page</Link>?
            </span>
          </div>
        </Container>
      </StyledBackgroundImage>
    </BaseLayout>
  </>
);

export const query = graphql`
  query FourOhFourPageData {
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
