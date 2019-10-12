---
title: 'Battling Bit Rot, Link Rot, and Chaos: Hacking an 18 Year Old TiVo Hard Drive'
date: 2019-10-12T06:00:00Z
description: ''

---
This past summer in-between semesters at school I set out to work on a project I've wanted to work on for a while. Some time ago I extracted the hard drive from my childhood TiVo before sending the actual unit off to an e-waste facility during a round of spring cleaning. My thought at the time was that hard drives take up way less space than an aging TiVo unit, and one day I may want to get the data off the drive. So with the free time of a summer break, I set out to work on this project.

However, what I couldn't predict going into this project was the chaos of life that would occur around this project. I set out to work on this project while moving between apartments, Apple recalling my MacBook, and the everyday stressors of a college student going into their fourth year at university.

Although I didn't accomplish my goal of extracting the video streams from the drive, I did experiment with creating a write-up while working on the project. Below, is that writeup:

***

Growing up our family used a [Series One TiVo (Sony SAT T-60)](http://www.tivopedia.com/model-sony-satt60.php) to watch and record TV. We used it for probably ten years before upgrading to a non-TiVo HD DirecTV DVR, and eventually just cutting the cord all together a few years later. A few years after upgrading we decided to throw out the old TiVo box during a round of Spring cleaning.

However, being the data nerd I am at heart I made sure to remove and stash the hard drive from the TiVo before throwing the unit away. At the time I figured a hard drive is a hard drive, and one day I may want to try and retrieve the contents from the drive. Well, that day has come!

Below is a log of my attempt to extract the recordings off of the hard drive of my childhood TiVo:

# Day 0 - June 18, 2019

Before we begin, let’s do some prep work.

## Research

Our SAT T-60 TiVo came with a 40 Gigabyte Maxtor IDE Drive, this is the same hard drive I removed. [TiVopedia](http://www.tivopedia.com/tivo-hard-drives.php) and [Wikipedia](https://en.wikipedia.org/wiki/TiVo_Media_File_System) both have high-level write-ups about TiVo hard drives and the Media File System (MFS) on them.

Luckily for me, the TiVo modification community has existed for a long time and has a lot of open source code still available within it. Most notably, [MFS Tools](https://www.tivocommunity.com/community/index.php?threads/mfs-tools-3-2.529148/) should be helpful for learning how to interact with the file system.

## Cloning the Drive

Before I even start attempting to extract the recordings, I want to create a clone of the drive. It is an 18-year-old mechanical hard drive that has been sitting idle for several years now, and I don’t want to put too much stress on the drive. Interacting with a disc image of the drive will be more convenient and safer.

After booting my MacBook into Manjaro with the drive attached using an IDE-to-USB converter cable we’re good to go. Gnome Disks shows the 40 Gigabyte drive accessible at `/dev/sdd` with no mountable partitions.

Using `dd` to create an image of the drive on a 1 Terabyte External USB Drive:

```shell
sudo dd if=/dev/sdd of=/mnt/External/tivo_hdd.iso status=progress
```

After some time I have a 40 GB disk image and can power off the drive and put it away.

## Trying MFS Tools

Before powering down the drive and putting it away, I tried using a statically linked version of `mfs_tools` available on their [SourceForge Project Page](http://mfstools.sourceforge.net/) but wasn’t able to yield anything immediately helpful. Running `mfs_tools backup` on the drive only yields a 1 GB binary file, and running `mfs_tools backup -a` to capture all streams on the drive fails.

Will try working with the ISO tomorrow.

# Day 1 - June 19, 2019

## Picking Up Rust

Since MFS Tools won’t be able to extract the MPEG streams I want for me, I’ll just have to code some tools myself.

This seems like a good opportunity to learn some [Rust](https://www.rust-lang.org/). Rust seems like a good language to write the tools I’ll need for this in 2019, given it’s a low-level language known for its memory management.

After installing `[rustup](https://www.rust-lang.org/learn/get-started)`, running `rustup update` after installation, and reading some of the preloaded language book using `rustup doc --book` I’m feeling good to start coding with Rust.

# Day 2 - June 20, 2019

## MacBook Recalled

On June 20, 2019 Apple recalled the battery in my MacBook Pro. ([Apple Support Article on the Recall](https://support.apple.com/15-inch-macbook-pro-battery-recall)) Because of this, I’m going to have to spend the day backing up my laptop and getting the data I need off of it and usable on my Surface Go. That includes this project and this write up.

# Day 3 - June 21, 2019

## Moving Data off MacBook

After backing up my MacBook with Time Machine, I committed the Rust codebase I created for this project to a GitHub repo and this write up to a draft document on my website’s CMS. Going to be coding on Windows until I get my laptop back. When it comes to coding, I am more comfortable with the macOS and Linux environments on my MacBook so this might be an added challenge with this project moving forward.

# Day 4 - June 22, 2019

Left my MacBook with Apple after meeting with a Genius Bar Technician today. Hopefully should have my primary computer back in 1-2 weeks with a brand new battery.

# Day 5 - June 23, 2019

Admittedly, not much work on this project is going to get done this weekend. In between my primary machine getting recalled, needing to configure a coding environment on my Surface Go, and moving apartments haven’t had a ton of time to do much on this aside from doing some research in my free time.

## More Research

The last thing I implemented in this project was functionality to byte swap the ISO file I made of the hard drive. While this was a fun and very helpful exercise for getting more comfortable with Rust and the data I’m working with, It’s not very practical for the long term. Going forward I think I’ll just let the `[byteorder](https://crates.io/crates/byteorder)` crate handle the BigEndian-ness of the TiVo’s hard drive data.

Looking through the `mfstools` source code has been very helpful in figuring out how to interact with the TiVo drive data. Using it and a hex viewer I’ve been able to see around the general binary of the ISO file I created. The first helpful thing I’ve found was [using the first byte of the drive to determine if it is a valid TiVo hard drive](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/lib/macpart.c#L193-L208), and if the drive is byte swapped ([Little Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L6) or [Big Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L7).)

The `mfstools` code base helped show that TiVo was using the [Apple Partition Map](https://en.wikipedia.org/wiki/Apple_Partition_Map) for its hard drives. I was confused why the mfstools author kept referring to “Mac partitions” on the TiVo, until I Googled the Hex value in the [`MAC_PARTITION_MAGIC` constant](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L8) and found a [book chapter on the forensic analysis of Macintosh hard drives](http://www.informit.com/articles/article.aspx?p=376123&seqNum=3) explaining that `0x504d` was used as a signature byte on drives using Apple Partition Map.

I speculate that TiVo chose to use the Apple Partition Map on its drives because [they were using PowerPC processors](https://en.wikipedia.org/wiki/TiVo_digital_video_recorders#Series1) and Apple had already created a partition map for their PowerPC machines known to work well with media. Because the Linux kernel (which the TiVo OS was based on) supported Apple partitions, this would mean less work for TiVo and they could spend more time perfecting the experience of the DVR instead of worrying about the low-level technical implementation of it.

# Day 6 - June 25, 2019

## The Search for More Apple Partition Map Prior Art

While looking for anymore information on Apple Partition Map before completely jumping back in I found a [node.js module for loading Apple Partition Maps](https://github.com/jhermsmeier/node-apple-partition-map). I don’t know why the author chose to implement their APM loader in JavaScript, but I absolutely love it. And thankfully they listed some of their references in the README of their module. There is some overlap between our references, but they also had some references to source code to Apple’s IOStorageFamily for macOS. ([IOApplePartitionScheme.h](https://opensource.apple.com/source/IOStorageFamily/IOStorageFamily-116/IOApplePartitionScheme.h.auto.html) and [IOApplePartitionScheme.cpp](https://opensource.apple.com/source/IOStorageFamily/IOStorageFamily-116/IOApplePartitionScheme.cpp.auto.html)) Sadly, since Apple transitioned to using GUID Partition Tables during the Mac-Intel transition and the transition was largely finished by the end of the 2000’s I imagine these files last copyright dated in 2009 are the last APM files to come out of Apple.

## Using Hex Viewer to View Apple Partition Map

Loading up the byte swapped ISO image I created into a Hex Viewer yields the following:

![](/content/images/annotation-2019-06-26-153435.png)

Here we can see `0x1492` in the first two bytes of the image, so we know this should be a valid TiVo disk image. As well, we can see `0x504d` in the 200 & 201st bytes indicating an Apple Partition Map Partition Entry.

Thanks to the Wikipedia entry on APM, we know that the drive is likely divided into logical blocks of 512 bytes. Setting the hex viewer to display bytes in rows of 512 bytes yields the following:

![](/content/images/annotation-2019-06-26-154008.png)

Cool. Now we can more easily see the 13 partition entries on the drive. We can see the partition that contains the partition map we’re currently interacting with. As well, as eight partitions related to the Linux install on the drive. The two `Ext2` partitions on there could be cool to poke around one day. We can see two MFS application partitions, and most importantly two MFS media regions. Awesome. Being able to visualize the disk like this has been incredibly helpful, and being able to reference the [partition map entry layout from Wikipedia](https://en.wikipedia.org/wiki/Apple_Partition_Map#Layout) is going to be very helpful as we charge forward.

# Day 7 - June 26, 2019

Repo Commits:

* [`91c115`](https://github.com/keplersj/ovit/commit/91c11543341ff71740e74de349a62f43b0facaf4)`
* [`666348`](https://github.com/keplersj/ovit/commit/6663489391eca079f42585e4a8f40187d515b44d)`
* [`b39ff5`](https://github.com/keplersj/ovit/commit/b39ff53609c567fcf3230c0e88a2ed830e10f87c)`
* [`fcb493`](https://github.com/keplersj/ovit/commit/fcb49349353650e021d6de155fb0a3c60e3d1d55)`

# Day 8 - June 27, 2019

Repo Commits:

* [`3d934d`](https://github.com/keplersj/ovit/commit/3d934d96e5711876bd7bc77d0ce2f41bc521925f)`

# Day 9 - July 2, 2019

Repo Commits:

* [`983d23`](https://github.com/keplersj/ovit/commit/983d23b395a45d37c6b3bd6e8f1006cee1637079)`

# Day 10 - July 3, 2019

Repo Commits:

* [`e30152`](https://github.com/keplersj/ovit/commit/e301529b78a29531f16be26b9504de8c1691eb4d)`
* [`46a9df`](https://github.com/keplersj/ovit/commit/46a9df2ee5883a2082a977f5af05e08b12255f0c)`
* [`6f1b1e`](https://github.com/keplersj/ovit/commit/6f1b1e37628095ffa7e99920f7fb6b7a8b7846ae)`
* [`5cd36a`](https://github.com/keplersj/ovit/commit/5cd36a79606e2d1069135469ae6d4fbdcc8895a5)`
* [`ebcfe0`](https://github.com/keplersj/ovit/commit/ebcfe05b9e8b2915a6218770db3ce479bb381413)`
* [`4c7d24`](https://github.com/keplersj/ovit/commit/4c7d24917a607665943016a8eb9e2d8cd2feacd8)`
* [`c4109d`](https://github.com/keplersj/ovit/commit/c4109d5e541f3e311adef6a3b67d653ab378a0fc)`

# Day 11 - July 4, 2019

Repo Commits:

* [`95020e`](https://github.com/keplersj/ovit/commit/95020e0375e42fc9849e83ac36a3ca3b71e2c1e6)`
* [`706101`](https://github.com/keplersj/ovit/commit/706101519d5d542419070d796daae38f918eb1de)`
* [`3c9dff`](https://github.com/keplersj/ovit/commit/3c9dff0a5883887a276367232fecb9db33d41211)`

# Day 12 - July 5, 2019

Repo Commits:

* [`a01781`](https://github.com/keplersj/ovit/commit/a01781d6f71a610965c45c3be2793179e2fc27c9)`

# Day 13 - July 6, 2019

Repo Commits:

* [`fdb953`](https://github.com/keplersj/ovit/commit/fdb953930d5cbf8baa06db15e1865be82b9dc853)`

# Day 14 - July 7, 2019

Repo Commits:

* [`9ad2fe`](https://github.com/keplersj/ovit/commit/9ad2fe4f5e0382f05438dc7726624c8dbc1b34ae)`
* [`5f8d46`](https://github.com/keplersj/ovit/commit/5f8d467abeb06e9404cf616bcfefec29eb09cbd6)`
* [`438db1`](https://github.com/keplersj/ovit/commit/438db1b2e47a35b1cdc5be746f369853d6a8d284)`
* [`a614f3`](https://github.com/keplersj/ovit/commit/a614f335eeaae4d731b46942acfbdd7891ce5ea6)`
* [`1686c2`](https://github.com/keplersj/ovit/commit/1686c254c3931e104d13974e4d18c72ac9a9861f)`
* [`2623b9`](https://github.com/keplersj/ovit/commit/2623b919a7f5e5bb80821e7974cb0346593fba16)`
* [`974371`](https://github.com/keplersj/ovit/commit/9743716347fffe5cb179ccfc45d6f6a1aeb301ba)`

# Day 15 - July 9, 2019

Repo Commits:

* [`b22665`](https://github.com/keplersj/ovit/commit/b22665ff2de2f7b06429d4dc73da6b3ab28984ca)`
* [`5549bd`](https://github.com/keplersj/ovit/commit/5549bdd48e38f88d9ee8cc4cc387174cc484b410)`
* [`e41402`](https://github.com/keplersj/ovit/commit/e41402ad820896009d95c9f05ae9ec4bbdba5875)`
* [`7fc888`](https://github.com/keplersj/ovit/commit/7fc88846d97b3e8789cd352ca902eddab1c9dbd3)`
* [`32528c`](https://github.com/keplersj/ovit/commit/32528ca4ea4a841b69aa9b591b05d5d0ca7ac38e)`
* [`500f84`](https://github.com/keplersj/ovit/commit/500f8410ba684c59b46d124becbc50d2b18571de)`
* [`c3aaa3`](https://github.com/keplersj/ovit/commit/c3aaa3f28bde6a58f62e8c549cb6ebd85108fbdf)`

# Day 16 - July 12, 2019

Repo Commits:

* [`d9132b`](https://github.com/keplersj/ovit/commit/d9132b826a85b408433c9072497d2b2c58f4469a)`

# Day 17 - July 13, 2019

Repo Commits:

* [`999e48`](https://github.com/keplersj/ovit/commit/999e4814d021ded893807df9d1cddd755de77898)`

# Day 18 - July 18, 2019

It’s been a bit since I last did anything with this project. I’ve spent some time working on my website and have gotten cognitive distance from what I’m trying to do here. Earlier today I got to watch a really great talk from Carol Nichols called [Rust: A Language for the Next 40 Years](https://www.youtube.com/watch?v=A3AdN7U24iU&t=2914s). It was a great talk with a heavy dose of computational history. As someone that really values the intersection of technology and society, the comparison of systems languages to American railroads was amazing – especially watching it a day after [the U.S. House Committee on Financial Services discussed the Rust language in respect to Facebook’s Libra](https://www.c-span.org/video/?c4808083/rust-language-chosen).

While watching Carol’s talk it occurred to me that while writing all of oViT by hand in Rust definitely has its strengths, it is slower and more painful process. If I want a proper tool sooner than later, I should treat `mfs-tools` and `mfs-utils` as legacy code libraries and use the already written functions that I haven’t implemented yet.

Going to use the [`cc` crate](https://crates.io/crates/cc) to build the existing C code into oViT. Because it is very likely I’m going to need to patch and modify the C code for these projects, I’m not going to use git submodules to clone the codebases in. I’ve cloned `mfs-utils` from the [elitak/mfs-utils](https://github.com/elitak/mfs-utils) repo on GitHub, and `mfs-tools` from their [SourceForge page](https://sourceforge.net/p/mfstools/mfstools/ci/master/tree/). This should ensure I am working against the most recent copies of both codebases; with `mfs-utils`’s last commit in 2009 and `mfs-tools`’s last commit in 2015.

![](/content/images/wet_painters_063.jpg)

_Three Hours Later_

Nope. Giving up on the FFI & Legacy Code idea. Good idea in concept, maybe not for this project right now. Got stuck with the code getting compiled, but not linked. Going to move all of today’s commits into a separate branch for later.