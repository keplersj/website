import React from "react";
import { Link } from "gatsby";
import { Card } from "starstuff-components";

interface Props {
  location: string;
  title: string;
  description: string;
}

export const PortfolioListItem = (props: Props): React.ReactElement<Props> => (
  <Card
    title={props.title}
    location={props.location}
    customLinkComponent={(title, location): React.ReactElement => (
      <Link to={location}>
        <h2>{title}</h2>
      </Link>
    )}
    supporting={<div>{props.description}</div>}
  />
);
