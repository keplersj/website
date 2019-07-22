import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../layouts/Base";
import { Helmet } from "react-helmet";
import { Link as NiceLink } from "../components/Link";

const Container = styled.div`
  text-align: center !important;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 auto;
  position: relative;
  width: auto;

  @media screen and (min-width: 1024px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1216px) {
    max-width: 1152px;
  }
`;

const HeroBody = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
`;

const ContactHero = styled.section`
  min-height: 100vh;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Contact = styled.h1`
  /* color: #363636; */
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.125;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ContactItems = styled.h3`
  /* color: #363636; */
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const ContactPage = () => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "ContactPage",
          name: "Contact | Kepler Sticka-Jones",
          url: "/contact"
        })}
      </script>
    </Helmet>

    <BaseLayout title="Contact">
      <ContactHero>
        <HeroBody>
          <Container>
            <Contact>Contact</Contact>
            <ContactItems>
              Email:{" "}
              <NiceLink href="mailto:kepler@stickajones.org">
                kepler@stickajones.org
              </NiceLink>
            </ContactItems>
            <ContactItems>
              Public Key:{" "}
              <NiceLink href="https://keybase.io/keplersj/pgp_keys.asc?fingerprint=bd03eb5926203455cf0a838ef711c2d538d9cf6c">
                BD03 EB59 2620 3455 CF0A 838E F711 C2D5 38D9 CF6C
              </NiceLink>
            </ContactItems>
          </Container>
        </HeroBody>
      </ContactHero>
    </BaseLayout>
  </>
);

export default ContactPage;
