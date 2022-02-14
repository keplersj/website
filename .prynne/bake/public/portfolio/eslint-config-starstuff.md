---
title: eslint-config-starstuff
description: Opinionated, yet simple ESLint config
npm_package_name: eslint-config-starstuff
github_repo: keplersj/eslint-config-starstuff
status:
  - active
role:
  - creator
  - maintainer
---

I created this ESLint config as a base style config for all of my JavaScript & TypeScript projects in 2019.

## Philosophy

This config is built with the assumption that you're going to be using [Prettier](https://prettier.io/) across your project, and want ESLint to provide advice and respect Prettier's formatting. This config aims to share this in a simple, shareable config.

## Installation

```shell
npm install --save-dev eslint eslint-config-starstuff
```

## Usage

In your `package.json`:

```json
{
  "eslintConfig": {
    "extends": ["starstuff"]
  }
}
```

### With TypeScript

This config includes a special config for TypeScript, to use it set the following in your `package.json`:

```json
{
  "eslintConfig": {
    "extends": ["starstuff/typescript"]
  }
}
```

### With React

This config includes a special config for React projects, to use it set the following after configuring ESLint for your base language in your `package.json`:

```json
{
  "eslintConfig": {
    "extends": [
      // "starstuff", or "starstuff/typescript",
      "starstuff/react"
    ]
  }
}
```

## License

Copyright 2019 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC
