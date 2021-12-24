---
title: stylelint-config-starstuff
description: Opininated, but simple, shareable Stylelint config
npm_package_name: stylelint-config-starstuff
github_repo: stylelint-config-starstuff
status:
  - active
role:
  - creator
  - maintainer
---

Stylelint-config-starstuff is an opininated, but simple, shareable Stylelint config.

## Philosophy

This config is built with the assumption that you're going to be using [Prettier](https://prettier.io/) across your project, and want stylelint to provide style specific advice and respect Prettier's formatting. This config aims to share this in a simple, shareable config.

## Installation

```shell
npm install --save-dev stylelint stylelint-config-starstuff
```

## Usage

In your `package.json`

```json
{
  "stylelint": {
    "extends": ["stylelint-config-starstuff"]
  }
}
```

### CSS-in-JS (emotion, styled-components, etc.) varient

This config exports a varient specialized for projects using a CSS-in-JS library. To use it, set the following in your `package.json`:

```json
{
  "stylelint": {
    "extends": ["stylelint-config-starstuff/css-in-js"]
  }
}
```

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.
