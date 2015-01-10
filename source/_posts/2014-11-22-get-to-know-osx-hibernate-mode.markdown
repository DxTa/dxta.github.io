---
layout: post
title: "Get To Know OSX Hibernate Mode"
date: 2014-11-22 09:11:58 +0700
comments: true
categories: [osx, terminal, trick]
keywords: dxta, ta minh duc, blog, archive, osx, terminal, herbinate, herbinatemode, sleep
description: Learn more about Hibernate and Sleep in OSX
---

In OSX, there are 7 hibernate mode. Each of them are suitable to some cases.

1. __hibernatemode 0__: Memory will not be backed up in storage. Hence, power loss will
   cause the system lose.
2. __hibernatemode 3__: A copy of memory will be stored in the disk. Hence, in case of
   power loss, instead of waking up from memory, the system will wake up from disk image.
3. __hibernatemode 1__: OSX will write memory state to image at sleep time and wake up
   from this image.
4. __hibernatemode 2__: Memory will not be backed up in storage until the battery level
   drops below or a near empty threshold.
5. __hibernatemode 8__: Dynamic pager pages out inactive pages prior to hibernation in
   order to get a smaller  memory footprint.
6. __hibernatemode 16__: Dynamic pager pages out more aggressively prior to hibernation.
7. __hibernatemode 25__: A copy of memory will be duplicated in the storage, and the power
   will be removed from the memory. The system will restore from disk image. (slower sleep
   and wake up, but better battery life)

To easy to switch between these hibernate mode, you can use the below commands:

``` bash
alias hibernate='sudo pmset -a hibernatemode 25'
alias sleep='sudo pmset -a hibernatemode 0'
alias safesleep='sudo pmset -a hibernatemode 3'
alias smartsleep='sudo pmset -a hibernatemode 2'
```
In case, you want to perform _closing lid_ action, you can use the below command:
``` bash
pmset sleepnow
```

Or, you want to prevent the system automatically waking up when open the lid:

``` bash
sudo pmset lidwake 0
```
