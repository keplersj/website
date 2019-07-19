import * as React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import Page from "./404";

beforeEach(() => {
  (StaticQuery as jest.Mock).mockImplementationOnce(({ children }) =>
    children({
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
    })
  );
});

describe("404 Page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Page data={{ desktop: { childImageSharp: { fluid: {} } } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
