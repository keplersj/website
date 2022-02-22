import { useHead } from "atomico-use-head";

const siteUrlBase = "https://keplersj.com";

interface Metadata {
  title: string;
  description: string;
  path: string;
}

const defaultMetadata: Metadata = {
  title: "Kepler Sticka-Jones",
  description:
    "Kepler Sticka-Jones is a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development.",
  path: "/",
};

export function useSEO(metadata: Partial<Metadata> = defaultMetadata) {
  const metadataComposite: Metadata = {
    ...defaultMetadata,
    ...metadata,
  };

  useHead(
    {
      htmlAttrs: {
        lang: "en",
      },
      title:
        metadata.title && metadata.title !== defaultMetadata.title
          ? `${metadata.title} | ${defaultMetadata.title}`
          : defaultMetadata.title,
      meta: [
        {
          name: "description",
          content: metadataComposite.description,
        },
        {
          name: "og:site_name",
          content: defaultMetadata.title,
        },
        {
          name: "og:title",
          content: metadataComposite.title,
        },
        {
          name: "og:url",
          content: `${siteUrlBase}${metadataComposite.path}`,
        },
        {
          name: "og:description",
          content: metadataComposite.description,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "theme-color",
          content: "#4a4a4a",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `${siteUrlBase}${metadataComposite.path}`,
        },
        {
          rel: "icon",
          href: "/favicon.ico",
          type: "image/png",
          sizes: "16x16",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
      ],
    },
    {
      hydrate: true,
      dirty: true,
    }
  );
}
