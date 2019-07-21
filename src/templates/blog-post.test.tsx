import * as React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import Page from "./blog-post";

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

describe("Blog Post Template", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Page
          data={{
            markdownRemark: {
              excerpt: "",
              html: "",
              fields: {
                slug: ""
              },
              frontmatter: {
                title: "",
                date: "",
                description: ""
              },
              timeToRead: "",
              wordCount: {
                words: ""
              }
            }
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
