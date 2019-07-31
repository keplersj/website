import * as React from "react";
import renderer from "react-test-renderer";
import { PortfolioListItem } from "./PortfolioListItem";

describe("Portfolio List Item", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <PortfolioListItem
          location="/test"
          title="Test"
          description="This is a great test."
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
