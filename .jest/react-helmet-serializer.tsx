import * as React from "react";
import { Helmet } from "react-helmet";

const cache = new WeakSet();

interface HelmetPeekData {
  baseTag: object[];
  bodyAttributes: object;
  defer: boolean;
  encode: true;
  htmlAttributes: {
    lang: string;
  };
  linkTags: object[];
  metaTags: { content: string; name: string }[];
  noscriptTags: object[];
  onChangeClientState: Function[];
  scriptTags: { innerHTML: string; type: string }[];
  styleTags: object[];
  title: string;
  titleAttributes: object;
}

export function print(val, serialize) {
  // Get head data from Helmet, correct incorrect type
  const helmet: HelmetPeekData = Helmet.peek() as any;

  // Add component and helmet data to cache so we don't serialize it multiple time
  cache.add(val);
  cache.add(helmet);

  const head = serialize(
    <head>
      {/* {serialize(helmet)} */}
      {helmet.baseTag.map((tag, index) => (
        <base key={index} {...tag} />
      ))}
      {helmet.linkTags.map((tag, index) => (
        <link key={index} {...tag} />
      ))}
      {helmet.metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      {helmet.noscriptTags.map((tag, index) => (
        <noscript key={index} {...tag} />
      ))}
      {helmet.scriptTags.map((tag, index) => (
        <script key={index} {...tag} />
      ))}
      {helmet.styleTags.map((tag, index) => (
        <style key={index} {...tag} />
      ))}
      {helmet.title && <title>{helmet.title}</title>}
    </head>
  );

  const body = serialize(val);

  return head + "\n\n" + body;
}

export function test(val) {
  return Boolean(
    val &&
      !cache.has(val) &&
      val.$$typeof === Symbol.for("react.test.json") &&
      Helmet.peek() &&
      !cache.has(Helmet.peek())
  );
}
