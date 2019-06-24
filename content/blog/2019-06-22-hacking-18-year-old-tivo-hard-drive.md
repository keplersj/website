---
title: Hacking 18 Year Old TiVo Hard Drive
date: 2019-06-22T23:17:09.523Z
description: >-
  Write up about my attempts to extract recordings from the hard drive of my
  childhood TiVo.
---
Growing up our family used a [Series One TiVo (Sony SAT T-60)](http://www.TiVopedia.com/model-sony-satt60.php) to watch and record TV. We used it for probably ten years before upgrading to a non-TiVo HD DirecTV DVR, before eventually just cutting the cord all together a few years later. A few years after upgrading we decided to throw out the old TiVo box during a round of Spring cleaning.

However, being the data nerd I am at heart I made sure to remove and stash the hard drive from the TiVo before throwing the unit away. At the time I figured a hard drive is a hard drive, and one day I may want to try and retrieve the contents from the drive. Well, that day has come!

Below is a log of my attempt to extract the recordings off of the hard drive of my childhood TiVo:

# Day 0 - June 18, 2019

Before we begin, let's do some prep work.

## Research

Our SAT T-60 TiVo came with a 40 Gigabyte Maxtor IDE Drive, this is the same hard drive I removed. [TiVopedia](http://www.tivopedia.com/tivo-hard-drives.php) and [Wikipedia](https://en.wikipedia.org/wiki/TiVo_Media_File_System) both have high-level writeups about TiVo hard drives and the Media File System (MFS) on them.

Luckily for me, the TiVo modification community has existed for a long time and has a lot of open source code still available within it. Most notably, [MFS Tools](https://www.tivocommunity.com/community/index.php?threads/mfs-tools-3-2.529148/) should be helpful for learning how to interact with the file system.

## Cloning the Drive

Before I even start attempting to extract the recordings, I want to create a clone of the drive. It is an 18-year-old mechanical hard drive that has been sitting idle for several years now, and I don't want to put too much stress on the drive. Interacting with a disc image of the drive will be more convenient and safer.

After booting my MacBook into Manjaro with the drive attached using an IDE-to-USB converter cable, we're good to go. Gnome Disks shows the 40 Gigabyte drive accessible at `/dev/sdd` with no mountable partitions.

Using `dd` to create an image of the drive on a 1 Terabyte External USB Drive:

```shell
sudo dd if=/dev/sdd of=/mnt/External/tivo_hdd.iso status=progress
```

After some time I have a 40 GB disk image and can power off the drive and put it away.

## Trying MFS Tools

Before powering down the drive and putting it away, I tried using a statically linked version of `mfs_tool` available on their [SourceForge Project Page](http://mfstools.sourceforge.net) but wasn't able to yield anything immediately helpful. Running `mfs_tool backup` on the drive only yields a 1 GB binary file, and running `mfs_tool backup -a` to capture all streams on the drive fails.

Will try working with the ISO tomorrow.

# Day 1 - June 19, 2019

## Picking Up Rust

Since MFS Tools won't be able to extract the MPEG streams I want for me, I'll just have to code some tools myself.

This seems like a good opportunity to learn some [Rust](https://www.rust-lang.org). Rust seems like a good language to write the tools I'll need for this in 2019, given it's a low-level language known for its memory management.

After installing [`rustup`](https://www.rust-lang.org/learn/get-started), running `rustup update` after installation, and reading some of the preloaded language book using `rustup doc --book` I'm feeling good to start coding with Rust.

# Day 2 - June 20, 2019

## MacBook Recalled

On June 20, 2019 Apple recalled the battery in my MacBook Pro. ([Apple Support Article on the Recall](https://support.apple.com/15-inch-macbook-pro-battery-recall)) Because of this, I'm going to have to spend the day backing up my laptop and getting the data I need off of it and usable on my Surface Go. That includes this project and this write up.

# Day 3 - June 21, 2019

## Moving Data off MacBook

After backing up my MacBook with Time Machine, I committed the Rust codebase I created for this project to a GitHub repo and this write up to a draft document on my website's Netlify CMS. Going to be coding on Windows until I get my laptop back. When it comes to coding, I am more comfortable with the macOS and Linux environments on my MacBook so this might be an added challenge with this project moving forward.

# Day 4 - June 22, 2019

Left my MacBook with Apple after meeting with a Genius Bar Technician today. Hopefully should have my primary computer back in 1-2 weeks with a brand new battery.

# Day 5 - June 23, 2019

Admittedly, not much work on this project is going to get done this weekend. In between my primary machine getting recalled, needing to configure a coding environment on my Surface Go, and moving apartments haven't had a ton of time to do much on this aside from doing some research in my free time.

## More Research

The last thing I implemented in this project was functionality to byte swap the ISO file I made of the hard drive. While this was a fun and very helpful exercise for getting more comfortable with Rust and the data I'm working with, It's not very practical for the long term. Going forward I think I'll just let the [`byteorder`](https://crates.io/crates/byteorder) crate handle the BigEndian-ness of the TiVo's hard drive data.

Looking through the `mfstools` source code has been very helpful in figuring out how to interact with the TiVo drive data. Using it and a hex viewer I've been able to see around the general binary of the ISO file I created. The first helpful thing I've found was [using the first byte of the drive to determine if it is a valid TiVo hard drive](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/lib/macpart.c#L193-L208), and if the drive is byte swapped ([Little Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L6) or [Big Endian](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L7).)

The `mfstools` code base helped show that TiVo was using the [Apple Partition Map](https://en.wikipedia.org/wiki/Apple_Partition_Map) for its hard drives. I was confused why the mfstools author kept refering "Mac partitions" on the TiVo, until I Googled the Hex value in the [`MAC_PARTITION_MAGIC` constant](https://github.com/TygerStripe/mfstools/blob/f5997458aa470b0984e2f3580bfdefbf00aad35a/include/macpart.h#L8) and found a [book chapter on the forensic analysis of Macintosh hard drives](http://www.informit.com/articles/article.aspx?p=376123&seqNum=3) explaining that `0x504d` was used as a signature byte on drives using Apple Partition Map.

I speculate that TiVo chose to use the Apple Partition Map on its drives because [they were using PowerPC processors](https://en.wikipedia.org/wiki/TiVo_digital_video_recorders#Series1) and Apple had already created a partition map for their PowerPC machines known to work well with media. Because the Linux kernel (which the TiVo OS was based on) supported Apple partitions, this would mean less work for TiVo and they could spend more time perfecting the experience of the DVR instead of worrying about the low-level technical implementation of it.

# Day 6 - June 24, 2019
