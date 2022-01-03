import { c } from "atomico";
import { css } from "@emotion/css";
import avatarUrl from "../../public/assets/images/avatar.jpg";

function component() {
  return (
    <host>
      <div
        class={css`
          margin-bottom: 10px;
          border-radius: 140px;
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 200px;
          height: 200px;
        `}
        role="img"
        aria-label="Avatar"
      >
        <img
          class={css`
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          `}
          src={avatarUrl}
        />
      </div>
    </host>
  );
}

export const Avatar = c(component);

customElements.define("kepler-avatar", Avatar);
