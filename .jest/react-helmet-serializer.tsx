import * as React from "react";
import { Helmet } from "react-helmet";

Helmet.canUseDOM = false;

const cache = new WeakSet();

export function print(val, serialize) {
  // Get head data from Helmet, correct incorrect type
  const helmet = Helmet.peek();

  // Add component and helmet data to cache so we don't serialize it multiple time
  cache.add(val);
  cache.add(helmet);

  const head = serialize(
    <head>
      {/* {serialize(helmet)} */}
      {helmet.base.toComponent()}
      {helmet.bodyAttributes.toComponent()}
      {helmet.htmlAttributes.toComponent()}
      {helmet.link.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.noscript.toComponent()}
      {helmet.script.toComponent()}
      {helmet.style.toComponent()}
      {helmet.title.toComponent()}
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
