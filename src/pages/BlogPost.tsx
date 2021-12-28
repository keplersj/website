import { c, Props } from "atomico";
import "../components/Navbar";
import "../components/MarkdownPost";
import "@a11y/skip-navigation";

function component({ src }: Props<typeof component.props>) {
  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <main>
        <link
          as="fetch"
          href={src}
          crossorigin=""
          type="text/markdown"
          rel="preload"
        />
        <kepler-markdown-post src={src} data-hydrate></kepler-markdown-post>
      </main>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-blog-post", c(component));
