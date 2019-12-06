import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../BaseLayout";
import { Avatar } from "../Avatar";
import { SocialLinks } from "../SocialLinks";
import { PageRendererProps, useStaticQuery, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

// This is approximately the horizontal pixel measurement where the page begins to feel crampt,
//  and more vainly and subjectively when the hyphen in my last name wraps to a second line :D
const MobileBreakPoint = "839px";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 1em;

  @media (max-width: ${MobileBreakPoint}) {
    flex-direction: column;
  }
`;

const ProfileContainer = styled.header`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 33vw;

  @media (max-width: ${MobileBreakPoint}) {
    min-width: inherit;
  }
`;

const ExperienceContainer = styled.main`
  margin: 1em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 2em;
`;

const Location = styled.span`
  font-size: 1em;
`;

export const AboutTemplate = (
  props: React.PropsWithChildren<PageRendererProps>
): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      biography: file(
        sourceInstanceName: { eq: "about" }
        relativePath: { eq: "biography.md" }
      ) {
        childMdx {
          body
          frontmatter {
            title
          }
        }
      }

      skills: file(
        sourceInstanceName: { eq: "about" }
        relativePath: { eq: "skills.md" }
      ) {
        childMdx {
          body
          frontmatter {
            title
          }
        }
      }
    }
  `);

  return (
    <BaseLayout location={props.location}>
      <AboutContainer role="region">
        <ProfileContainer>
          <Avatar />
          <Name role="heading" aria-level={1} title="Name">
            Kepler Sticka-Jones
          </Name>
          <Location role="heading" aria-level={2} title="Location">
            Salt Lake City, UT, USA
          </Location>
          <SocialLinks id="contact" />
        </ProfileContainer>
        <ExperienceContainer>
          <h1>{data.biography.childMdx.frontmatter.title}</h1>
          <MDXRenderer>{data.biography.childMdx.body}</MDXRenderer>
          {props.children}
          <h1>{data.skills.childMdx.frontmatter.title}</h1>
          <MDXRenderer>{data.skills.childMdx.body}</MDXRenderer>
        </ExperienceContainer>
      </AboutContainer>
    </BaseLayout>
  );
};
