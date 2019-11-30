import * as React from "react";
import { graphql, Link, PageRendererProps } from "gatsby";
import { FixedObject } from "gatsby-image";
import styled from "@emotion/styled";
import { Hyperbutton } from "starstuff-components";
import { WebSite } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import BaseLayout from "../components/BaseLayout";
import { Avatar } from "../components/Avatar";
import { BannerBackground } from "../components/BannerBackground";

const HeroBackground = styled(BannerBackground)`
  min-height: 66vh;
`;

const Hero = styled.section`
  min-height: 66vh;
  backdrop-filter: blur(20px);
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
  color: #fff;
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

const StyledButton = styled(Hyperbutton)`
  color: #fff;
`;

const FeaturedContentContainer = styled.section`
  padding: 1em;
`;

const ContentCarousel = styled.div`
  display: flex;
  overflow: scroll;
`;

const FeaturedContent = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 15em;
  padding: 1em;
`;

const FlexReadMoreLink = styled(Link)`
  align-self: flex-end;
`;

const LocalButton = Hyperbutton.withComponent(Link);

const StyledLocalButton = styled(LocalButton)`
  color: #fff;
`;

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

  blogPosts: {
    edges: {
      node: {
        id: string;
        title: string;
        slug: string;
        date: string;
        rawDate: string;
      };
    }[];
  };
}

interface Props extends PageRendererProps {
  data: IndexPageData;
}

const IndexPage = ({ data, location }: Props): React.ReactElement<Props> => {
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
    <BaseLayout hideNavbar location={location}>
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.site.siteMetadata.title,
          description: data.site.siteMetadata.description,
          url: data.site.siteMetadata.siteUrl,
          about: {
            "@type": "Person",
            name: data.site.siteMetadata.title,
            description: data.site.siteMetadata.description,
            url: data.site.siteMetadata.siteUrl,
            email: email ? email.id : undefined,
            sameAs: data.site.siteMetadata.social
              .filter((platform): boolean => platform.isProfile === true)
              .map((platform): string => platform.url),
            image: data.metadataImage.childImageSharp.fixed.src
          }
        }}
      />

      <HeroBackground highQuality>
        <Hero>
          <HeroBody>
            <Container>
              <Columns>
                <CenteredColumn>
                  <Avatar />
                  <Name>{data.site.siteMetadata.title}</Name>
                  <br />
                  <Centered>
                    {github && (
                      <StyledButton href={github.url}>Code</StyledButton>
                    )}
                    {twitter && (
                      <StyledButton href={twitter.url}>Tweets</StyledButton>
                    )}
                    {data.site.siteMetadata.nav.map(
                      (link): React.ReactElement => (
                        <StyledLocalButton to={link.url} key={link.name}>
                          {link.name}
                        </StyledLocalButton>
                      )
                    )}
                  </Centered>
                </CenteredColumn>
              </Columns>
            </Container>
          </HeroBody>
        </Hero>
      </HeroBackground>
      <FeaturedContentContainer>
        <h2>Biography</h2>
        <p>
          I am a computer programmer and college student based out of Salt Lake
          City, with experience in entrepreneurship, student leadership, and
          open source software development.
        </p>
        <Link to="/about">Read More...</Link>
      </FeaturedContentContainer>
      <FeaturedContentContainer>
        <h2>Blog Posts</h2>
        <ContentCarousel>
          {data.blogPosts.edges.map(({ node: post }) => (
            <FeaturedContent key={post.id}>
              <h3>{post.title}</h3>
              <time dateTime={post.rawDate}>{post.date}</time>
              <FlexReadMoreLink to={post.slug}>Read More...</FlexReadMoreLink>
            </FeaturedContent>
          ))}
        </ContentCarousel>
      </FeaturedContentContainer>
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
      sourceInstanceName: { eq: "assets" }
    ) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 480, height: 480) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    blogPosts: allBlogPost(sort: { order: DESC, fields: date }) {
      edges {
        node {
          id
          title
          slug
          date(formatString: "MMMM DD, YYYY")
          rawDate: date
        }
      }
    }
  }
`;
