import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { PortfolioListItem as Project } from "../components/PortfolioListItem";
import { getDescription } from "../util";

const Projects = styled.div`
  margin-left: 2em;
  margin-right: 2em;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface Props {
  data: {
    allFile: {
      edges: {
        node: {
          childMarkdownRemark: {
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
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://keplersj.com/",
                  name: "Kepler Sticka-Jones"
                }
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": "https://keplersj.com/projects/",
                  name: "Projects"
                }
              }
            ]
          },
          about: {
            "@type": "ItemList",
            name: "Projects | Kepler Sticka-Jones",
            url: "/projects",
            numberOfItems: data.allFile.edges.length,
            itemListElement: data.allFile.edges.map(
              ({ node: { childMarkdownRemark: post } }): object => ({
                "@type": "Thing",
                name: post.frontmatter.title,
                description: getDescription(
                  post.excerpt,
                  post.frontmatter.description
                ),
                url: post.fields.slug
              })
            )
          }
        })}
      </script>
    </Helmet>

    <BaseLayout title="Projects">
      <Projects>
        <h1>Projects</h1>
        <ListContainer>
          {data.allFile.edges.map(
            ({ node: { childMarkdownRemark: post } }): React.ReactElement => (
              <Project
                key={post.id}
                location={post.fields.slug}
                title={post.frontmatter.title}
                description={getDescription(
                  post.excerpt,
                  post.frontmatter.description
                )}
              />
            )
          )}
        </ListContainer>
      </Projects>
    </BaseLayout>
  </>
);

export default ProjectsPage;

export const query = graphql`
  query ProjectsPageData {
    allFile(
      filter: { sourceInstanceName: { eq: "projects" } }
      sort: { order: ASC, fields: [childMarkdownRemark___frontmatter___title] }
    ) {
      edges {
        node {
          childMarkdownRemark {
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
  }
`;
