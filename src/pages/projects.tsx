import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { PortfolioListItem as Project } from "../components/PortfolioListItem";
import { getDescription } from "../util";

const Posts = styled.div`
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
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          rawMarkdownBody: string;
          excerpt: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
            description: string;
          };
        };
      }[];
    };
  };
}

const ProjectsPage = ({ data }: Props): React.ReactElement<Props> => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "CollectionPage",
          name: "Projects | Kepler Sticka-Jones",
          url: "/projects",
          about: {
            "@type": "ItemList",
            name: "Projects | Kepler Sticka-Jones",
            url: "/projects",
            numberOfItems: data.allMarkdownRemark.edges.length,
            itemListElement: data.allMarkdownRemark.edges.map(
              ({ node }): object => ({
                "@type": "Thing",
                name: node.frontmatter.title,
                description: getDescription(
                  node.excerpt,
                  node.frontmatter.description
                ),
                url: node.fields.slug
                // text: node.rawMarkdownBody
              })
            )
          }
        })}
      </script>
    </Helmet>

    <BaseLayout title="Projects">
      <Posts>
        <h1>Projects</h1>
        <div>
          {data.allMarkdownRemark.edges.map(
            ({ node }): React.ReactElement => (
              <Project
                key={node.id}
                location={node.fields.slug}
                title={node.frontmatter.title}
                description={getDescription(
                  node.excerpt,
                  node.frontmatter.description
                )}
              />
            )
          )}
        </div>
      </Posts>
    </BaseLayout>
  </>
);

export default ProjectsPage;

export const query = graphql`
  query ProjectsPageData {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          rawMarkdownBody
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
