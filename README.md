# [@keplersj/website](https://keplersj.com/)

The repository powering my personal website, <https://keplersj.com>.

## Philosophy

The guiding philosophy of this website is to create a strong, robust, and long-lasting web presence that can adjust to the needs of the time and environment. This is accomplished by separating the content of the site, from the code that builds it.

This [repo](https://github.com/keplersj/website) holds the content and configuration needed to build my website and (using Continuous Integration and Deployment) deploy at scale. All content is held in ubiquitous and easy to understand formats. This is done so that the content of the site can adjust as needs may change.

## Implementation

The website is currently implemented using [Gatsby](https://www.gatsbyjs.org/), and uses [Carraway](https://github.com/keplersj/carraway) to simplify the Gatsby build process.

The following Gatsby plugins are used:

- [`gatsby-theme-kepler`](https://github.com/keplersj/gatsby-theme-kepler)
- [`gatsby-plugin-google-analytics`](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/)
- [`gatsby-plugin-verify-bing`](https://www.gatsbyjs.org/packages/gatsby-plugin-verify-bing/)
- [`gatsby-plugin-verify-brave`](https://www.gatsbyjs.org/packages/gatsby-plugin-verify-brave/)
- [`gatsby-plugin-manifest`](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/)
- [`gatsby-plugin-offline`](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/)

This repository is automatically maintained by a combination of Continuous Integration and Continuous Deployment tools, including:

- [GitHub Actions](https://github.com/features/actions) (for content Quality Assurance)
- [Dependabot](https://dependabot.com/) (for automated dependency maintenance)
- [ZEIT Now](https://zeit.co/home) (for Continuous Deployment)

Quality Assurance is handled using the following tools:

- [Jest](https://jestjs.io/) - the test runner is used to run all quality assurances efficiently, in parallel
- [Prettier](https://prettier.io/), with the aid of [`jest-runner-prettier`](https://github.com/keplersj/jest-runner-prettier) - is used to maintain the formatting of the text files in the repo
- [Remark](https://remark.js.org/), with the aid of [`jest-runner-remark`](https://github.com/keplersj/jest-runner-remark) - is used to maintain the quality of Markdown texts

This website is currently hosted on the following locations:

- <https://keplersj.com> - Powered by [ZEIT Now](https://zeit.co/home)

## Cloning, Building, and Running

Dependencies and site building is handled by [`npm`](https://www.npmjs.com/).

To install this website's dependencies, run the following in a cloned copy of this repo:

```bash
$ npm install
```

To build a production build of the website, run the following in a copy of this repo after installing dependencies:

```bash
$ npm run build
```

After successfully running the build script you will have a static copy of this repo's website in `./public/`. This can be hosted anywhere fine static websites can be hosted.

## License

Copyright [Kepler Sticka-Jones](https://keplersj.com/) 2014-2021. All Rights Reserved.
