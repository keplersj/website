---
title: jest-serializer-react-helmet-async
description: Serializer to display react-helmet-async data in Jest Snapshots
npm_package_name: jest-serializer-react-helmet-async
github_repo: keplersj/jest-serializer-react-helmet-async
status:
  - active
role:
  - creator
  - maintainer
---

Jest Snapshot serializer to visualize react-helmet-async data alongside component snapshots.

## Installation

Install preset using npm:

```shell
npm install --save-dev jest-serializer-react-helmet-async
```

or yarn:

```shell
yarn add --dev jest-serializer-react-helmet-async
```

## Usage

Configure Jest to use the serializer in `jest.config.js`:

```js
module.exports = {
  snapshotSerializers: ["jest-serializer-react-helmet-async"],
};
```

or `package.json`:

```json
{
  "jest": {
    "snapshotSerializers": ["jest-serializer-react-helmet-async"]
  }
}
```

### In your tests

Unlike [`jest-serializer-react-helmet`](https://github.com/keplersj/jest-serializer-react-helmet), this serializer does not automatically prepend the serialized data to the snapshots of your React components. You must add an assert for `react-helmet-async` to be serialized.

Your test should like similar to the following:

```js
import * as React from "react";
import renderer from "react-test-renderer";
import { HelmetProvider } from "react-helmet-async";

describe("App", () => {
  it("renders as expected", () => {
    const context = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <App />
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});
```

## Related Packages

- [`jest-runner-prettier`](https://github.com/keplersj/jest-runner-prettier) - Use Jest to check your codebase against `prettier`
- [`jest-preset-gatsby`](https://github.com/keplersj/jest-preset-gatsby) - Jest preset to ease unit testing a Gatsby project
- [`jest-serializer-json-ld-script`](https://github.com/keplersj/jest-serializer-json-ld-script) - Jest snapshot serializer to better visualize React `<script>` elements containing LD+JSON data
- [`jest-raw-loader`](https://github.com/keplersj/jest-raw-loader) - Load the raw content of files in Jest, replicating the behavior of `webpack`'s `raw-loader`

## License

Copyright 2019 Kepler Sticka-Jones. Licensed ISC
