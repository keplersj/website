import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Layout from "./Base";

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

describe("Base Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Layout>
          <span>Test</span>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
