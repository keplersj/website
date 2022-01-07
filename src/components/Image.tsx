import { c, Props } from "atomico";
import styled from "styled-custom-elements";

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

customElements.define("kepler-image-img", StyledImage, {
  extends: "img",
});

function component(props: Props<typeof component.props>) {
  return (
    <host>
      <picture>
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
