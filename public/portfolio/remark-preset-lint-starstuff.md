---
title: remark-preset-lint-starstuff
description: Opinionated, yet simple config for remark-lint
npm_package_name: remark-preset-lint-starstuff
github_repo: keplersj/remark-preset-lint-starstuff
status:
  - active
role:
  - creator
  - maintainer
---

Remark-preset-lint-starstuff is an opinionated, yet simple config for remark-lint.

## Philosophy

This config is built with the assumption that you're going to be using [Prettier](https://prettier.io/) across your project, and want [remark-lint](https://github.com/remarkjs/remark-lint) to provide advice and respect Prettier's formatting. This config aims to share this in a simple, shareable config.

## Installation

```shell
npm install --save-dev remark-preset-lint-starstuff
```

## Usage

Set the following in your `package.json`:

```json
{
  "remarkConfig": {
    "plugins": ["preset-lint-starstuff"]
  }
}
```

Run remark. Either [`remark-cli`](https://github.com/remarkjs/remark/tree/master/packages/remark-cli) or [`jest-runner-remark`](https://github.com/keplersj/jest-runner-remark) is recommended for this.

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.
