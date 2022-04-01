import { c, Props, useEffect, useRef, useState } from "atomico";
import { useHead } from "atomico-use-head";

function component({ sectionId }: Props<typeof component.props>) {
  useHead({
    link: [
      {
        href: "https://latest.cactus.chat/style.css",
        rel: "stylesheet",
        type: "text/css",
      },
    ],
  });
  const cactusContainerRef = useRef();
  const [cactusLoaded, setCactusLoaded] = useState(false);
  useEffect(() => {
    async function loadCactus() {
      // @ts-ignore
      await import("https://latest.cactus.chat/cactus.js").catch((error) =>
        console.info("Error From Loading Cactus: ", error)
      );

      setCactusLoaded(true);

      // @ts-ignore
      initComments({
        node: cactusContainerRef.current,
        defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
        serverName: "cactus.chat",
        siteName: "keplersj.com",
        commentSectionId: sectionId,
      });
    }

    loadCactus();
  });

  return (
    <host shadowDom>
      <link
        rel="stylesheet"
        href="https://latest.cactus.chat/style.css"
        type="text/css"
      ></link>
      {cactusLoaded == false && <h1>Loading Cactus Comments</h1>}
      <div ref={cactusContainerRef}></div>
    </host>
  );
}

component.props = {
  sectionId: String,
};

const CactusComments = c(component);
export default CactusComments;

customElements.define("kepler-cactus-comments", CactusComments);
