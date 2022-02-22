import { c } from "atomico";
import "../components/Navbar";
import "@a11y/skip-navigation";
import styled from "styled-custom-elements";
import { Avatar } from "../components/Avatar";
import "../components/Markdown";
import education from "@kepler/education";
import experience from "@kepler/experience";
import { social } from "../../public/about/settings.json";
import { useHead } from "atomico-use-head";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import { useSEO } from "../util/use-seo";

// This is approximately the horizontal pixel measurement where the page begins to feel crampt,
//  and more vainly and subjectively when the hyphen in my last name wraps to a second line :D
const MobileBreakPoint = "839px";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 1em;
  @media (max-width: ${MobileBreakPoint}) {
    flex-direction: column;
  }
`;

customElements.define("kepler-about-container", AboutContainer, {
  extends: "div",
});

const ProfileContainer = styled.header`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 33vw;
  @media (max-width: ${MobileBreakPoint}) {
    min-width: inherit;
  }
`;

customElements.define("kepler-about-profile-container", ProfileContainer, {
  extends: "header",
});

const ExperienceContainer = styled.main`
  margin: 1em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

customElements.define(
  "kepler-about-experience-container",
  ExperienceContainer,
  { extends: "main" }
);

const Name = styled.span`
  font-size: 2em;
`;

customElements.define("kepler-about-name", Name, { extends: "span" });

const Location = styled.span`
  font-size: 1em;
`;

customElements.define("kepler-about-location", Location, { extends: "span" });

const Detail = styled.span`
  :not(:last-of-type) {
    ::after {
      content: " · ";
    }
  }
`;

customElements.define("kepler-about-detail", Detail, { extends: "span" });

const ProfileLinksContainer = styled.address`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

customElements.define("kepler-about-social-container", ProfileLinksContainer, {
  extends: "address",
});

const SocialLink = styled.a`
  font-size: 1.5em;
  padding: 0.5em;
`;

customElements.define("kepler-about-social-link", SocialLink, { extends: "a" });

function getDateString(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const faClassForSocial: { [name: string]: string } = {
  Email: "fas fa-envelope",
  PGP: "fas fa-key",
  GitHub: "fab fa-github",
  Twitter: "fab fa-twitter",
  LinkedIn: "fab fa-linkedin",
  Keybase: "fab fa-keybase",
  Instagram: "fab fa-instagram",
};

function component() {
  useSEO({
    title: "About",
    path: "/about",
  });

  return (
    <host>
      <skip-button></skip-button>
      <kepler-navbar data-hydrate></kepler-navbar>
      <skip-anchor></skip-anchor>
      <div is="kepler-about-container">
        <header is="kepler-about-profile-container">
          <Avatar />
          <span
            is="kepler-about-name"
            role="heading"
            aria-level={1}
            title="Name"
          >
            Kepler Sticka-Jones
          </span>
          <span
            is="kepler-about-location"
            role="heading"
            aria-level={2}
            title="Location"
          >
            Salt Lake City, UT, USA
          </span>
          <address is="kepler-about-social-container" role="list">
            {social.map((profile) => (
              <a
                is="kepler-about-social-link"
                role="listitem"
                key={`${profile.name}__${profile.id}__${profile.url}`}
                href={profile.url}
                name={profile.name}
                aria-label={`${profile.name}: ${profile.id}`}
              >
                <i class={faClassForSocial[profile.name]}></i>
              </a>
            ))}
          </address>
        </header>
        <main is="kepler-about-experience-container">
          <div>
            <h1>Biography</h1>
            <kepler-markdown
              src="/about/biography.md"
              data-hydrate
            ></kepler-markdown>
          </div>
          <div>
            <h1>Experience</h1>
            {experience
              .sort(
                (a, b) =>
                  new Date(b.frontmatter?.start_date).getTime() -
                  new Date(a.frontmatter?.start_date).getTime()
              )
              .map(
                (
                  {
                    markdownUrl,
                    frontmatter: {
                      title,
                      position,
                      start_date: startDate,
                      end_date: endDate,
                    },
                  },
                  index
                ) => (
                  <article key={`experience-${index}`}>
                    <h2>{position}</h2>
                    <span is="kepler-about-detail">{title}</span>
                    <span is="kepler-about-detail">
                      <time dateTime={startDate}>
                        {getDateString(startDate)}
                      </time>
                      {" - "}
                      {endDate ? (
                        <time dateTime={endDate}>{getDateString(endDate)}</time>
                      ) : (
                        <time dateTime={new Date().toISOString()}>Present</time>
                      )}
                    </span>
                    <kepler-markdown
                      src={markdownUrl}
                      data-hydrate
                    ></kepler-markdown>
                  </article>
                )
              )}
          </div>
          <div>
            <h1>Education</h1>
            {education
              .sort(
                (a, b) =>
                  new Date(b.frontmatter?.start_date).getTime() -
                  new Date(a.frontmatter?.start_date).getTime()
              )
              .map(
                (
                  {
                    markdownUrl,
                    frontmatter: {
                      title,
                      degree,
                      start_date: startDate,
                      end_date: endDate,
                    },
                  },
                  index
                ) => (
                  <article key={`education-${index}`}>
                    <h2>{title}</h2>
                    {degree && <span is="kepler-about-detail">{degree}</span>}
                    <span is="kepler-about-detail">
                      <time dateTime={startDate}>
                        {getDateString(startDate)}
                      </time>
                      {" - "}
                      {endDate ? (
                        <time dateTime={endDate}>{getDateString(endDate)}</time>
                      ) : (
                        <time dateTime={new Date().toISOString()}>Present</time>
                      )}
                    </span>
                    <kepler-markdown
                      src={markdownUrl}
                      data-hydrate
                    ></kepler-markdown>
                  </article>
                )
              )}
          </div>
          <div>
            <h1>Skills</h1>
            <kepler-markdown
              src="/about/skills.md"
              data-hydrate
            ></kepler-markdown>
          </div>
        </main>
      </div>
    </host>
  );
}

customElements.define("kepler-about", c(component));
