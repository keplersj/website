import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";

interface IProps {
  data: any;
}

const Content = styled.div`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

class ProjectPageTemplate extends React.Component<IProps> {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <BaseLayout
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      >
        <Content>
          <h1>{post.frontmatter.title}</h1>
          <br />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </BaseLayout>
    );
  }
}

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
