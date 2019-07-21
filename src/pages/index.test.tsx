import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./index";

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

describe("Index Page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Page
          data={{
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
            },
            metadataImage: {
              childImageSharp: {
                fixed: {}
              }
            },
            file: {
              childImageSharp: {
                fixed: {}
              }
            }
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
