import { Route, Router } from "@vaadin/router";
import posts from "@kepler/blog";
import pieces from "@kepler/portfolio";

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
  ...posts.map(
    (post): Route => ({
      path: `/blog/${post.slug}`,
      action: async (context, commands) => {
        await import("./pages/BlogPost");
        const stubElement = commands.component("kepler-blog-post");
        stubElement.src = post.markdownUrl;
        return stubElement;
      },
    })
  ),
  ...posts.map(
    (post): Route => ({
      path: `/blog/${post.slug}.html`,
      action: async (context, commands) => {
        await import("./pages/BlogPost");
        const stubElement = commands.component("kepler-blog-post");
        stubElement.src = post.markdownUrl;
        return stubElement;
      },
    })
  ),
  ...posts.map(
    (post): Route => ({
      path: `/blog/${post.slug}/index.html`,
      action: async (context, commands) => {
        await import("./pages/BlogPost");
        const stubElement = commands.component("kepler-blog-post");
        stubElement.src = post.markdownUrl;
        return stubElement;
      },
    })
  ),
  ...singlePage("portfolio", "kepler-portfolio-index", "PortfolioIndex"),
  ...pieces.map(
    (piece): Route => ({
      path: `/portfolio/${piece.slug}`,
      action: async (context, commands) => {
        await import("./pages/PortfolioPiece");
        const stubElement = commands.component("kepler-portfolio-piece");
        stubElement.src = piece.markdownUrl;
        return stubElement;
      },
    })
  ),
  ...pieces.map(
    (piece): Route => ({
      path: `/portfolio/${piece.slug}.html`,
      action: async (context, commands) => {
        await import("./pages/PortfolioPiece");
        const stubElement = commands.component("kepler-portfolio-piece");
        stubElement.src = piece.markdownUrl;
        return stubElement;
      },
    })
  ),
  ...pieces.map(
    (piece): Route => ({
      path: `/portfolio/${piece.slug}/index.html`,
      action: async (context, commands) => {
        await import("./pages/PortfolioPiece");
        const stubElement = commands.component("kepler-portfolio-piece");
        stubElement.src = piece.markdownUrl;
        return stubElement;
      },
    })
  ),
]);
