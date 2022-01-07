import { c, Props } from "atomico";
import { css } from "@emotion/css";
import remarkPresetClient from "../util/remark-preset-client";
import rehypePresetClient from "../util/rehype-preset-client";
import "webcomponent-markdown";

// This is so hacky and I hate it, but I don't want to have to configure unified plugins more than once

function component(props: Props<typeof component.props>) {
  return (
    <host>
      <remark-markdown
        src={props.src}
        class={css`
          img {
            max-width: 100%;
            height: auto;
          }
        `}
        remarkPlugins={remarkPresetClient}
        rehypePlugins={rehypePresetClient}
        data-hydrate
      ></remark-markdown>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown", c(component));
