import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const PostContainer = styled.div`
  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

interface Props {
  location: string;
  title: string;
  publishDate: string;
  wordCount: string;
  minutesNeededToRead: string;
  description: string;
}

export const BlogPostItem = (props: Props): React.ReactElement<Props> => (
  <PostContainer>
    <Link to={props.location}>
      <h2>{props.title}</h2>
    </Link>
    <div>
      <span>Published {props.publishDate}</span>
      <span>{" | "}</span>
      <span>{props.wordCount} words</span>
      <span>{" | "}</span>
      <span>{props.minutesNeededToRead} minute read</span>
    </div>
    <div>{props.description}</div>
  </PostContainer>
);
