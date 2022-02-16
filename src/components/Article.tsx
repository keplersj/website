import styled from "styled-custom-elements";

export const Article = styled.article`
  max-width: 55em;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 55em) {
    margin-left: 2em;
    margin-right: 2em;
  }
`;

customElements.define("kepler-common-article", Article, {
  extends: "article",
});
