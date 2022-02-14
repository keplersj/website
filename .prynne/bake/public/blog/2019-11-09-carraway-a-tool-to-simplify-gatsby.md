---
title: "Carraway: A Tool to Simplify Gatsby"
date: 2019-11-09T06:00:00Z
featured_image: ../assets/images/CarrawayLovesGatsby.jpg
---

Gatsby is an incredible tool. It allows web developers to build fast, modular, and powerful websites with minimal effort. However, like all great software, there is room for improvement. This is why I've created Carraway.

# Gatsby is Great, Why do I Need Carraway?

Let's take a step back here. Gatsby is a JavaScript framework named after the titular character of F. Scott Fitzgerald's _The Great Gatsby_. This American classic follows narrator Nick Carraway as he recounts his experiences of the summer he lived next to the great Jay Gatsby. Throughout the book, Gatsby demonstrates his great generosity and power in the New York of the 1920s, however, to achieve his ultimate goal he needs the help of his neighbor Nick.

Nick Carraway simplifies Jay Gatsby's lifelong pursuit. Carraway helps Gatsby.

This relationship is what inspires my new tool, Carraway. While building a series of websites built in Gatsby ([my personal website](https://github.com/keplersj/website), [the vanity website for my surname](https://github.com/keplersj/surname-site), [the AtomBuild website](https://github.com/AtomBuild/atombuild.github.io), and [the AtomLinter website](https://github.com/AtomLinter/atomlinter.github.io)) I became very interested in using [Gatsby's Theme functionality](https://www.gatsbyjs.org/docs/themes/) to abstract away the code portions of my websites and making the repositories for my sites only responsible for the site's content and configuration. The result of doing this using only Gatsby is a repo that contains no source code files aside from the `gatsby-config.js` required by Gatsby. This is where Carraway comes in.

Carraway allows us to configure Gatsby using a JSON object in either `gatsby.config.json` or `package.json` (under the `"gatsby"` key.) This allows us to create Gatsby sites with no source files, letting us focus on the content of our sites.

# How Do I Use Carraway?

Much like the character, it's named after, Carraway is rather simple. Using Carraway in your Gatsby project is a simple three-step process: installing the package, moving your configuration, and using Carraway to run Gatsby.

## Installation

[Carraway is available on NPM](https://www.npmjs.com/package/carraway). To install it run the following in your site directory:

```bash
npm install carraway
```

Or, if you are using [Yarn](https://yarnpkg.com/):

```bash
yarn add carraway
```

## Configuration

Next, you'll need to move your site's [Gatsby config](https://www.gatsbyjs.org/docs/gatsby-config/) to either `gatsby.config.json` or `package.json` (under the `"gatsby"` key) as a JSON object. You should have either a `gatsby.config.json` with the following structure:

```json
{
  "siteMetadata": {},
  "plugins": []
}
```

Or the following structure in your `package.json`:

```json
{
  "gatsby": {
    "siteMetadata": {},
    "plugins": []
  }
}
```

## Usage

After installation and configuration, you're ready to use Carraway! Carraway will now handle your Gatsby configuration and will invoke Gatsby for you. If you were using NPM scripts to run Gatsby in your project, update your scripts to match this. You should go from a scripts section like the following:

```json
{
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop"
  }
}
```

To the following:

```json
{
  "scripts": {
    "build": "carraway build",
    "develop": "carraway develop"
  }
}
```

# Conclusion

Carraway is a simple tool in both idea and implementation. But using it will have some profound effects. It encourages the development of open software when building websites, and good organization of the content that makes your website. Hosting the code that powers your website in NPM packages will allow you to build your site like the software it is, while isolating your site-specific content and configuration.

The source code for Carraway can be found [on Github](https://github.com/keplersj/carraway). If you have any ideas for improvement, please contribute! Let's make powerful website creation simple and powerful.
