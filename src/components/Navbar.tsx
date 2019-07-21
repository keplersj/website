import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import styled from "@emotion/styled";

const StyledBackgroundImage = styled(BackgroundImage)`
  height: 3rem;
  width: 100vw;
  margin-bottom: 1em;
`;

const NavContainer = styled.nav`
  height: 3rem;
  max-width: 100vw;
  display: flex;
  backdrop-filter: blur(5px);
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  text-align: start;
  max-width: 50%;
`;

const RightContent = styled.div`
  text-align: end;
  max-width: 50%;

  & > :not(:last-child) {
    margin-right: 1em;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  color: #141414;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const Navbar = () => {
  const data = useStaticQuery(graphql`
    query Navbar {
      backdrop: file(
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
  `);

  return (
    <StyledBackgroundImage
      Tag="div"
      fluid={data.backdrop.childImageSharp.fluid}
      backgroundColor={`#040e18`}
    >
      <NavContainer>
        <LeftContent>
          <StyledLink to="/">Kepler Sticka-Jones</StyledLink>
        </LeftContent>
        <RightContent>
          <StyledLink to="/blog">Blog</StyledLink>
          <StyledLink to="/projects">Projects</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </RightContent>
      </NavContainer>
    </StyledBackgroundImage>
  );
};
