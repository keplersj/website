import React from "react";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";

const Posts = styled.div`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

const Post = styled.div`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export default ({ data }: any) => (
  <BaseLayout title="Blog">
    <Posts>
      <h1>Blog</h1>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <Post key={node.id}>
            <Link to={node.fields.slug}>
              <h2>{node.frontmatter.title}</h2>
            </Link>
            <div>
              <span>Published {node.frontmatter.date}</span>
              <span>{" | "}</span>
              <span>{node.wordCount.words} words</span>
              <span>{" | "}</span>
              <span>{node.timeToRead} minute read</span>
            </div>
            <div>{node.frontmatter.description || node.excerpt}</div>
          </Post>
        ))}
      </div>
    </Posts>
  </BaseLayout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          fields {
            slug
          }
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
    }
  }
`;
