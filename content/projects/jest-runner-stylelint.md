---
title: jest-runner-stylelint
description: Jest plugin to check all files in a projects against stylelint.
npm_package_name: jest-runner-stylelint
github_repo: keplersj/jest-runner-stylelint
---

[![Build Status](https://travis-ci.org/keplersj/jest-runner-stylelint.svg?branch=master)](https://travis-ci.org/keplersj/jest-runner-stylelint)
[![npm version](https://badge.fury.io/js/jest-runner-stylelint.svg)](https://badge.fury.io/js/jest-runner-stylelint)
[![codecov](https://codecov.io/gh/keplersj/jest-runner-stylelint/branch/master/graph/badge.svg)](https://codecov.io/gh/keplersj/jest-runner-stylelint)

<div align="center">
  <a href="https://stylelint.io/">
    <img width="150" height="150" vspace="" hspace="25" src="https://cdn.worldvectorlogo.com/logos/stylelint.svg"/>
  </a>
  <a href="https://facebook.github.io/jest/">
    <img width="150" height="150" vspace="" hspace="25" src="https://cdn.worldvectorlogo.com/logos/jest.svg"/>
  </a>
  <h1>jest-runner-stylelint</h1>
  <p>Stylelint runner for Jest</p>
</div>

## Usage

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-stylelint`

```bash
yarn add --dev jest jest-runner-stylelint

# or with NPM

npm install --save-dev jest jest-runner-stylelint
```

### Add it to your Jest config

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-stylelint",
    "moduleFileExtensions": ["css"],
    "testMatch": ["**/*.css"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: "jest-runner-stylelint",
  moduleFileExtensions: ["css"],
  testMatch: ["**/*.css"]
};
```

### Run Jest

```bash
yarn jest
```
