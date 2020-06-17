---
title: Troubleshoot the Computer Slowness
date: "2020-06-17T00:00:00.000Z"
template: "post"
draft: false
slug: "troubleshoot-the-computer-slowness"
category: "Troubleshooting"
tags:
  - "Windows Administration"
  - "Troubleshooting"
description: "My home Windows 10 PC is running really slow. Let's find out what's going on. I'm going to share the troubleshooting approach that might be helpfull."
socialImage: "/media/denny-muller-1qL31aacAPA-unsplash.jpg"
---
![Photo by Denny Müller on Unsplash](/media/denny-muller-1qL31aacAPA-unsplash.jpg)

TL;DR If you get here from search I want to save your time. Slow computer is the most annoying thing for me.
I really understand you and hope my experience will help in your case. This post describes how to fix the 
possible Windows PC slowness caused by the intensive read/write operations to non-system slow HDD disk (disk D: in my case). 

My home Windows PC setup is (nothing really glorious):

+ CPU AMD Ryzen 5 2600 Six-Core Processor 3,85GHz
+ RAM Corsair DDR4-2400 16Gb CMK32GX4M2A2400C16 (This is temporary, usually it has a 32Gb)
+ System SSD Crucial BX500 240GB (C:)
+ Backup HDD WD Green WD10EARS 1TB 5400 RPM (D:) 
+ Media HDD WD Green WD10EARS 1TB 5400 RPM (E:) 

The quick SSD system drive for applications and games and slower HDD drives for backups and media files.

## Troubleshooting

Let's start by opening the Task Manager by pressing the key combination `Ctrl+Shift+Esc` and have the `More Details` expanded for detailed view.
Then go straight to the Performance tab.

_For some reason all the screenshots I took didn't survive the system reboot. Thus I have to draw everything back as it was before the fix being applied._
¯\\_(ツ)_/¯

![Task manager - Performance](/media/Annotation_2020-06-18_004246.png)

The first things to notice here (to be honest the first thing was the typical hard drive sound) is the high disk D: usage (in **red** at the screenshot),
which means something is constantly reading and writing to this disk. 
The other thing to pay your attention is the Memory usage (in **orange** at the screenshot).
Typically at this point people who are familiar with Windows Administration can that yell everything is clear and fix the issue.

If you have not guessed, let's move on.

Let's track using Resource Monitor disk Read/Write I/O by applications.
Start Resource Monitor by running `resmon.exe`. Or click `Open Resource Monitor` in Task Manager’s Performance tab (in **green** at the screenshot).

At the Disk tab you can sort the rows by Read or Write I/O column and track the application consuming the most resources.
In my case it was the `Memory Compression` process with a `pagefile.sys` file. Let's examine this file more closely.

In the Windows Command Shell (**cmd**) execute the following:

```cmd
D:\>dir /a:h
 Volume in drive D is Backup.
 Volume Serial Number is 8B73-54C4

 Directory of D:\

18.12.2019  11:28    <DIR>          $RECYCLE.BIN
12.06.2020  13:27             8 192 DumpStack.log.tmp
17.06.2020  20:29    18 347 122 688 pagefile.sys
23.05.2012  22:54    <DIR>          RECYCLER
27.08.2019  22:40    <DIR>          System Volume Information
```

Wow! The `pagefile.sys` is beefy. 

Let's take a step back and check how the Windows behaves when there is no available memory left.
When the applications you are running on the Windows computer end up needing more RAM than you physically have,
Windows will start shuffling most used things around using your disks as a virtual memory. 
The file being used is `pagefile.sys`, Windows virtual memory swap file.
When Windows creates `pagefile.sys` it typically makes it a huge size – usually the size of RAM installed on your machine. 

> If you've added a hard drive to your system you can move pagefile.sys to free up space on your original drive and speed up your system.

Hmmm. Doesn’t sound exactly right in my case.
At a high cost of the I/O speed, hard disk is much slower than the actual RAM, this way system avoids getting the out of memory.

## Improving the performance

There are few ways to resolve the issue.

First, more relevant to your system needs, add more RAM to the PC.

Second, more practical and simpler, move the `pagefile.sys` out of slow HDD drive to SSD.

### Moving pagefile.sys

Open the **Advanced System Settings** by pressing `Windows+X`, then choose `System`, then click `System Info` (at the right).

Click the **Performance** group `Settings`.

At the **Performance Options** get to the `Advanced` tab.

Choose to `Change` the **Virtual memory** settings.

![Virtual Memory - Settings](/media/Annotation_2020-06-18_004638.png)

Unset the checkbox to **Automatically manage paging file size for all drives**.

Choose the drive you want to move `pagefile.sys` to.

Select on `System managed size` and click **Set**.

Choose the drive currently holding `pagefile.sys` (disk D: in my case)

Select `No paging file` and click **Set**.

Save the changes and close the dialog by clicking the OK button.

The System will ask to Reboot the PC.
After your computer boot Windows again you wouldn't believe your PC can work like this (or I should say like it worked when you bought it).

See ya!
