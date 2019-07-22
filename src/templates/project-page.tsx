import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import Helmet from "react-helmet";

const Content = styled.div`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

interface Props {
  data: {
    markdownRemark: {
      excerpt: string;
      html: string;
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        description: string;
      };
      timeToRead: string;
      wordCount: {
        words: string;
      };
    };
  };
}

const ProjectPageTemplate = (props: Props): React.ReactElement<Props> => {
  const post = props.data.markdownRemark;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://www.schema.org",
            "@type": "WebPage",
            name: `${post.frontmatter.title} | Kepler Sticka-Jones`,
            description: post.frontmatter.description || post.excerpt,
            url: post.fields.slug
          })}
        </script>
      </Helmet>

      <BaseLayout
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      >
        <Content>
          <h1>{post.frontmatter.title}</h1>
          {/* <br /> */}
          <section
            dangerouslySetInnerHTML={{
              __html: post.html
            }}
          />
        </Content>
      </BaseLayout>
    </>
  );
};

export default ProjectPageTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    # site {
    #   siteMetadata {
    #     title
    #     author
    #   }
    # }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
      timeToRead
      wordCount {
        words
      }
    }
  }
`;
