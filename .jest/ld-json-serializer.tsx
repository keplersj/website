import * as React from "react";

export function print(val, serialize) {
  const { dangerouslySetInnerHTML, ...tag } = val.props;
  return serialize(
    <script {...tag}>
      {serialize(JSON.parse(dangerouslySetInnerHTML.__html))}
    </script>
  );
}

export function test(val) {
  return (
    val &&
    val.$$typeof === Symbol.for("react.element") &&
    val.type === "script" &&
    val.props.dangerouslySetInnerHTML &&
    val.props.type &&
    val.props.type === "application/ld+json"
  );
}
