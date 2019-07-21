import * as React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import Page from "./projects";

beforeEach(() => {
  (StaticQuery as jest.Mock).mockImplementation(({ children }) =>
    children({
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
    })
  );
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
