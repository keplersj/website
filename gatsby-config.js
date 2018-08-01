module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-123145115-1",
        anonymize: true,
        respectDNT: true
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Kepler Sticka-Jones",
        short_name: "Kepler S-J",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#409040",
        display: "minimal-ui",
        icon: "src/images/avatar.jpeg"
      }
    },
    "gatsby-plugin-offline"
  ]
};
