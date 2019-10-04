import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../../layouts/Base";
import { Avatar } from "../Avatar";
import { SocialLinks } from "../SocialLinks";

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

const ProfileContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 33vw;

  @media (max-width: ${MobileBreakPoint}) {
    min-width: inherit;
  }
`;

const ExperienceContainer = styled.div`
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
  props: React.PropsWithChildren<{}>
): React.ReactElement => (
  <BaseLayout>
    <AboutContainer>
      <ProfileContainer>
        <Avatar />
        <Name>Kepler Sticka-Jones</Name>
        <Location>Salt Lake City, UT, USA</Location>
        <SocialLinks id="#contact" />
      </ProfileContainer>
      <ExperienceContainer>{props.children}</ExperienceContainer>
    </AboutContainer>
  </BaseLayout>
);
