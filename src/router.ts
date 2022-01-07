import { Route, Router } from "@vaadin/router";

// This is so hacky, and I hate this so much.
// But if the router won't hydrate, we'll just have to work around it.
document.body.innerHTML = "";

const outlet = document.body;
const router = new Router(outlet);

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

router.setRoutes([
  {
    path: "/",
    action: async () => {
      await import("./pages/Home");
    },
    component: "kepler-home",
  },
  {
    path: "/index.html",
    action: async () => {
      await import("./pages/Home");
    },
    component: "kepler-home",
  },
  ...singlePage("about", "kepler-about", "About"),
  ...singlePage("blog", "kepler-blog-index", "BlogIndex"),
  ...singlePage("blog/:slug", "kepler-blog-post", "BlogPost"),
  ...singlePage("portfolio", "kepler-portfolio-index", "PortfolioIndex"),
  ...singlePage("portfolio/:slug", "kepler-portfolio-piece", "PortfolioPiece"),
  {
    path: "(.*)",
    action: async () => {
      await import("./pages/404");
    },
    component: "kepler-page-not-found",
  },
]);
