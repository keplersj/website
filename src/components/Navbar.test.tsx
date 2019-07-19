import * as React from "react";
import renderer from "react-test-renderer";
import { StaticQuery } from "gatsby";
import { Navbar } from "./Navbar";

beforeEach(() => {
  (StaticQuery as jest.Mock).mockImplementationOnce(({ children }) =>
    children({
      backdrop: {
        childImageSharp: {
          fluid: {}
        }
      }
    })
  );
});

describe("Navbar", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
