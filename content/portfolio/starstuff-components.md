---
title: Starstuff Components
description: Minimalistic React Component Library
npm_package_name: starstuff-components
github_repo: keplersj/starstuff-components
status:
  - active
role:
  - creator
  - maintainer
---

Starstuff Components is a Minimalistic React Component Library. It provides a consolidated set of primitive components useful for React sites of every size, regardless of framework.

## Philosophy

This library wants to stay out of your way. It provides some sensible defaults in the form of CSS and that's about it. It doesn't care about how you theme it, and doesn't require any special pipelines. These components are exactly how they appear.

The most notable "theming" feature of these components is their automatic dark mode, triggered by CSS media query.

## Installation

```shell
npm install starstuff-components
```

## Usage

All components can be access via named exports on the `starstuff-components` package. Detailed examples for each component can be seen below.

### Card

```js
import { Card } from "starstuff-components";

const CardExample = () => <Card />;
```

### Hyperbutton

```js
import { Hyperbutton } from "starstuff-components";

const HyperbuttonExample = () => (
  <Hyperbutton href="#">Test Hyperbutton</Hyperbutton>
);
```

### Hyperlink

```js
import { Hyperlink } from "starstuff-components";

const HyperlinkExample = () => <Hyperlink href="#">Test Hyperlink</Hyperlink>;
```

## License

Copyright 2019-2020 [Kepler Sticka-Jones](https://keplersj.com/). Licensed ISC.
