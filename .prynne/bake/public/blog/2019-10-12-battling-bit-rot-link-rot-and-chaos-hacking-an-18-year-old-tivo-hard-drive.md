---
title: "Battling Bit Rot, Link Rot, and Chaos: Hacking an 18 Year Old TiVo Hard Drive"
date: 2019-10-12T06:00:00Z
description: ""
featured_image: /assets/images/LinkRotBitRotTiVoHDD-01.png
---

This past summer in-between semesters at school I set out to work on a project I've wanted to work on for a while. Some time ago I extracted the hard drive from my childhood TiVo before sending the actual unit off to an e-waste facility during a round of spring cleaning. My thought at the time was that hard drives take up way less space than an aging TiVo unit, and one day I may want to get the data off the drive. So with the free time of a summer break, I set out to work on this project.

However, what I couldn't predict going into this project was the chaos of life that would occur around this project. I set out to work on this project while moving between apartments, Apple recalling my MacBook, and the everyday stressors of a college student going into their fourth year at university.

Although I didn't accomplish my goal of extracting the video streams from the drive, I did experiment with creating a write-up while working on the project. Below, is that writeup:

---

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

After installing [`rustup`](https://www.rust-lang.org/learn/get-started), running `rustup update` after installation, and reading some of the preloaded language book using `rustup doc --book` I’m feeling good to start coding with Rust.

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

The last thing I implemented in this project was functionality to byte swap the ISO file I made of the hard drive. While this was a fun and very helpful exercise for getting more comfortable with Rust and the data I’m working with, It’s not very practical for the long term. Going forward I think I’ll just let the [`byteorder`](https://crates.io/crates/byteorder) crate handle the BigEndian-ness of the TiVo’s hard drive data.

Looking through the `mfstools` source code has been very helpful in figuring out how to interact with the TiVo drive data. Using it and a hex viewer I’ve been able to see around the general binary of the ISO file I created. The first helpful thing I’ve found was [using the first byte of the drive to determine if it is a valid TiVo hard drive](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/lib/macpart.c#L193-L208), and if the drive is byte swapped ([Little Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L6) or [Big Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L7).)

The `mfstools` code base helped show that TiVo was using the [Apple Partition Map](https://en.wikipedia.org/wiki/Apple_Partition_Map) for its hard drives. I was confused why the `mfstools` author kept referring to “Mac partitions” on the TiVo, until I Googled the Hex value in the [`MAC_PARTITION_MAGIC` constant](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L8) and found a [book chapter on the forensic analysis of Macintosh hard drives](http://www.informit.com/articles/article.aspx?p=376123&seqNum=3) explaining that `0x504d` was used as a signature byte on drives using Apple Partition Map.

I speculate that TiVo chose to use the Apple Partition Map on its drives because [they were using PowerPC processors](https://en.wikipedia.org/wiki/TiVo_digital_video_recorders#Series1) and Apple had already created a partition map for their PowerPC machines known to work well with media. Because the Linux kernel (which the TiVo OS was based on) supported Apple partitions, this would mean less work for TiVo and they could spend more time perfecting the experience of the DVR instead of worrying about the low-level technical implementation of it.

# Day 6 - June 25, 2019

## The Search for More Apple Partition Map Prior Art

While looking for anymore information on Apple Partition Map before completely jumping back in I found a [node.js module for loading Apple Partition Maps](https://github.com/jhermsmeier/node-apple-partition-map). I don’t know why the author chose to implement their APM loader in JavaScript, but I absolutely love it. And thankfully they listed some of their references in the README of their module. There is some overlap between our references, but they also had some references to source code to Apple’s IOStorageFamily for macOS. ([IOApplePartitionScheme.h](https://opensource.apple.com/source/IOStorageFamily/IOStorageFamily-116/IOApplePartitionScheme.h.auto.html) and [IOApplePartitionScheme.cpp](https://opensource.apple.com/source/IOStorageFamily/IOStorageFamily-116/IOApplePartitionScheme.cpp.auto.html)) Sadly, since Apple transitioned to using GUID Partition Tables during the Mac-Intel transition and the transition was largely finished by the end of the 2000’s I imagine these files last copyright dated in 2009 are the last APM files to come out of Apple.

## Using Hex Viewer to View Apple Partition Map

Loading up the byte swapped ISO image I created into a Hex Viewer yields the following:

![](/assets/images/annotation-2019-06-26-153435.png)

Here we can see `0x1492` in the first two bytes of the image, so we know this should be a valid TiVo disk image. As well, we can see `0x504d` in the 200 & 201st bytes indicating an Apple Partition Map Partition Entry.

Thanks to the Wikipedia entry on APM, we know that the drive is likely divided into logical blocks of 512 bytes. Setting the hex viewer to display bytes in rows of 512 bytes yields the following:

![](/assets/images/annotation-2019-06-26-154008.png)

Cool. Now we can more easily see the 13 partition entries on the drive. We can see the partition that contains the partition map we’re currently interacting with. As well, as eight partitions related to the Linux install on the drive. The two `Ext2` partitions on there could be cool to poke around one day. We can see two MFS application partitions, and most importantly two MFS media regions. Awesome. Being able to visualize the disk like this has been incredibly helpful, and being able to reference the [partition map entry layout from Wikipedia](https://en.wikipedia.org/wiki/Apple_Partition_Map#Layout) is going to be very helpful as we charge forward.

---

> Note from Future Kepler: Because they were just lists of commits done in the oViT repo that day and not explaining what was worked on or learned those days, days 7 through 17 have been removed from this post. (October 12, 2019)

---

# Day 18 - July 18, 2019

It’s been a bit since I last did anything with this project. I’ve spent some time working on my website and have gotten cognitive distance from what I’m trying to do here. Earlier today I got to watch a really great talk from Carol Nichols called [Rust: A Language for the Next 40 Years](https://www.youtube.com/watch?v=A3AdN7U24iU&t=2914s). It was a great talk with a heavy dose of computational history. As someone that really values the intersection of technology and society, the comparison of systems languages to American railroads was amazing – especially watching it a day after [the U.S. House Committee on Financial Services discussed the Rust language in respect to Facebook’s Libra](https://www.c-span.org/video/?c4808083/rust-language-chosen).

While watching Carol’s talk it occurred to me that while writing all of oViT by hand in Rust definitely has its strengths, it is slower and more painful process. If I want a proper tool sooner than later, I should treat `mfs-tools` and `mfs-utils` as legacy code libraries and use the already written functions that I haven’t implemented yet.

Going to use the [`cc` crate](https://crates.io/crates/cc) to build the existing C code into oViT. Because it is very likely I’m going to need to patch and modify the C code for these projects, I’m not going to use git submodules to clone the codebases in. I’ve cloned `mfs-utils` from the [elitak/mfs-utils](https://github.com/elitak/mfs-utils) repo on GitHub, and `mfs-tools` from their [SourceForge page](https://sourceforge.net/p/mfstools/mfstools/ci/master/tree/). This should ensure I am working against the most recent copies of both codebases; with `mfs-utils`’s last commit in 2009 and `mfs-tools`’s last commit in 2015.

![](/assets/images/wet_painters_063.jpg)

_Three Hours Later_

Nope. Giving up on the FFI & Legacy Code idea. Good idea in concept, maybe not for this project right now. Got stuck with the code getting compiled, but not linked. Going to move all of today’s commits into a separate branch for later.

---

Sadly, I never wrote anything more on this write-up after the 18th. I did continue to work on oViT a bit more that month, but had to move on and work on other things as school started back just a few weeks later in August. The oViT source code can be found in its [GitHub repo](https://github.com/keplersj/ovit/). One day I hope to get back to this project, but I don't foresee that happening for a while.

This project was often very frustrating to work on. Going into the project I knew that much of the material I was going to be referring to wasn't going to be from first-hand sources. But as I continued to research and work on this drive I kept encountering the issue of [link rot](https://en.wikipedia.org/wiki/Link_rot) in the increasingly aging pages I was looking for. While [Tivopedia](http://www.tivopedia.com/) and [The TiVo Community Forum](https://www.tivocommunity.com/community/index.php) remain online after all of these years, many of the hyperlinks in the 14-18-year-old posts I was reading had simply gone dead. People hosting information, software, and source code on personal websites that they have long stopped paying for hosting, domain registration, and otherwise abandoned. While looking for information from others who reverse-engineered the first-generation TiVo before me, I often related to Randell Monroe's [xkcd #979](https://xkcd.com/979/):

![xkcd #979: Wisdom of the Ancients](/assets/images/wisdom_of_the_ancients.png)

There is a bright side to this experience though. Before starting work on oViT, I was incredibly burnt out of software development. Working on oViT allowed me to work on and research an incredibly interesting problem, allowed me to learn a new programming language in Rust, and reignited my interest in website development. Writing this write-up gave me a reason to build my website up, and get back into development.

# Conclusion

Burnout sucks. Link rot sucks. Both are incredibly important to overcome. Burn out is inevitable when you're constantly spinning your wheels on everything in life (academic and professional.) And sadly, link rot is inevitable with the current state of the web and the often fleeting nature of information. We must do everything in our power to preserve our personal energies and the important work we do with that energy.
