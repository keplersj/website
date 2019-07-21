import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./projects";

beforeEach(() => {
  (useStaticQuery as jest.Mock).mockImplementation(() => ({
    file: {
      childImageSharp: {
        fixed: {
          base64: ""
        }
      }
    },
    backdrop: {
      childImageSharp: {
        fluid: {}
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

describe("Projects Page", () => {
  it("renders correctly", () => {
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
                      description: ""
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
