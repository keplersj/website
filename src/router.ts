import { Router } from "@vaadin/router";
import posts from "@kepler/blog";
import pieces from "@kepler/portfolio";

// This is so hacky, and I hate this so much.
// But if the router won't hydrate, we'll just have to work around it.
document.body.innerHTML = "";

const outlet = document.body;
const router = new Router(outlet);
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
  {
    path: "/about.html",
    component: "kepler-about",
    action: async () => {
      await import("./pages/About");
    },
  },
  {
    path: "/about",
    children: [
      {
        path: "/",
        component: "kepler-about",
        action: async () => {
          await import("./pages/About");
        },
      },
      {
        path: "/index.html",
        component: "kepler-about",
        action: async () => {
          await import("./pages/About");
        },
      },
    ],
  },
  {
    path: "/blog.html",
    component: "kepler-blog-index",
    action: async () => {
      await import("./pages/BlogIndex");
    },
  },
  {
    path: "/blog",
    children: [
      {
        path: "/",
        component: "kepler-blog-index",
        action: async () => {
          await import("./pages/BlogIndex");
        },
      },
      {
        path: "/index.html",
        component: "kepler-blog-index",
        action: async () => {
          await import("./pages/BlogIndex");
        },
      },
      ...posts.map((post) => ({
        path: `/${post.slug}`,
        action: async (context, commands) => {
          await import("./pages/BlogPost");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
      ...posts.map((post) => ({
        path: `/${post.slug}.html`,
        action: async (context, commands) => {
          await import("./pages/BlogPost");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
      ...posts.map((post) => ({
        path: `/${post.slug}/index.html`,
        action: async (context, commands) => {
          await import("./pages/BlogPost");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
    ],
  },
  {
    path: "/portfolio.html",
    component: "kepler-portfolio-index",
    action: async () => {
      await import("./pages/PortfolioIndex");
    },
  },
  {
    path: "/portfolio",
    children: [
      {
        path: "/",
        component: "kepler-portfolio-index",
        action: async () => {
          await import("./pages/PortfolioIndex");
        },
      },
      {
        path: "/index.html",
        component: "kepler-portfolio-index",
        action: async () => {
          await import("./pages/PortfolioIndex");
        },
      },
      ...pieces.map((piece) => ({
        path: `/${piece.slug}`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
      ...pieces.map((piece) => ({
        path: `/${piece.slug}.html`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
      ...pieces.map((piece) => ({
        path: `/${piece.slug}/index.html`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
    ],
  },
]);
