const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve("./src/templates/blog-post.tsx");
  const projectPage = path.resolve("./src/templates/project-page.tsx");

  const result = await graphql(
    `
      query AllMarkdownPages {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const allEdges = result.data.allMarkdownRemark.edges;

  const blogEdges = allEdges.filter(
    edge => edge.node.fields.collection === `blog`
  );
  const projectEdges = allEdges.filter(
    edge => edge.node.fields.collection === `projects`
  );

  blogEdges.forEach((post, index) => {
    const previous =
      index === blogEdges.length - 1 ? null : blogEdges[index + 1].node;
    const next = index === 0 ? null : blogEdges[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    });
  });

  projectEdges.forEach((project, index) => {
    const previous =
      index === projectEdges.length - 1 ? null : projectEdges[index + 1].node;
    const next = index === 0 ? null : projectEdges[index - 1].node;

    createPage({
      path: project.node.fields.slug,
      component: projectPage,
      context: {
        slug: project.node.fields.slug,
        previous,
        next
      }
    });
  });

  return null;
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);

    const collection = parent.sourceInstanceName;

    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `content/${collection}`
    });

    createNodeField({
      node,
      name: "collection",
      value: collection
    });

    createNodeField({
      node,
      name: "slug",
      value: `/${collection}${relativeFilePath}`
    });
  }
};
