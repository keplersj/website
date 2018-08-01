import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.css";
import * as React from "react";
import Helmet from "react-helmet";
import ContactHero from "../components/ContactHero";
import MainHero from "../components/MainHero";
import avatar from "../images/avatar.jpeg";
import "../style/main.css";

const Index = () => (
  <>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Kepler Sticka-Jones" />
      <meta name="description" content="" />
      <meta name="theme-color" content="#409040" />
      <meta property="og:title" content="Kepler Sticka-Jones" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://keplersj.com" />
      <meta property="og:image" content={avatar} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="480" />
      <meta property="og:image:height" content="480" />
      <meta property="og:description" content="" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@keplersj" />
      <meta name="twitter:creator" content="@keplersj" />
      <title>Kepler Sticka-Jones</title>
    </Helmet>

    <MainHero />

    <ContactHero />
  </>
);

export default Index;
