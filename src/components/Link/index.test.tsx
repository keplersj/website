import * as React from "react";
import renderer from "react-test-renderer";
import { Link, GatsbyLink } from ".";

describe("Link", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Link href="/test">Test Link</Link>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("GatsbyLink", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(<GatsbyLink to="/test">Test Gatsby Link</GatsbyLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
