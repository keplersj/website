import * as React from "react";
import { Link } from "gatsby";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import BaseLayout from "../components/BaseLayout";
import { Helmet } from "react-helmet";
import { WebPage } from "schema-dts";
import { BannerBackground } from "../components/BannerBackground";

const Background = styled(BannerBackground)`
  max-height: 100vh;
  max-width: 100vw;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(5px);

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const FourOhFourPage = (): React.ReactElement => (
  <>
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://www.schema.org",
          "@type": "WebPage",
          name: "404! | Kepler Sticka-Jones"
        } as WebPage)}
      </script>
    </Helmet>

    <BaseLayout title="404!" hideNavbar>
      <Global
        styles={css`
          body {
            color: #505050;
            font-size: 1.5em;
            font-weight: 500;
            line-height: 1.5;
          }
        `}
      />

      <Background highQuality Tag="section">
        <Container>
          <div>
            <h1>404!</h1>
            <span>
              Maybe, go back to the <Link to="/">home page</Link>?
            </span>
          </div>
        </Container>
      </Background>
    </BaseLayout>
  </>
);

export default FourOhFourPage;
