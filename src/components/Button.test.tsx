import * as React from "react";
import renderer from "react-test-renderer";
import { Button, GatsbyButton } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Button href="/test">Test Link</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("GatsbyButton", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<GatsbyButton to="/test">Test Gatsby Link</GatsbyButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
