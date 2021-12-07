import { c, css, html } from "atomico";
import "starstuff-components";

function component({ json }) {
  const posts = JSON.parse(json);

  return html`
    <host shadowDom>
      ${posts.map(
        (post) => html`
          <starstuff-card key=${post.url}>
            <div>
              <a href=${"/" + post.url}><h2>${post.title || post.url}</h2></a>
            </div>
          </starstuff-card>
        `
      )}
    </host>
  `;
}

component.props = {
  json: String,
};

component.styles = css`
  starstuff-card {
    display: flex;
    @media screen and (min-width: 512px) {
      min-height: 192px;
    }
    @media screen and (max-width: 512px) {
      flex-direction: column;
    }
  }

  starstuff-card > div {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

customElements.define("kepler-blog-index", c(component));
