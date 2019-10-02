exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({ fromPath: "/contact", toPath: "/about#contact" });
};
