import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Navbar } from "./Navbar";

beforeEach(() => {
  (useStaticQuery as jest.Mock).mockImplementationOnce(() => ({
    backdrop: {
      childImageSharp: {
        fluid: {}
      }
    }
  }));
});

describe("Navbar", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
