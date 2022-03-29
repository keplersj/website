import { Route, Router } from "@vaadin/router";
import { render } from "atomico";
import { RouterSwitch, RouterCase } from "@atomico/router";

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

function singlePage(slug: string, elementName: string, fileName: string) {
  return [
    {
      path: `/${slug}.html`,
      component: elementName,
      action: async () => {
        await import(`./pages/${fileName}.tsx`);
      },
    },
    {
      path: `/${slug}`,
      children: [
        {
          path: "/",
          component: elementName,
          action: async () => {
            await import(`./pages/${fileName}.tsx`);
          },
        },
        {
          path: "/index.html",
          component: elementName,
          action: async () => {
            await import(`./pages/${fileName}.tsx`);
          },
        },
      ],
    },
  ];
}

// router.setRoutes([
//   ...singlePage("about", "kepler-about", "About"),
//   ...singlePage("blog", "kepler-blog-index", "BlogIndex"),
//   ...singlePage("blog/:slug", "kepler-blog-post", "BlogPost"),
//   ...singlePage("portfolio", "kepler-portfolio-index", "PortfolioIndex"),
//   ...singlePage("portfolio/:slug", "kepler-portfolio-piece", "PortfolioPiece"),
//   {
//     path: "(.*)",
//     action: async () => {
//       await import("./pages/404");
//     },
//     component: "kepler-page-not-found",
//   },
// ]);
