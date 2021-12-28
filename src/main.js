import "./main.css";

import { sheet } from "@emotion/css";
import { options } from "atomico";

// Check if the root node has any children to detect if the app has been preprendered
// speedy is disabled when the app is being prerendered so that styles render into the DOM
// speedy is significantly faster though so it should only be disabled during prerendering
if (document.querySelector("html[data-prerender]")) {
  sheet.speedy(false);
  options.sheet = false;
  options.ssr = true;
}

import { Router } from "@vaadin/router";
import posts from "@kepler/blog";
import pieces from "@kepler/portfolio";

const outlet = document.querySelector("[data-outlet]");
const router = new Router(outlet);
router.setRoutes([
  {
    path: "/",
    action: async () => {
      await import("./pages/Home.tsx");
    },
    component: "kepler-home",
  },
  {
    path: "/index.html",
    action: async () => {
      await import("./pages/Home.tsx");
    },
    component: "kepler-home",
  },
  {
    path: "/about",
    children: [
      {
        path: "/",
        component: "kepler-about",
        action: async () => {
          await import("./pages/About.tsx");
        },
      },
      {
        path: "/index.html",
        component: "kepler-about",
        action: async () => {
          await import("./pages/About.tsx");
        },
      },
    ],
  },
  {
    path: "/blog",
    children: [
      {
        path: "/",
        component: "kepler-blog-index",
        action: async () => {
          await import("./pages/BlogIndex.tsx");
        },
      },
      {
        path: "/index.html",
        component: "kepler-blog-index",
        action: async () => {
          await import("./pages/BlogIndex.tsx");
        },
      },
      ...posts.map((post) => ({
        path: `/${post.slug}`,
        action: async (context, commands) => {
          await import("./pages/BlogPost.tsx");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
      ...posts.map((post) => ({
        path: `/${post.slug}.html`,
        action: async (context, commands) => {
          await import("./pages/BlogPost.tsx");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
      ...posts.map((post) => ({
        path: `/${post.slug}/index.html`,
        action: async (context, commands) => {
          await import("./pages/BlogPost.tsx");
          const stubElement = commands.component("kepler-blog-post");
          stubElement.src = post.markdownUrl;
          return stubElement;
        },
      })),
    ],
  },
  {
    path: "/portfolio",
    children: [
      {
        path: "/",
        component: "kepler-portfolio-index",
        action: async () => {
          await import("./pages/PortfolioIndex.tsx");
        },
      },
      {
        path: "/index.html",
        component: "kepler-portfolio-index",
        action: async () => {
          await import("./pages/PortfolioIndex.tsx");
        },
      },
      ...pieces.map((piece) => ({
        path: `/${piece.slug}`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece.tsx");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
      ...pieces.map((piece) => ({
        path: `/${piece.slug}.html`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece.tsx");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
      ...pieces.map((piece) => ({
        path: `/${piece.slug}/index.html`,
        action: async (context, commands) => {
          await import("./pages/PortfolioPiece.tsx");
          const stubElement = commands.component("kepler-portfolio-piece");
          stubElement.src = piece.markdownUrl;
          return stubElement;
        },
      })),
    ],
  },
]);
