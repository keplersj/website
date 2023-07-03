---
title: "Animating Still Images"
date: 2022-08-19T06:00:00Z
featured_image: /assets/images/FNoIUHRUYAU537U.jpg
---

The following is an in-depth recounting of the process required to animate a still image using vector redrawing techniques. In brief, one can "animate" a still image using tools that reproduce the image using vector primitives and chaining various frames from that process together to create an animation. This works because the process of vector reproduction has a degree of randomness, ensuring that no reproduction is the same as the last. One can manipulate the variables of the vector reproduction process to get different effects for the frame generated, and the frame-based approach allows for a degree of flexibility and room for creativity.

Below is a direct copy of [the Twitter thread from March recounting this process](https://twitter.com/realKeplerSJ/status/1502520443323891713):

So the animation begins its life as an image I took at Silver Lake in November last year:

![Silver Lake, November 2021](/assets/images/FNoHEv2VcAgXsyR.jpg)

From there we process the image using a library named SQIP which I've used on websites for years now to create lightweight vector versions of the image: https://github.com/axe312ger/sqip

The trick here is how many vector primitives you want the library to use to recreate the input image. The more primitives you use, the closer the vector image looks to the original image.

Below, are examples of the base image with 10, 100, 1,000, and 10,000 primitives:

![Base Image with 10 Primitives](/assets/images/FNoIRyFVIAEW8Aq.jpg)

![Base Image with 100 Primitives](/assets/images/FNoIUHRUYAU537U.jpg)

![Base Image with 1,000 Primitives](/assets/images/FNoIU7LVgAM6mYM.jpg)

![Base Image with 10,000 Primitives](/assets/images/FNoIZUBVQAUuSPQ.jpg)

So we can write a script that generates images with various primitive counts, but now we need to render our vector images for animation. Here we use a library to create a web standard Canvas instance (https://github.com/Automattic/node-canvas) and a library to render SVG (https://github.com/canvg/canvg)

Using these we render out each "frame" to create a GIF using GIFEncoder (https://npmjs.com/package/gifencoder) and use node-canvas to render each "frame" to a PNG for further composition using FFMPEG.
