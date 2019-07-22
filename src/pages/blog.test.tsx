import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
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
                    rawMarkdownBodyid: "",
                    excerptid: "",
                    fields: {
                      slugid: ""
                    },
                    frontmatter: {
                      titleid: "",
                      dateid: "",
                      descriptionid: ""
                    },
                    timeToReadid: "",
                    wordCount: {
                      wordsid: ""
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
  });
});
