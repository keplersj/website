import { c, Props } from "atomico";
import "../components/Navbar";
import "../components/Markdown";
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
        <kepler-markdown src={src} data-hydrate></kepler-markdown>
      </main>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-portfolio-piece", c(component));
