import { c, Props } from "atomico";
import styled from "styled-custom-elements";

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

customElements.define("kepler-image-img", StyledImage, {
  extends: "img",
});

const sizeBreakpoints = [
  256, 512, 768, 1024,
  // 720p
  1280,
  // 1080p
  1920,
  // 4k
  3840,
  // 5k
  5120,
  // 8k
  7680,
];

function srcset(srcParts: string[], format: string) {
  return [
    ...sizeBreakpoints.map((width) =>
      [...srcParts, `-opt-${width}-retain`, `.${format}`, ` ${width}w`].join("")
    ),
    [...srcParts, "-opt", `.${format}`].join(""),
  ].join(", ");
}

function component(props: Props<typeof component.props>) {
  const srcParts = props.src?.split(".");

  srcParts?.pop();

  return (
    <host>
      <picture>
        <source srcset={srcset(srcParts!, "avif")} type="image/avif"></source>
        <source srcset={srcset(srcParts!, "webp")} type="image/webp"></source>
        <source srcset={srcset(srcParts!, "jpeg")} type="image/jpeg"></source>
        <img
          is="kepler-image-img"
          alt={props.alt}
          src={props.src}
          loading="lazy"
        ></img>
      </picture>
    </host>
  );
}

component.props = {
  alt: String,
  src: String,
};

export const Image = c(component);

customElements.define("kepler-image", Image);
