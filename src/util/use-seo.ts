import { useHead } from "atomico-use-head";

interface Metadata {
  title: string;
}

const defaultMetadata: Metadata = {
  title: "Kepler Sticka-Jones",
};

export function useSEO(metadata: Partial<Metadata> = defaultMetadata) {
  const metadataComposite: Metadata = {
    ...defaultMetadata,
    ...metadata,
  };

  useHead({
    htmlAttrs: {
      lang: "en",
    },
    title:
      metadata.title && metadata.title !== defaultMetadata.title
        ? `${metadata.title} | ${defaultMetadata.title}`
        : defaultMetadata.title,
  });
}
