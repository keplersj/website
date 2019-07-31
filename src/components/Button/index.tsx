import styled from "@emotion/styled";
import { Link } from "gatsby";

export const Button = styled.a`
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  height: 2.25em;
  line-height: 1.5;
  position: relative;
  vertical-align: top;
  text-decoration: none;
  border-width: 1px;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.375em - 1px);
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: calc(0.375em - 1px);
  text-align: center;
  white-space: nowrap;
  border-color: transparent;
  font-size: 1.5rem;

  /* outline: none; */

  :hover {
    background-color: #f9f9f9;
  }

  :active {
    background-color: #f2f2f2;
  }

  @media (prefers-color-scheme: dark) {
    :hover {
      background-color: #606060;
    }

    :active {
      background-color: #d0d0d0;
    }
  }
`;

export const GatsbyButton = Button.withComponent(Link);
