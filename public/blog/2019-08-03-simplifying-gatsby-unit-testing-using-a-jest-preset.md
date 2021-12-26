---
title: Simplifying Gatsby Unit Testing using a Jest Preset
date: 2019-08-03T20:25:20.524Z
description: >-
  Introducing jest-preset-gatsby, a preset for Jest to simplify unit testing
  Gatsby codebases.
featured_image: ../assets/SimplifyGatsbyTestingWithJestPreset-01.png
---

Recently I have been expanding [the codebase for this website and blog](https://github.com/keplersj/website) in order to have a more robust web presence. Part of this of course includes unit testing the source code using Jest. This code base's test suite is primarilly composed of [Jest Snapshot Tests](https://jestjs.io/docs/en/snapshot-testing) to ensure components and the pages they build are behaving and rendering as expected. Like any codebase, creating robust unit tests like this has many advantages; the primary ones for this code base being automated dependency updates using [Dependabot](https://dependabot.com) and mutation testing (to ensure tests are working effectively) using [Stryker](https://stryker-mutator.io).

I've used Jest for many projects before, and have built a few Jest plugins to improve the experience. I've built Jest runners to run linters alongside unit tests ([`jest-runner-prettier`](/portfolio/jest-runner-prettier), [`jest-runner-stylelint`](/portfolio/jest-runner-stylelint), and [`jest-runner-tslint`](/portfolio/jest-runner-tslint)) and I've built a transformer module to make working with `webpack` projects easier [`jest-raw-loader`](/portfolio/jest-raw-loader). So when I saw room for improvement in testing my Gatsby codebase I knew exactly what to do.

# Using Jest's Preset Functionality to Reduce Configuration Boilerplate

The [Gatsby documentation on unit testing](https://www.gatsbyjs.org/docs/unit-testing/) is fantastic and incredibly helpful (like the rest of the Gatsby documentation.) It runs you through the ropes of unit testing your site's code and gets you up and running quickly with little friction. However, it has one flaw: the config it requires you create inadvertantly creates a lot of boilerplate. Thankfully, Jest has functionality built in to [abstract away boilerplate behind a preset](https://jestjs.io/docs/en/configuration#preset-string).

Jest presets are found throughout the Jest documentation as a reccomended method to make testing easier in known environments. They're used to [test React Native](https://jestjs.io/docs/en/tutorial-react-native) projects, [run tests with Puppeteer](https://jestjs.io/docs/en/puppeteer), and make testing [MongoDB](https://jestjs.io/docs/en/mongodb) and [DynamoDB](https://jestjs.io/docs/en/dynamodb) easier. Given this, let's abstract away the boilerplate needed to configure Jest to run Gatsby code and make life just a bit easier for us.

I've created [a module](/portfolio/jest-preset-gatsby) which exports [the default Jest config from the Gatsby documentation](https://www.gatsbyjs.org/docs/unit-testing/#2-creating-a-configuration-file-for-jest) as a Jest preset. By using it our Jest config goes from this:

```js
module.exports = {
  transform: {
    "^.+\\.jsx?$": "<rootDir>/.jest/gatsby-preprocess.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-raw-loader",
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: { __PATH_PREFIX__: "" },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/.jest/loadershim.js"],
};
```

To this:

```js
module.exports = { preset: "jest-preset-gatsby" };
```

## TypeScript, too!

Abstracting this boiler plate has the added benefit of making life easier for us TypeScript users too. Configuring Jest to run in your Gatsby+TypeScript project becomes as easy as setting the following in your Jest config:

```js
module.exports = { preset: "jest-preset-gatsby/typescript" };
```

# Installation From Scratch

Interested in testing your Gatsby project, and haven't configured it yet? Now's a great time to start!

## JavaScript Projects

Install `jest`, `react-test-renderer`, and `jest-preset-gatsby` using npm:

```shell
npm install --save-dev jest react-test-renderer jest-preset-gatsby
```

or Yarn:

```shell
yarn add --dev jest react-test-renderer jest-preset-gatsby
```

And configure Jest to use the preset in your `package.json`:

```json
{
  "jest": {
    "preset": "jest-preset-gatsby"
  }
}
```

Or `jest.config.js`:

```js
module.exports = { preset: "jest-preset-gatsby" };
```

And just like that you're ready to write your tests! Please see [the Gatsby documentation on writing your first test](https://www.gatsbyjs.org/docs/unit-testing/#writing-tests).

## TypeScript Projects

Install `jest`, `react-test-renderer`, `jest-preset-gatsby`, and the relevant type definitions using npm:

```shell
npm install --save-dev jest react-test-renderer jest-preset-gatsby @types/jest @types/react-test-renderer
```

or Yarn:

```shell
yarn add --dev jest react-test-renderer jest-preset-gatsby @types/jest @types/react-test-renderer
```

And configure Jest to use the preset in your `package.json`:

```json
{
  "jest": {
    "preset": "jest-preset-gatsby/typescript"
  }
}
```

Or `jest.config.js`:

```js
module.exports = { preset: "jest-preset-gatsby/typescript" };
```

And just like that you're ready to write your tests! Please see [the Gatsby documentation on writing your first test](https://www.gatsbyjs.org/docs/unit-testing/#writing-tests).

# Caveats

While this does make _configuring_ Jest for Gatsby easier, it does come with one caveat. This project does not provide mocks for the `gatsby` module. Please see [the Gatsby documentation on mocking `gatsby`](https://www.gatsbyjs.org/docs/unit-testing/#3-useful-mocks-to-complete-your-testing-environment) in order to effectively test your code.
