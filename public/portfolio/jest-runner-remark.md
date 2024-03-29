---
title: jest-runner-remark
description: Jest runner to check markdown files with remark
npm_package_name: jest-runner-remark
github_repo: keplersj/jest-runner-remark
status:
  - active
role:
  - creator
  - maintainer
---

Jest-runner-remark is a Jest runner to check markdown files with remark.

## Usage

### Configure remark-lint

`jest-runner-remark` is best used alongside a `remark-lint` configuration. See the documentation on [configuring `remark-lint`](https://github.com/remarkjs/remark-lint#configuring-remark-lint) before continuing.

### Install jest-runner-remark

Install `jest` and `jest-runner-remark`

```bash
npm install --save-dev jest jest-runner-remark

# or with yarn

yarn add --dev jest jest-runner-remark
```

### Add it to your Jest config

#### Using Built-in Preset

This package includes a [Jest preset](https://jestjs.io/docs/en/configuration#preset-string) which configures Jest to run Remark on all files supported by Remark. To use it set the following in your package.json:

```json
{
  "jest": {
    "preset": "jest-runner-remark"
  }
}
```

or jest.config.js:

```js
module.exports = {
  preset: "jest-runner-remark",
};
```

#### Manually

In your `package.json`

```json
{
  "jest": {
    "runner": "remark",
    "moduleFileExtensions": ["md", "mdx", "markdown", "mkd", "mkdn", "mkdown"],
    "testMatch": [
      "<rootDir>/**/*.md",
      "<rootDir>/**/*.mdx",
      "<rootDir>/**/*.markdown",
      "<rootDir>/**/*.mkd",
      "<rootDir>/**/*.mkdn",
      "<rootDir>/**/*.mkdown"
    ]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: "remark",
  moduleFileExtensions: ["md", "mdx", "markdown", "mkd", "mkdn", "mkdown"],
  testMatch: [
    "<rootDir>/**/*.md",
    "<rootDir>/**/*.mdx",
    "<rootDir>/**/*.markdown",
    "<rootDir>/**/*.mkd",
    "<rootDir>/**/*.mkdn",
    "<rootDir>/**/*.mkdown",
  ],
};
```

### Run Jest

```bash
npx jest

# or with yarn

yarn jest
```

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.
