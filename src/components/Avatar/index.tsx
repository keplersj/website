import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import styled from "@emotion/styled";

const RoundedImage = styled(Image)`
  margin-bottom: 10px;
  border-radius: 140px;
`;

export const Avatar = (): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query AvatarComponentQuery {
      image: file(
        relativePath: { eq: "avatar.jpg" }
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 140, height: 140) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return <RoundedImage fixed={data.image.childImageSharp.fixed} />;
};
