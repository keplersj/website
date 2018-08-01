import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import * as React from "react";
import avatar from "../images/avatar.jpeg";
import "../style/main.css";

const MainHero = () => (
  <section className="hero is-fullheight is-default">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-two-thirds is-centered has-nice-link">
            <img id="profile-pic" src={avatar} width="140" height="140" />
            <h1 className="title is-2">Kepler Sticka-Jones</h1>
            <h2 className="subtitle is-4" />
            <p />
            <br />
            <p className="has-text-centered">
              <a
                className="button is-large is-white"
                href="https://github.com/keplersj"
              >
                <span className="icon">
                  <i className="fa fa-github" />
                </span>
                <span>Code</span>
              </a>
              <a
                className="button is-large is-white"
                href="https://twitter.com/keplersj"
              >
                <span className="icon">
                  <i className="fa fa-twitter" />
                </span>
                <span>Tweets</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MainHero;
