import * as React from "react";
import { BlogPostItem } from ".";
import { text, withKnobs, date, number } from "@storybook/addon-knobs";

export default {
  title: "Blog Post List Item",
  decorators: [withKnobs]
};

export const regular = (): React.ReactElement => (
  <BlogPostItem
    location={text("Location", "/test")}
    title={text("Title", "Test")}
    description={text("Description", "Test Description")}
    // publishDate={date("Publish Date").toString()}
    publishDate="December 18, 2018"
    wordCount={number("Word Count", 42).toString()}
    minutesNeededToRead={number("Minutes Needed to Read", 1).toString()}
  />
);
