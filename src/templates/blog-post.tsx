import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";

interface IProps {
  data: any;
}

const Post = styled.div`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

class BlogPostTemplate extends React.Component<IProps> {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <BaseLayout
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      >
        <Post>
          <h1>{post.frontmatter.title}</h1>
          <div>
            <span>Published {post.frontmatter.date}</span>
            <span>{" | "}</span>
            <span>{post.wordCount.words} words</span>
            <span>{" | "}</span>
            <span>{post.timeToRead} minute read</span>
          </div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Post>
      </BaseLayout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        date(formatString: "MMMM DD, YYYY")
        description
      }
      timeToRead
      wordCount {
        words
      }
    }
  }
`;
