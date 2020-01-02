---
title: gatsby-plugin-verify-bing
description: Gatsby plugin for Bing Website Verification
npm_package_name: gatsby-plugin-verify-bing
github_repo: keplersj/gatsby-plugin-verify-bing
status:
  - active
role:
  - creator
  - maintainer
---

Gatsby plugin for Bing Website Verification. No need to include an XML file in your `static` directory, let us take care of that! This plugin will create help verify you own your website for Bing, see [the Bing Webmasters documentation on Verifying Ownership for more details](https://www.bing.com/webmaster/help/how-to-verify-ownership-of-your-site-afcfefc6).

## Instalation

```shell
npm install gatsby-plugin-verify-bing
```

## Usage

In your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-verify-bing",
      options: {
        userIds: ["E5D802A305BE2DD99ESampleAuthCode"],
        xmlFileName: "BingSiteAuth.xml" // optional
      }
    }
  ]
};
```

## License

Copyright 2019 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC
