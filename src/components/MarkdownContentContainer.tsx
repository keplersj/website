import styled from "styled-custom-elements";

export const MarkdownContentContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

customElements.define(
  "kepler-common-markdown-container",
  MarkdownContentContainer,
  {
    extends: "div",
  }
);
