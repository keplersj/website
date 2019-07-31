import * as React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { Button, GatsbyButton } from "./Button";

export default {
  title: "Button",
  decorators: [withKnobs]
};

export const regular = (): React.ReactElement => (
  <Button href={text("Location", "/test")}>{text("Content", "Test")}</Button>
);

export const gatsby = (): React.ReactElement => (
  <GatsbyButton to={text("Location", "/test")}>
    {text("Content", "Test")}
  </GatsbyButton>
);
