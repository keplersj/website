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

const Project = styled.div`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export default ({ data }: any) => (
  <BaseLayout title="Projects">
    <Posts>
      <h1>Projects</h1>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }: any) => (
          <Project key={node.id}>
            <Link to={node.fields.slug}>
              <h2>{node.frontmatter.title}</h2>
            </Link>
            <div>{node.frontmatter.description || node.excerpt}</div>
          </Project>
        ))}
      </div>
    </Posts>
  </BaseLayout>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`;
