import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

interface Props {
  location: string;
  title: string;
  description: string;
}

export const PortfolioListItem = (props: Props): React.ReactElement<Props> => (
  <Container>
    <Link to={props.location}>
      <h2>{props.title}</h2>
    </Link>
    <div>{props.description}</div>
  </Container>
);
