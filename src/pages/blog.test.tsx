import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Page from "./blog";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    file: {
      childImageSharp: {
        fixed: {
          base64: "",
          width: 100,
          height: 100,
          src: "",
          srcSet: ""
        }
      }
    },
    backdrop: {
      childImageSharp: {
        fluid: {
          base64: "",
          aspectRatio: 1.333,
          src: "",
          srcSet: "",
          srcWebp: "",
          srcSetWebp: "",
          sizes: ""
        }
      }
    },
    site: {
      siteMetadata: {
        title: "",
        description: "",
        siteUrl: "",
        twitterUsername: "",
        instagramUsername: "",
        linkedinUsername: "",
        githubUsername: ""
      }
    }
  }));
});

describe("Blog Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page
          data={{
            allMarkdownRemark: {
              edges: [
                {
                  node: {
                    id: "",
                    rawMarkdownBody: "",
                    excerpt: "",
                    fields: {
                      slug: ""
                    },
                    frontmatter: {
                      title: "",
                      date: "",
                      isoDate: "",
                      description: ""
                    },
                    timeToRead: "",
                    wordCount: {
                      words: ""
                    }
                  }
                }
              ]
            }
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();

    // Get a snapshot of the head since this component modifies it.
    const helmet = Helmet.peek();
    expect(helmet).toMatchSnapshot();
  });
});
