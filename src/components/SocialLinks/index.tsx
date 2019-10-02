import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import {
  FaGithub,
  FaTwitter,
  FaKeybase,
  FaEnvelope,
  FaKey,
  FaLinkedin,
  FaExternalLinkSquareAlt
} from "react-icons/fa";
import { IconType } from "react-icons";

const ProfileLinksContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LinkSize = "1.5em";

const SocialLink = styled.a`
  padding: 0.5em;
`;

interface LinkProps {
  url: string;
}

const Link = (
  props: React.PropsWithChildren<LinkProps>
): React.ReactElement => (
  <SocialLink target="_blank" rel="noopener noreferrer" href={props.url}>
    {props.children}
  </SocialLink>
);

const Icons: { [index: string]: IconType } = {
  Email: FaEnvelope,
  PGP: FaKey,
  GitHub: FaGithub,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedin,
  Keybase: FaKeybase,
  default: FaExternalLinkSquareAlt
};

interface Platform {
  name: string;
  id: string;
  url: string;
}

export const SocialLinks = (
  props: React.ComponentProps<"section">
): React.ReactElement => {
  const {
    site: {
      siteMetadata: { social }
    }
  } = useStaticQuery(graphql`
    query AboutPageQuery {
      site {
        siteMetadata {
          social {
            name
            id
            url
          }
        }
      }
    }
  `);

  return (
    <ProfileLinksContainer {...props}>
      {social.map(
        (platform: Platform): React.ReactElement => {
          const Icon = Icons[platform.name];

          return (
            <Link url={platform.url} key={platform.name}>
              <Icon
                size={LinkSize}
                title={`${platform.name}: ${platform.id}`}
              />
            </Link>
          );
        }
      )}
    </ProfileLinksContainer>
  );
};
