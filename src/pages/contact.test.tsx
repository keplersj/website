import * as React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import Page from "./contact";

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

describe("Contact Page", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Page />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
