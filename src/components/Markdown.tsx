import { c, Props } from "atomico";
import styled from "styled-custom-elements";
import { useMarkdown } from "../util/use-markdown";

const ContentContainer = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }
`;

customElements.define("kepler-markdown-container", ContentContainer, {
  extends: "div",
});

function component(props: Props<typeof component.props>) {
  const [tree] = useMarkdown(props.src!);

  return (
    <host>
      <ContentContainer>{tree}</ContentContainer>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown", c(component));
