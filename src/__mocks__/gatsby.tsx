import * as React from "react";
const gatsby = jest.requireActual("gatsby");
import { graphql } from "graphql";

type MockedGraphQLReturn = Promise<any>;

const mockedGraphQLQuery = (query: string): MockedGraphQLReturn =>
  graphql(undefined, query);

interface StaticQueryHOCProps {
  query: MockedGraphQLReturn;
  render?: (data: object) => React.ReactElement;
  children?: (data: object) => React.ReactElement;
}

const mockedStaticQueryHOC = (
  props: StaticQueryHOCProps
): React.ReactElement => {
  if (!props.children || !props.render) {
    throw new Error("Render prop must be provided!");
  }

  return (
    (props.children && props.children({})) ||
    (props.render && props.render({})) || <div>Error!</div>
  );
};

const mockedStaticQueryHook = (data: MockedGraphQLReturn): object => ({});

module.exports = {
  ...gatsby,
  graphql: jest.fn(mockedGraphQLQuery),
  Link: jest.fn(
    ({
      // these props are invalid for an `a` tag
      /* eslint-disable @typescript-eslint/no-unused-vars */
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      to,
      ...rest
    }): React.ReactElement => <a {...rest} href={to} />
  ),
  StaticQuery: jest.fn(mockedStaticQueryHOC),
  useStaticQuery: jest.fn(mockedStaticQueryHook)
};
