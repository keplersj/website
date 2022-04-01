import { c, Props } from "atomico";
import "../components/Navbar";
import "../components/MarkdownPost";
import "@a11y/skip-navigation";

function component({ slug }: Props<typeof component.props>) {
  const src = "/blog/" + slug?.replace(".html", "") + ".md";

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
        <kepler-markdown-post
          src={src}
          slug={slug?.replace(".html", "")}
          data-hydrate
        ></kepler-markdown-post>
      </main>
    </host>
  );
}

component.props = {
  slug: String,
};

const BlogPost = c(component);

export default BlogPost;

customElements.define("kepler-blog-post", BlogPost);
