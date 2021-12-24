---
title: jest-serializer-react-helmet
description: Serializer to display React Helmet data in Jest Snapshots
npm_package_name: jest-serializer-react-helmet
github_repo: keplersj/jest-serializer-react-helmet
status:
  - active
role:
  - creator
  - maintainer
---

Jest-serializer-react-helmet is a Jest Serializer to display React Helmet data in Jest Snapshots

## Installation

Install preset using npm:

```shell
npm install --save-dev jest-serializer-react-helmet
```

or yarn:

```shell
yarn add --dev jest-serializer-react-helmet
```

## Usage

Configure Jest to use the serializer in `jest.config.js`:

```js
module.exports = {
  snapshotSerializers: ["jest-serializer-react-helmet"]
};
```

or `package.json`:

```json
{
  "jest": {
    "snapshotSerializers": ["jest-serializer-react-helmet"]
  }
}
```

## Related Packages

- [`jest-runner-prettier`](https://github.com/keplersj/jest-runner-prettier) - Use Jest to check your codebase against `prettier`
- [`jest-preset-gatsby`](https://github.com/keplersj/jest-preset-gatsby) - Jest preset to ease unit testing a Gatsby project
- [`jest-serializer-json-ld-script`](https://github.com/keplersj/jest-serializer-json-ld-script) - Jest snapshot serializer to better visualize React `<script>` elements containing LD+JSON data
- [`jest-raw-loader`](https://github.com/keplersj/jest-raw-loader) - Load the raw content of files in Jest, replicating the behavior of `webpack`'s `raw-loader`

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.
