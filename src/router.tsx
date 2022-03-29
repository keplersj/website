import { Route, Router } from "@vaadin/router";
import { render } from "atomico";
import { RouterSwitch, RouterCase } from "@atomico/router";

const loadDefaultComponent = (fileName: string) => async () => {
  const { default: Component } = await import(`./pages/${fileName}.tsx`);

  return <Component />;
};

function singlePage(slug: string, fileName: string) {
  return [
    <RouterCase
      path={`/${slug}.html`}
      load={loadDefaultComponent(fileName)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}`}
      load={loadDefaultComponent(fileName)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}/`}
      load={loadDefaultComponent(fileName)}
    ></RouterCase>,
    <RouterCase
      path={`/${slug}/index.html`}
      load={loadDefaultComponent(fileName)}
    ></RouterCase>,
  ];
}

render(
  <host>
    <RouterSwitch>
      <RouterCase
        path="/"
        load={async () => {
          const { HomePage } = await import("./pages/Home");

          return <HomePage />;
        }}
      ></RouterCase>
      <RouterCase
        path="/index.html"
        load={async () => {
          const { HomePage } = await import("./pages/Home");

          return <HomePage />;
        }}
      ></RouterCase>
      {...singlePage("about", "About")}
      {...singlePage("blog", "BlogIndex")}
      {...singlePage("blog/{slug}", "BlogPost")}
      {...singlePage("portfolio", "PortfolioIndex")}
      {...singlePage("portfolio/{slug}", "PortfolioPiece")}
      <RouterCase
        path="/{...notFound}"
        load={async () => {
          const { PageNotFoundPage } = await import("./pages/404");

          return <PageNotFoundPage />;
        }}
      ></RouterCase>
    </RouterSwitch>
  </host>,
  document.body
);
