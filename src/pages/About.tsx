import { c } from "atomico";
import "../components/Navbar";
import "@a11y/skip-navigation";

function component() {
  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <main>
        <p>This is going to be the about page!</p>
      </main>
    </host>
  );
}

customElements.define("kepler-about", c(component));
