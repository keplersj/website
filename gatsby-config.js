/* eslint-disable @typescript-eslint/camelcase */

const gatsbyRemarkPlugins = [
  "gatsby-remark-smartypants",
  {
    resolve: "gatsby-remark-vscode",
    options: {
      languageAliases: {
        shell: "bash"
      },
      colorTheme: {
        defaultTheme: "Atom One Light",
        prefersDarkTheme: "Atom One Dark"
      },
      extensions: [
        {
          identifier: "akamud.vscode-theme-onedark",
          version: "2.1.0"
        },
        {
          identifier: "akamud.vscode-theme-onelight",
          version: "2.1.0"
        }
      ]
    }
  },
  "gatsby-remark-autolink-headers",
  // gatsby-remark-relative-images must
  // go before gatsby-remark-images
  "gatsby-remark-relative-images",
  {
    resolve: "gatsby-remark-images",
    options: {
      // It's important to specify the maxWidth (in pixels) of
      // the content container as this plugin uses this as the
      // base for generating different widths of each image.
      maxWidth: 590
    }
  }
];

module.exports = {
  siteMetadata: {
    title: "Kepler Sticka-Jones",
    description:
      "Kepler Sticka-Jones is a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development.",
    siteUrl: "https://keplersj.com",
    twitterUsername: "realKeplerSJ",
    instagramUsername: "keplersj_",
    linkedinUsername: "keplersj",
    githubUsername: "keplersj"
  },
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./content/images"
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-theme-early-bird",
      options: {
        basePath: "/blog",
        contentPath: "content/blog",
        assetPath: "content/images"
      }
    },
    {
      resolve: "gatsby-theme-curiousity",
      options: {
        basePath: "/projects",
        contentPath: "content/projects",
        assetPath: "content/images"
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: gatsbyRemarkPlugins
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-123145115-1",
        anonymize: true,
        respectDNT: true
      }
    },
    {
      resolve: "gatsby-plugin-verify-bing",
      options: {
        userIds: ["E5D802A305BE2DD99EB4484A4B1DD90E"]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Kepler Sticka-Jones",
        short_name: "Kepler S-J",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#409040",
        display: "minimal-ui",
        icon: "content/images/avatar.jpg"
      }
    },
    "gatsby-plugin-offline"
  ]
};
