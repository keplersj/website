import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { Helmet } from "react-helmet";
import { BlogPostItem as Post } from "../components/BlogPostItem";
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
            date: string;
            isoDate: string;
            description: string;
          };
          timeToRead: string;
          wordCount: {
            words: string;
          };
        };
      }[];
    };
  };
}

const BlogPage = ({ data }: Props): React.ReactElement<Props> => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "CollectionPage",
          name: "Blog | Kepler Sticka-Jones",
          url: "/blog",
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
                  "@id": "https://keplersj.com/blog/",
                  name: "Blog"
                }
              }
            ]
          },
          about: {
            "@type": "Blog",
            url: "/blog",
            blogPosts: data.allMarkdownRemark.edges.map(
              ({ node: post }): object => ({
                "@type": "BlogPosting",
                url: post.fields.slug,
                name: post.frontmatter.title,
                headline: post.frontmatter.title,
                datePublished: post.frontmatter.isoDate,
                wordCount: post.wordCount.words,
                description: getDescription(
                  post.excerpt,
                  post.frontmatter.description
                ),
                author: {
                  "@type": "Person",
                  name: "Kepler Sticka-Jones",
                  url: "https://keplersj.com"
                },
                publisher: {
                  "@type": "Person",
                  name: "Kepler Sticka-Jones",
                  url: "https://keplersj.com"
                }
              })
            )
          }
        })}
      </script>
    </Helmet>

    <BaseLayout title="Blog">
      <Posts>
        <h1>Blog</h1>
        <div>
          {data.allMarkdownRemark.edges.map(
            ({ node: post }): React.ReactElement => (
              <Post
                key={post.id}
                location={post.fields.slug}
                title={post.frontmatter.title}
                publishDate={post.frontmatter.date}
                wordCount={post.wordCount.words}
                minutesNeededToRead={post.timeToRead}
                description={getDescription(
                  post.excerpt,
                  post.frontmatter.description
                )}
              />
            )
          )}
        </div>
      </Posts>
    </BaseLayout>
  </>
);

export default BlogPage;

export const query = graphql`
  query BlogPageData {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
      sort: { order: DESC, fields: frontmatter___date }
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
            date(formatString: "MMMM DD, YYYY")
            isoDate: date
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
