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
  {
    path: "/blog/:slug",
    action: async () => {
      await import("./pages/BlogPost");
    },
    component: "kepler-blog-post",
  },
  {
    path: "/blog/:slug.html",
    action: async () => {
      await import("./pages/BlogPost");
    },
    component: "kepler-blog-post",
  },
  {
    path: "/blog/:slug/index.html",
    action: async () => {
      await import("./pages/BlogPost");
    },
    component: "kepler-blog-post",
  },
  ...singlePage("portfolio", "kepler-portfolio-index", "PortfolioIndex"),
  {
    path: "/portfolio/:slug",
    action: async () => {
      await import("./pages/PortfolioPiece");
    },
    component: "kepler-portfolio-piece",
  },
  {
    path: "/portfolio/:slug.html",
    action: async () => {
      await import("./pages/PortfolioPiece");
    },
    component: "kepler-portfolio-piece",
  },
  {
    path: "/portfolio/:slug/index.html",
    action: async () => {
      await import("./pages/PortfolioPiece");
    },
    component: "kepler-portfolio-piece",
  },
  {
    path: "(.*)",
    action: async () => {
      await import("./pages/404");
    },
    component: "kepler-page-not-found",
  },
]);
