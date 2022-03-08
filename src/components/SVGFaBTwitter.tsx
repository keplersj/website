import { c } from "atomico";
import { css } from "@emotion/css";
import * as icon from "@fortawesome/free-brands-svg-icons/faTwitter";

function component() {
  return (
    <host>
      <svg
        class={css`
          display: inline-block;
          height: 1em;
          overflow: visible;
          vertical-align: -0.125em;

          &:not(:host),
          &:not(:root) {
            overflow: visible;
            box-sizing: content-box;
          }
        `}
        aria-hidden="true"
        focusable="false"
        data-prefix={icon.prefix}
        data-icon={icon.iconName}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${icon.width} ${icon.height} `}
      >
        <path fill="currentColor" d={icon.svgPathData}></path>
      </svg>
    </host>
  );
}

export const FaBTwitter = c(component);

customElements.define("kepler-icon-svg-fa-b-twitter", FaBTwitter);
