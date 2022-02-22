import { c } from "atomico";
import styled from "styled-custom-elements";
import { Image } from "./Image";

const AvatarContainer = styled.div`
  margin-bottom: 10px;
  border-radius: 140px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 200px;
`;

customElements.define("kepler-avatar-container", AvatarContainer, {
  extends: "div",
});

const AvatarImage = styled(Image)`
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

customElements.define("kepler-avatar-image", AvatarImage);

function component() {
  return (
    <host>
      <div is="kepler-avatar-container" role="img" aria-label="Avatar">
        <AvatarImage alt="" src="/assets/images/avatar.jpg" />
      </div>
    </host>
  );
}

export const Avatar = c(component);

customElements.define("kepler-avatar", Avatar);
