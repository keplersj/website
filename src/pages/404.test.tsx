import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./404";

beforeEach(() => {
  (useStaticQuery as jest.Mock).mockImplementationOnce(() => ({
    backdrop: {
      childImageSharp: {
        fluid: {}
      }
    },
    file: {
      childImageSharp: {
        fixed: {
          base64: ""
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

describe("404 Page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Page data={{ desktop: { childImageSharp: { fluid: {} } } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
