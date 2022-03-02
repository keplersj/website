import { c, Props } from "atomico";
import { useMarkdown } from "../util/use-markdown";
import { MarkdownContentContainer } from "./MarkdownContentContainer";

function component(props: Props<typeof component.props>) {
  const [tree] = useMarkdown(props.src!);

  return (
    <host>
      <MarkdownContentContainer>{tree}</MarkdownContentContainer>
    </host>
  );
}

component.props = {
  src: String,
};

export const KeplerMarkdown = c(component);

customElements.define("kepler-markdown", KeplerMarkdown);
