import * as React from "react";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import BaseLayout from "../components/BaseLayout";
import { Helmet } from "react-helmet";
import { FluidObject } from "gatsby-image";
import { WebPage } from "schema-dts";

type StyledBackgroundImageProps = {
  fluidDark: FluidObject;
};

const StyledBackgroundImage = styled(BackgroundImage)<
  StyledBackgroundImageProps
>`
  max-height: 100vh;
  max-width: 100vw;

  @media (prefers-color-scheme: dark) {
    ::before {
      background-image: url(${(props): string =>
        props.fluidDark.src}) !important;
    }

    ::after {
      background-image: url(${(props): string =>
        props.fluidDark.src}) !important;
    }
  }
`;

const Container = styled.div`
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

interface FourOhFourPageData {
  desktop: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };

  desktopDark: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface Props {
  data: FourOhFourPageData;
}

const FourOhFourPage = ({ data }: Props): React.ReactElement<Props> => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "WebPage",
          name: "404! | Kepler Sticka-Jones"
        } as WebPage)}
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
        fluidDark={data.desktopDark.childImageSharp.fluid}
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

export default FourOhFourPage;

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

    desktopDark: file(
      relativePath: { eq: "banner_dark.jpg" }
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
