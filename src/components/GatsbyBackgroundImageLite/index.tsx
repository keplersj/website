/** @jsx jsx */
import {
  PropsWithChildren,
  FunctionComponent,
  useState,
  useEffect
} from "react";
import { FixedObject, FluidObject } from "gatsby-image";
import { css, jsx } from "@emotion/core";
import { backgroundImages } from "polished";
import { useInView } from "react-intersection-observer";
import webPCheck from "supports-webp";

function createBackgrounds(
  img: FixedObject | FluidObject | FixedObject[] | FluidObject[],
  supportsWebP: boolean = false
) {
  if (Array.isArray(img)) {
    const backgroundsWithoutQuery = (img as Array<FixedObject | FluidObject>)
      .filter(asset => !Boolean(asset.media))
      .map(asset =>
        asset.srcWebp && supportsWebP
          ? `url("${asset.srcWebp}")`
          : `url("${asset.src}")`
      );

    const backgroundsWithQuery = (img as Array<FixedObject | FluidObject>)
      .filter(asset => Boolean(asset.media))
      .map(
        asset => css`
          @media screen and (${asset.media}) {
            background-image: ${asset.srcWebp && supportsWebP
              ? asset.srcWebp
              : asset.src};
          }
        `
      );

    return css`
      ${backgroundsWithQuery}
      ${backgroundImages(...backgroundsWithoutQuery)}
    `;
  } else {
    return `
      background-image: url("${
        img.srcWebp && supportsWebP ? img.srcWebp : img.src
      }");
    `;
  }
}

function createBackupBackground(img: FixedObject | FluidObject) {
  if (img.media) {
    return css`
      @media screen and (${img.media}) {
        background-image: url("${img.base64}");
      }
    `;
  } else {
    return css`
      background-image: url("${img.base64}");
    `;
  }
}

function createBackupBackgrounds(
  img: FixedObject | FluidObject | FixedObject[] | FluidObject[]
) {
  if (Array.isArray(img)) {
    return (img as Array<FixedObject | FluidObject>).map(
      createBackupBackground
    );
  } else {
    return createBackupBackground(img);
  }
}

interface Props {
  fixed?: FixedObject | FixedObject[];
  fluid?: FluidObject | FluidObject[];
  tag: keyof JSX.IntrinsicElements;
}

export const BackgroundImage: FunctionComponent<PropsWithChildren<
  Props
>> = props => {
  // Let's pretend whatever element this is supponsed to be is a div, so the TypeScript stops freaking out about complexity.
  const ContainerElement = props.tag as "div";
  const [ref, inView] = useInView({
    triggerOnce: true
  });
  const [{ webP: supportsWebP }, setWebPSupport] = useState({ webP: false });

  useEffect(() => {
    const checkForSupport = async () => {
      const browserSupportsWebP = await webPCheck;

      setWebPSupport({ webP: browserSupportsWebP });
    };

    checkForSupport();
  }, []);

  return (
    <ContainerElement
      ref={ref}
      css={css`
        position: relative;
        opacity: 0.99;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        ::before,
        ::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transition: opacity 0.5s ease 0.25s;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        ::before {
          z-index: -100;
          opacity: ${inView ? 1 : 0};
          ${props.fixed && createBackgrounds(props.fixed, supportsWebP)}
          ${props.fluid && createBackgrounds(props.fluid, supportsWebP)}
        }

        ::after {
          z-index: -101;
          opacity: ${inView ? 0 : 1};
          ${props.fixed && createBackupBackgrounds(props.fixed)}
          ${props.fluid && createBackupBackgrounds(props.fluid)}
        }
      `}
    >
      <noscript
        css={css`
          opacity: 1;
          ${props.fixed && createBackgrounds(props.fixed)}
          ${props.fluid && createBackgrounds(props.fluid)}
        `}
      />
      {props.children}
    </ContainerElement>
  );
};

BackgroundImage.defaultProps = {
  tag: "div"
};
