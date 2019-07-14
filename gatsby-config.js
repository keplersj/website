const path = require("path");

module.exports = {
  plugins: [
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
        name: "images",
        path: path.join(__dirname, "content", "images")
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-emotion",
    "gatsby-transformer-remark",
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
