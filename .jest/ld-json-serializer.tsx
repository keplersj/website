import * as React from "react";

export function print(val, serialize) {
  const { innerHTML, ...tag } = val.props;
  return serialize(
    <script {...tag}>{serialize(JSON.parse(innerHTML))}</script>
  );
}

export function test(val) {
  return (
    val &&
    val.$$typeof === Symbol.for("react.element") &&
    val.type === "script" &&
    val.props.innerHTML &&
    val.props.type &&
    val.props.type === "application/ld+json"
  );
}
