---
title: Hacking 18 Year Old TiVo Hard Drive
date: 2019-06-22T23:17:09.523Z
description: >-
  Write up about my attempts to extract recordings from the hard drive of my
  childhood TiVo.
---
Growing up our family used a [Series One TiVo (Sony SAT T-60)](http://www.TiVopedia.com/model-sony-satt60.php) to watch and record TV. We used it for probably ten years before we upgraded to a non-TiVo HD DirecTV DVR, before eventually just cutting the cord all together a few years later. A few years after upgrading we decided to throw out the old TiVo box during a round of Spring cleaning.

However, being the data nerd I am at heart I made sure to remove and stash the hard drive from the TiVo before throwing the unit away. At the time I figured a hard drive is a hard drive, and one day I may want to try and retrieve the contents from the drive. Well, that day has come!

Below is a log of my attempt to extract the recordings off of the hard drive of my childhood TiVo:

# Day 0 - June 18, 2019

Before we begin, let's do some prep work.

## Research

Our SAT T-60 TiVo came with a 40 Gigabyte Maxtor IDE Drive, this is the same hard drive I removed. [TiVopedia](http://www.tivopedia.com/tivo-hard-drives.php) and [Wikipedia](https://en.wikipedia.org/wiki/TiVo_Media_File_System) both have high-level writeups about TiVo hard drives and the Media File System (MFS) on them.

Luckily for me, the TiVo modification community has existed for a long time and has a lot of open source code still available within it. Most notably, [MFS Tools](https://www.tivocommunity.com/community/index.php?threads/mfs-tools-3-2.529148/) should be helpful for learning how to interact with the file system.

## Cloning the Drive

Before I even start attempting to extract the recordings, I want to create a clone of the drive. It is a 10-year-old mechanical hard drive that has been sitting idle for several years now, and I don't want to put too much stress on the drive. Interacting with a disc image of the drive will be more convenient and safer.

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
