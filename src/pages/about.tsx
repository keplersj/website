import * as React from "react";
import styled from "@emotion/styled";
import {
  FaGithub,
  FaTwitter,
  FaKeybase,
  FaEnvelope,
  FaKey,
  FaLinkedin
} from "react-icons/fa";
import BaseLayout from "../layouts/Base";
import { Avatar } from "../components/Avatar";
import { Card } from "starstuff-components";

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

const ProfileContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 33vw;

  @media (max-width: ${MobileBreakPoint}) {
    min-width: inherit;
  }
`;

const ProfileLinksContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LinkSize = "1.5em";

const ExperienceContainer = styled.div`
  margin: 1em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SocialLink = styled.a`
  padding: 0.5em;
`;

const Name = styled.span`
  font-size: 2em;
`;

const Location = styled.span`
  font-size: 1em;
`;

const AboutPage = (): React.ReactElement => (
  <BaseLayout>
    <AboutContainer>
      <ProfileContainer>
        <Avatar />
        <Name>Kepler Sticka-Jones</Name>
        <Location>Salt Lake City, UT, USA</Location>
        <ProfileLinksContainer id="#contact">
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:kepler@stickajones.org"
          >
            <FaEnvelope size={LinkSize} title="Email: kepler@stickajones.org" />
          </SocialLink>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://keybase.io/keplersj/pgp_keys.asc?fingerprint=bd03eb5926203455cf0a838ef711c2d538d9cf6c"
          >
            <FaKey
              size={LinkSize}
              title="PGP Public Key: BD03 EB59 2620 3455 CF0A 838E F711 C2D5 38D9 CF6C"
            />
          </SocialLink>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/keplersj"
          >
            <FaGithub size={LinkSize} title="GitHub: keplersj" />
          </SocialLink>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/realKeplerSJ"
          >
            <FaTwitter size={LinkSize} title="Twitter: @realKeplerSJ" />
          </SocialLink>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/keplersj/"
          >
            <FaLinkedin size={LinkSize} title="LinkedIn: keplersj" />
          </SocialLink>
          <SocialLink
            target="_blank"
            rel="noopener noreferrer"
            href="https://keybase.io/keplersj"
          >
            <FaKeybase size={LinkSize} title="Keybase: keplersj" />
          </SocialLink>
        </ProfileLinksContainer>
      </ProfileContainer>
      <ExperienceContainer>
        <Card
          title="Biography"
          supporting="I am a computer programmer and college student based out of Salt Lake
          City, with experience in entrepreneurship, student leadership, and
          open source software development."
        />
        <Card
          title="Experience"
          supporting={
            <div>
              <div>
                <h3>Lassonde Entrepreneur Institute</h3>
                <div>
                  <h4>Director of Company Launch</h4>
                  <div>Apr 2019 - Present</div>
                </div>
                <div>
                  <h4>Company Launch Associate</h4>
                  <div>Aug 2018 - Apr 2019</div>
                  <div>
                    <ul>
                      <li>
                        Developed a close, mentoring relationship with student
                        entrepreneurs
                      </li>
                      <li>
                        Worked to create a diverse and active cohort of
                        companies at various stages
                      </li>
                      <li>
                        Helped student entrepreneurs overcome obstacles and
                        accomplish milestones
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3>Marriott Library</h3>
                <div>
                  <h4>Computer Operator</h4>
                  <div>May 2017 - Present</div>
                  <div>
                    <ul>
                      <li>
                        Fulfilled Patron Requests within Precise Specifications
                      </li>
                      <li>
                        Worked within Small Team to Fulfill Requests in a Timely
                        Manner
                      </li>
                      <li>
                        Digitized Sensitive Documents using situation specific
                        hardware and software
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3>Associated Students of the University of Utah</h3>
                <div>
                  <h4>Associate Director of Student Resources</h4>
                  <div>Jun 2018 - Mar 2019</div>
                  <div>
                    <ul>
                      <li>
                        Created and maintained dataset of businesses offering
                        discounts for students
                      </li>
                      <li>
                        Met with students confidentially in order to discuss
                        sensitive and personal issues
                      </li>
                      <li>
                        Connected students with various issue-relevant on-campus
                        resource when needed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3>Blerp</h3>
                <div>
                  <h4>Founder & Chief Technology Officer</h4>
                  <div>Oct 2016 - Feb 2018</div>
                  <div>
                    {
                      "Founded the company in the Company Launch space at Lassonde Studios on the University of Utah campus with cofounder Aaron Hsu. I led the development of and oversaw the whole of Blerp's technical products including the Blerp Progressive Web App (found at https://blerp.com), iOS app, Android app, and public API (found at https://blerp.com/api.) While building the products many open source projects were utilized and contributed to such as GraphQL (with Apollo), React Native, Flowtype, and TypeScript."
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Card
          title="Education"
          supporting={
            <div>
              <div>
                <h3>University of Utah</h3>
                <div>
                  <h4>Political Science BS</h4>
                  <div>2016 - Present</div>
                  <div>
                    Lassonde Entrepreneur Institute, Lassonde 400 L1, HackTheU,
                    Association for Computing Machinery, Associated Students of
                    the University of Utah
                  </div>
                </div>
              </div>
              <div>
                <h3>Judge Memorial Catholic High School</h3>
                <div>2012 - 2016</div>
                <div>
                  Debate, Programming, FIRST Robotics Competition, SkillsUSA 3D
                  Animation Competition, Quidditch, Peer Ministry, National
                  Junior Classical League
                </div>
              </div>
            </div>
          }
        />
        <Card
          title="Skills"
          supporting={
            <div>
              Team Management, Team Leadership, Mentorship, Computer Programming
              (Full-stack JavaScript, HTML5, iOS, Android)
            </div>
          }
        />
      </ExperienceContainer>
    </AboutContainer>
  </BaseLayout>
);

export default AboutPage;
