import * as React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import { Hyperbutton } from "starstuff-components";
import BaseLayout from "../layouts/Base";
import { Avatar } from "../components/Avatar";

const StyledAvatar = styled(Avatar)`
  margin-top: -100px;

  @media screen and (max-width: 768px) {
    margin-top: -60px;
  }
`;

const Hero = styled.section`
  min-height: 100vh;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Centered = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.125;
`;

const Container = styled.div`
  text-align: center !important;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 auto;
  position: relative;
  width: auto;

  @media screen and (min-width: 1024px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1216px) {
    max-width: 1152px;
  }
`;

const HeroBody = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
`;

const Columns = styled.div`
  align-items: center;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;

  :last-child {
    margin-bottom: -0.75rem;
  }
`;

const CenteredColumn = styled(Centered)`
  display: block;
  padding: 0.75rem;
  flex: none;
  width: 66.6666%;
`;

export const LocalButton = Hyperbutton.withComponent(Link);

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      social: {
        name: string;
        id: string;
        url: string;
        isProfile?: boolean;
      }[];
      nav: {
        name: string;
        url: string;
      }[];
    };
  };

  metadataImage: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

interface Props {
  data: IndexPageData;
  path: string;
}

const IndexPage = ({ data }: Props): React.ReactElement<Props> => {
  const twitter = data.site.siteMetadata.social.find(
    (social): boolean => social.name === "Twitter"
  );
  const github = data.site.siteMetadata.social.find(
    (social): boolean => social.name === "GitHub"
  );
  const email = data.site.siteMetadata.social.find(
    (social): boolean => social.name === "Email"
  );

  return (
    <BaseLayout hideNavbar>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://www.schema.org",
            "@type": "WebSite",
            name: data.site.siteMetadata.title,
            description: data.site.siteMetadata.description,
            url: data.site.siteMetadata.siteUrl,
            about: {
              "@type": "person",
              name: data.site.siteMetadata.title,
              description: data.site.siteMetadata.description,
              url: data.site.siteMetadata.siteUrl,
              email: email ? email.id : undefined,
              sameAs: data.site.siteMetadata.social
                .filter((platform): boolean => platform.isProfile === true)
                .map((platform): string => platform.url),
              image: data.metadataImage.childImageSharp.fixed.src
            }
          })}
        </script>
      </Helmet>

      <Hero>
        <HeroBody>
          <Container>
            <Columns>
              <CenteredColumn>
                <StyledAvatar />
                <Name>{data.site.siteMetadata.title}</Name>
                <br />
                <Centered>
                  {github && <Hyperbutton href={github.url}>Code</Hyperbutton>}
                  {twitter && (
                    <Hyperbutton href={twitter.url}>Tweets</Hyperbutton>
                  )}
                  {data.site.siteMetadata.nav.map(
                    (link): React.ReactElement => (
                      <LocalButton to={link.url} key={link.name}>
                        {link.name}
                      </LocalButton>
                    )
                  )}
                </Centered>
              </CenteredColumn>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </BaseLayout>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPageData {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          name
          id
          url
          isProfile
        }
        nav {
          name
          url
        }
      }
    }

    metadataImage: file(
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
`;
