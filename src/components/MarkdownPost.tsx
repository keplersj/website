import { c, Props } from "atomico";
import { Image } from "../components/Image";
import { useHead } from "atomico-use-head";
import { useMarkdown } from "../util/use-markdown";
import { MarkdownContentContainer } from "./MarkdownContentContainer";
import { Article } from "./Article";

function component(props: Props<typeof component.props>) {
  const [tree, vfile] = useMarkdown(props.src!);

  const title: string = (vfile as any).data.frontmatter?.title;
  const datePublished: Date = (vfile as any).data.frontmatter?.date;
  const featuredImageUrl: string = (vfile as any).data.frontmatter
    ?.featured_image;

  useHead(
    {
      title: `${title} | Kepler Sticka-Jones`,
    },
    {
      hydrate: true,
    }
  );

  return (
    <host>
      <Article>
        <header>
          <h1>{title}</h1>
          <div>
            <span>
              Published{" "}
              <time datetime={datePublished}>
                {new Date(datePublished).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
          </div>
          {featuredImageUrl && (
            <figure>
              <Image src={featuredImageUrl}></Image>
            </figure>
          )}
        </header>
        <main>
          <MarkdownContentContainer>{tree}</MarkdownContentContainer>
        </main>
      </Article>
    </host>
  );
}

component.props = {
  src: String,
};

customElements.define("kepler-markdown-post", c(component));
