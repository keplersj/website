import React from "react";
import { Link, graphql } from "gatsby";

interface IProps {
    data: any;
}

class BlogPostTemplate extends React.Component<IProps> {
    render() {
        const post = this.props.data.markdownRemark;

        return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
    }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    # site {
    #   siteMetadata {
    #     title
    #     author
    #   }
    # }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

