/* eslint-disable */
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // We only want to operate on `MarkdownRemark` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "MarkdownRemark") {
    const collection = getNode(node.parent).sourceInstanceName;
    const value = createFilePath({ node, getNode });

    // Add sourceInstanceName as a field, so that we can query Markdown from a specific collection
    createNodeField({
      name: "sourceInstanceName",
      node,
      value: collection
    });

    // Add known slug to the node, for building the file path
    createNodeField({
      // Name of the field you are adding
      name: "slug",
      // Individual Markdown node
      node,
      // Generated value based on filepath with collection prefix. We
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      value: `/${collection}${value}`
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  // Create blog post pages.
  const posts = result.data.allMarkdownRemark.edges;
  // We'll call `createPage` for each result
  posts.forEach(({ node }) => {
    createPage({
      // This is the slug we created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: {
        blog: path.resolve("./src/templates/blog-post.tsx"),
        projects: path.resolve("./src/templates/project-page.tsx")
      }[node.parent.sourceInstanceName],
      // We can use the values in this context in
      // our page layout component
      context: { id: node.id }
    });
  });
};
