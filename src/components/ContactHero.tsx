import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import * as React from "react";
import "../style/main.css";

const ContactHero = () => (
  <section className="hero is-fullheight is-primary">
    <div id="contact" className="hero-body">
      <div className="container has-text-centered is-dark-text has-nice-link">
        <h1 className="title is-1">Contact</h1>
        <h3 className="title is-3">
          Email:{" "}
          <a href="mailto:kepler@stickajones.org">kepler@stickajones.org</a>
        </h3>
        <h3 className="title is-3">
          Public Key:{" "}
          <a href="https://keybase.io/keplersj/pgp_keys.asc?fingerprint=bd03eb5926203455cf0a838ef711c2d538d9cf6c">
            BD03 EB59 2620 3455 CF0A 838E F711 C2D5 38D9 CF6C
          </a>
        </h3>
      </div>
    </div>
  </section>
);

export default ContactHero;
