import { c, css, html } from "atomico";
import "starstuff-components";

function component() {
  return html`
    <host shadowDom>
      <div class="avatar"></div>
      <h1>Kepler Sticka-Jones</h1>
      <div>
        <starstuff-hyperbutton href="./blog/">Blog</starstuff-hyperbutton>
        <starstuff-hyperbutton href="./portfolio/">
          Portfolio
        </starstuff-hyperbutton>
        <starstuff-hyperbutton href="./about/">About</starstuff-hyperbutton>
      </div>
    </host>
  `;
}

component.styles = css`
  :host {
    min-height: 66vh;
    background: red;
    backdrop-filter: blur(20px);
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* :host div {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.125;
    margin-bottom: 1.5rem;
  } */

  a,
  starstuff-hyperbutton {
    color: #fff;
  }
`;

customElements.define("kepler-hero", c(component));
