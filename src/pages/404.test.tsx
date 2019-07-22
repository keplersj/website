import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import Page from "./404";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementationOnce((): object => ({
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
    site: {
      siteMetadata: {
        title: ""
      }
    }
  }));
});

describe("404 Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page
          data={{
            desktop: {
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
