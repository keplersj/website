/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://keplersj.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === "production";
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    title: "Kepler Sticka-Jones",
    description:
      "Kepler Sticka-Jones is a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development.",
    siteUrl,
    twitterUsername: "realKeplerSJ",
    instagramUsername: "keplersj_",
    linkedinUsername: "keplersj",
    githubUsername: "keplersj"
  },
  plugins: [
    "gatsby-plugin-catch-links",
    "gatsby-plugin-extract-schema",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          query SiteMetadataForRSS {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              })),
            query: `
              query BlogPostsForRSS {
                allMarkdownRemark(
                  filter: {fields: {collection: {eq: "blog"}}},
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*", allow: ["/"], disallow: ["/admin"] }]
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.join(__dirname, "content", "blog"),
        name: "blog"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: path.join(__dirname, "content", "projects"),
        name: "projects"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "content", "images")
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
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
        ]
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
