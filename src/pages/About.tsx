import { c } from "atomico";
import { NavBar } from "../components/Navbar";
import "@a11y/skip-navigation";
import styled from "styled-custom-elements";
import { Avatar } from "../components/Avatar";
import "../components/Markdown";
import education from "@kepler/education";
import experience from "@kepler/experience";
import { social } from "../../public/about/settings.json";
import { useSEO } from "../util/use-seo";
import { KeplerMarkdown } from "../components/Markdown";
import { FaSKey } from "../components/SVGFaSKey";
import { FaSEnvelope } from "../components/SVGFaSEnveolope";
import { FaBGitHub } from "../components/SVGFaBGitHub";
import { FaBTwitter } from "../components/SVGFaBTwitter";
import { FaBLinkedIn } from "../components/SVGFaBLinkedin";
import { FaBKeybase } from "../components/SVGFaBKeybase";
import { FaBInstagram } from "../components/SVGFaBInstagram";

// This is approximately the horizontal pixel measurement where the page begins to feel crampt,
//  and more vainly and subjectively when the hyphen in my last name wraps to a second line :D
const MobileBreakPoint = "839px";

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);

  justify-content: center;
  padding: 1em;

  @media screen and (max-width: ${MobileBreakPoint}) {
    grid-template-columns: initial;
  }

  @media print {
    font-size: 12px;
    grid-template-rows: repeat(4, 15vh);
    padding: 0;

    line-height: 1.25;

    ul {
      margin: 0;
    }
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

  @media screen and (max-width: ${MobileBreakPoint}) {
    grid-row: 1;
    grid-column: 1 / 4;
  }

  @media print {
    grid-row: 1;
    grid-column: 1 / 4;

    display: grid;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image: url("/assets/images/banner.jpg");
    background-image: url("/assets/images/banner-opt.jpeg");
    background-image: image-set(
      url("/assets/images/banner-opt.avif") type("image/avif"),
      url("/assets/images/banner-opt.wpeg") type("image/webp"),
      url("/assets/images/banner-opt.jpeg") type("image/jpeg")
    );

    width: 100%;
    margin: 0;
  }
`;

customElements.define("kepler-about-profile-container", ProfileContainer, {
  extends: "header",
});

const ExperienceContainer = styled.main`
  margin: 1em;
  display: flex;
  flex-direction: column;

  grid-row: 2;
  grid-column: 2 / 4;

  @media screen and (min-width: ${MobileBreakPoint}) {
    grid-row: 1 / 4;
  }

  @media print {
    margin: auto;
  }
`;

customElements.define(
  "kepler-about-experience-container",
  ExperienceContainer,
  { extends: "main" }
);

const Name = styled.span`
  font-size: 2em;

  @media print {
    grid-column: 2;
    grid-row: 1;
  }
`;

customElements.define("kepler-about-name", Name, { extends: "span" });

const Location = styled.span`
  font-size: 1em;

  @media print {
    grid-row: 1;
    grid-column: 3;
  }
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

  @media print {
    display: none;
  }
`;

customElements.define("kepler-about-social-container", ProfileLinksContainer, {
  extends: "address",
});

const SocialLink = styled.a`
  font-size: 1.5em;
  padding: 0.5em;
`;

customElements.define("kepler-about-social-link", SocialLink, { extends: "a" });

const SkillsContainer = styled.div`
  grid-row: 2;
  grid-column: 1;

  @media screen and (max-width: ${MobileBreakPoint}) {
    grid-row: 3;
    grid-column: 1 / 4;
  }
`;

customElements.define("kepler-about-skills-container", SkillsContainer, {
  extends: "div",
});

const Article = styled.article`
  &[data-noprint="true"] {
    @media print {
      display: none;
    }
  }
`;

customElements.define("kepler-about-article", Article, { extends: "article" });

const AvatarContainer = styled.div`
  @media print {
    max-width: 200px;
    max-height: 200px;

    height: 150px;
    width: 150px;

    div {
      height: 150px;
      width: 150px;
    }

    justify-self: center;
  }
`;

customElements.define("kepler-about-avatar-container", AvatarContainer, {
  extends: "div",
});

function getDateString(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const faClassForSocial: { [name: string]: typeof HTMLElement } = {
  Email: FaSEnvelope,
  PGP: FaSKey,
  GitHub: FaBGitHub,
  Twitter: FaBTwitter,
  LinkedIn: FaBLinkedIn,
  Keybase: FaBKeybase,
  Instagram: FaBInstagram,
};

function component() {
  useSEO({
    title: "About",
    path: "/about",
  });

  return (
    <host>
      <skip-button></skip-button>
      <NavBar data-hydrate></NavBar>
      <skip-anchor></skip-anchor>
      <AboutContainer>
        <ProfileContainer>
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
          <Name role="heading" aria-level={1} title="Name">
            Kepler Sticka-Jones
          </Name>
          <Location role="heading" aria-level={2} title="Location">
            Salt Lake City, UT, USA
          </Location>
          <ProfileLinksContainer role="list">
            {social.map((profile: any) => {
              const Icon = faClassForSocial[profile.name];

              return (
                <SocialLink
                  role="listitem"
                  key={`${profile.name}__${profile.id}__${profile.url}`}
                  href={profile.url}
                  name={profile.name}
                  aria-label={`${profile.name}: ${profile.id}`}
                >
                  <Icon />
                </SocialLink>
              );
            })}
          </ProfileLinksContainer>
        </ProfileContainer>
        <ExperienceContainer>
          <Article data-noprint="true">
            <h1>Biography</h1>
            <KeplerMarkdown
              src="/about/biography.md"
              data-hydrate
            ></KeplerMarkdown>
          </Article>
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
                      no_print: noPrint,
                    },
                  },
                  index
                ) => (
                  <Article data-noprint={noPrint} key={`experience-${index}`}>
                    <h2>{position}</h2>
                    <Detail>{title}</Detail>
                    <Detail>
                      <time dateTime={startDate}>
                        {getDateString(startDate)}
                      </time>
                      {" - "}
                      {endDate ? (
                        <time dateTime={endDate}>{getDateString(endDate)}</time>
                      ) : (
                        <time dateTime={new Date().toISOString()}>Present</time>
                      )}
                    </Detail>
                    <KeplerMarkdown
                      src={markdownUrl}
                      data-hydrate
                    ></KeplerMarkdown>
                  </Article>
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
                      no_print: noPrint,
                    },
                  },
                  index
                ) => (
                  <Article data-noprint={noPrint} key={`education-${index}`}>
                    <h2>{title}</h2>
                    {degree && <Detail>{degree}</Detail>}
                    <Detail>
                      <time dateTime={startDate}>
                        {getDateString(startDate)}
                      </time>
                      {" - "}
                      {endDate ? (
                        <time dateTime={endDate}>{getDateString(endDate)}</time>
                      ) : (
                        <time dateTime={new Date().toISOString()}>Present</time>
                      )}
                    </Detail>
                    <KeplerMarkdown
                      src={markdownUrl}
                      data-hydrate
                    ></KeplerMarkdown>
                  </Article>
                )
              )}
          </div>
        </ExperienceContainer>
        <SkillsContainer>
          <h1>Skills</h1>
          <KeplerMarkdown src="/about/skills.md" data-hydrate></KeplerMarkdown>
        </SkillsContainer>
      </AboutContainer>
    </host>
  );
}

customElements.define("kepler-about", c(component));
