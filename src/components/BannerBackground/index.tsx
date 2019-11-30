import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import styled from "@emotion/styled";
import { FluidObject } from "gatsby-image";
import css from "@emotion/css";

interface StyledBackgroundImageProps {
  fluidDark: FluidObject;
}

const StyledBackgroundImage = styled(BackgroundImage)<
  StyledBackgroundImageProps
>(
  props => css`
    @media (prefers-color-scheme: dark) {
      ::before {
        background-image: url(${props.fluidDark.src}) !important;
      }

      ::after {
        background-image: url(${props.fluidDark.src}) !important;
      }
    }
  `
);

interface BannerData {
  backdrop: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  backdropDark: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export const BannerBackground = (
  props: React.PropsWithChildren<any>
): React.ReactElement => {
  const data = useStaticQuery<BannerData>(graphql`
    query BannerBackgroundData {
      backdrop: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      backdropDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <StyledBackgroundImage
      {...props}
      fluid={data.backdrop.childImageSharp.fluid}
      fluidDark={data.backdropDark.childImageSharp.fluid}
    >
      {props.children}
    </StyledBackgroundImage>
  );
};
