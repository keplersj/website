---
title: jest-serializer-xml
description: Serializer for Jest to better visualize XML Documents in Snapshots
npm_package_name: jest-serializer-xml
github_repo: keplersj/jest-serializer-xml
status:
  - active
role:
  - creator
  - maintainer
---

Jest-serializer-xml is a serializer for Jest to better visualize XML Documents in Snapshots.

## Installation

```shell
npm install --save-dev jest-serializer-xml
```

## Usage

Configure Jest to use the serializer in `jest.config.js`:

```js
module.exports = {
  snapshotSerializers: ["jest-serializer-xml"]
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

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed MIT.
