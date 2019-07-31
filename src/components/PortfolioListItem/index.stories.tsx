import * as React from "react";
import { PortfolioListItem } from ".";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Portfolio List Item",
  decorators: [withKnobs]
};

export const regular = (): React.ReactElement => (
  <PortfolioListItem
    location={text("Location", "/test")}
    title={text("Title", "Test")}
    description={text("Description", "Test Description")}
  />
);
