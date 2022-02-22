import { c, Props } from "atomico";
import "../components/Navbar";
import "../components/MarkdownPost";
import "@a11y/skip-navigation";

function component({ location }: Props<typeof component.props>) {
  const src = "/blog/" + location?.params.slug.replace(".html", "") + ".md";

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
  location: Object,
};

class Element extends c(component) {
  async onBeforeEnter(location, commands, router) {
    const src = "/blog/" + location?.params.slug.replace(".html", "") + ".md";
    const srcFetch = await fetch(src);

    if (!srcFetch.ok) {
      return commands.redirect("/404");
    }
  }
}

export default Element;

customElements.define("kepler-blog-post", Element);
