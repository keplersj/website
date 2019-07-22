import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Page from "./index";

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
          aspectRatio: "",
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

describe("Index Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page
          path="/"
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
                fixed: {
                  base64: "",
                  width: 100,
                  height: 100,
                  src: "",
                  srcSet: ""
                }
              }
            },
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
