import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Img, { FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { Button, GatsbyButton as LocalButton } from "../components/Button";

const Avatar = styled(Img)`
  margin-top: -100px;
  margin-bottom: 10px;
  border-radius: 140px;

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

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
        twitterUsername: string;
        instagramUsername: string;
        linkedinUsername: string;
        githubUsername: string;
      };
    };

    metadataImage: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };

    file: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
  path: string;
}

const IndexPage = ({ data, path }: Props): React.ReactElement<Props> => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "WebSite",
          name: "Kepler Sticka-Jones",
          description: data.site.siteMetadata.description,
          url: data.site.siteMetadata.siteUrl,
          about: {
            "@type": "person",
            name: "Kepler Sticka-Jones",
            description: data.site.siteMetadata.description,
            url: data.site.siteMetadata.siteUrl,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Salt Lake City",
              addressRegion: "UT",
              addressCountry: "USA"
            },
            email: "kepler@stickajones.org",
            sameAs: [
              `https://twitter.com/${data.site.siteMetadata.twitterUsername}`,
              `https://www.instagram.com/${data.site.siteMetadata.instagramUsername}/`,
              `https://www.linkedin.com/in/${data.site.siteMetadata.linkedinUsername}/`,
              `https://github.com/${data.site.siteMetadata.githubUsername}`
            ],
            image: data.metadataImage.childImageSharp.fixed.src,
            gender: "Male"
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": path,
                  name: "Kepler Sticka-Jones"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>

    <BaseLayout hideNavbar>
      <Hero>
        <HeroBody>
          <Container>
            <Columns>
              <CenteredColumn>
                <Avatar fixed={data.file.childImageSharp.fixed} />
                <Name>Kepler Sticka-Jones</Name>
                <br />
                <Centered>
                  <Button
                    href={`https://github.com/${data.site.siteMetadata.githubUsername}`}
                  >
                    Code
                  </Button>
                  <Button
                    href={`https://twitter.com/${data.site.siteMetadata.twitterUsername}`}
                  >
                    Tweets
                  </Button>
                  <LocalButton to="/blog">Blog</LocalButton>
                  <LocalButton to="/projects">Projects</LocalButton>
                  <LocalButton to="/contact">Contact</LocalButton>
                </Centered>
              </CenteredColumn>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    </BaseLayout>
  </>
);

export default IndexPage;

export const query = graphql`
  query IndexPageData {
    site {
      siteMetadata {
        title
        description
        siteUrl
        twitterUsername
        instagramUsername
        linkedinUsername
        githubUsername
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

    file(
      relativePath: { eq: "avatar.jpg" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 140, height: 140) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
