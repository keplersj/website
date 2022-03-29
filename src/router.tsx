import { render } from "atomico";
import { RouterSwitch, RouterCase } from "@atomico/router";

type RouterParameters = { [key: string]: string };
type AdditionalCheck = (parameters: RouterParameters) => Promise<boolean>;

const loadDefaultComponent =
  (fileName: string, check?: AdditionalCheck) =>
  async (parameters: RouterParameters) => {
    if (check && (await check(parameters)) == false) {
      const { default: PageNotFound } = await import("./pages/404");

      return <PageNotFound />;
    }

    const { default: Component } = await import(`./pages/${fileName}.tsx`);

    return <Component {...parameters} />;
  };

function singlePage(
  slug: string,
  fileName: string,
  additionalCheck?: AdditionalCheck
) {
  return [
    <RouterCase
      path={`/${slug}.html`}
      load={loadDefaultComponent(fileName, additionalCheck)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}`}
      load={loadDefaultComponent(fileName, additionalCheck)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}/`}
      load={loadDefaultComponent(fileName, additionalCheck)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}/index.html`}
      load={loadDefaultComponent(fileName, additionalCheck)}
    ></RouterCase>,
  ];
}

render(
  <host>
    <RouterSwitch>
      <RouterCase path="/" load={loadDefaultComponent("Home")}></RouterCase>
      <RouterCase
        path="/index.html"
        load={loadDefaultComponent("Home")}
      ></RouterCase>
      {...singlePage("about", "About")}
      {...singlePage("blog", "BlogIndex")}
      {...singlePage("blog/{slug}", "BlogPost", async ({ slug }) => {
        const src = "/blog/" + slug.replace(".html", "") + ".md";
        const srcFetch = await fetch(src);

        return srcFetch.ok;
      })}
      {...singlePage("portfolio", "PortfolioIndex")}
      {...singlePage("portfolio/{slug}", "PortfolioPiece", async ({ slug }) => {
        const src = "/portfolio/" + slug.replace(".html", "") + ".md";
        const srcFetch = await fetch(src);

        return srcFetch.ok;
      })}
      <RouterCase
        path="/{...notFound}"
        load={loadDefaultComponent("404")}
      ></RouterCase>
    </RouterSwitch>
  </host>,
  document.body
);
