import { c, Props } from "atomico";
import { Image } from "./Image";

function component(props: Props<typeof component.props>) {
  return (
    <host>
      <a href={props.src}>
        <Image src={props.src} alt={props.alt} />
      </a>
    </host>
  );
}

component.props = {
  alt: String,
  src: String,
};

export const Hyperimage = c(component);

customElements.define("kepler-hyperimage", Hyperimage);
