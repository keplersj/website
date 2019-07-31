import * as React from "react";
import renderer from "react-test-renderer";
import { BlogPostItem } from ".";

describe("Blog Post List Item", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <BlogPostItem
          location="/test"
          title="Test Post"
          description="This is a great test post."
          publishDate="December 18, 2018"
          wordCount="42"
          minutesNeededToRead="42"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
