import * as React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { Link, GatsbyLink } from ".";

export default {
  title: "Link",
  decorators: [withKnobs]
};

export const regular = (): React.ReactElement => (
  <Link href={text("Location", "/test")}>{text("Content", "Test")}</Link>
);

export const gatsby = (): React.ReactElement => (
  <GatsbyLink to={text("Location", "/test")}>
    {text("Content", "Test")}
  </GatsbyLink>
);
