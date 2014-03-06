---
layout: post
title: "Invalid Login Snapping: Prevent Invalid Login Attempts Script for OSX"
date: 2014-02-23 19:54:05 +0700
comments: true
categories: [osx, script, security]
keywords: dxta, ta minh duc, blog, archive, login, invalid, prevent, osx, script
description: Prevent Invalid Login Attempts Script for OSX
---

This script will take a snapshot on failed login attempts, email it to your email account,
letting you know someone is currently trying to login to your macbook.

Requirement
-----------
	1. imagesnap
	2. whereami
	3. An email account (I'm currently using Gmail)

Configure Email
---------------
Append the following line to __/etc/postfix/main.cf__

``` bash /etc/post/fix/main.cf
relayhost=smtp.gmail.com:587
smtp_sasl_auth_enable=yes
smtp_sasl_password_maps=hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options=
smtp_use_tls=yes
smtp_tls_security_level=encrypt
tls_random_source=dev:/dev/urandom
```
Create __/etc/postfix/sasl_passwd__ and populate following example below:
	smtp.gmail.com:587 account@gmail.com:password

Then run:
``` bash
postmap /etc/postfix/sasl_passwd; chmod 600 /etc/postfix/sasl_passwd*
postfix stop
postfix start
```
Enable Logging Failed Attempt
-----------------------------
Append this line to __/etc/asl.conf__

	# Facility loginwindow gets saved in loginwindow.log
	? [= Sender loginwindow] file /var/log/loginwindow.log mode=0640 format=bsd

Restart syslogd

``` bash
sudo launchctl unload /System/Library/LaunchDaemons/com.apple.syslogd.plist
sudo launchctl load /System/Library/LaunchDaemons/com.apple.syslogd.plist
```

Scripting
---------
Create script __/usr/local/bin/invalid_login_snap__ :

__Remember to change email to yours__.

``` bash
#!/bin/sh

runcheck=`ps -ef|grep -v grep|grep 'tail -f /var/log/loginwindow.log' > /dev/null;echo $?`
zero=0;

if [ $runcheck -ne $zero ]; then
  nohup tail -f /var/log/loginwindow.log| awk '/The authtok is incorrect/ {system("/usr/local/bin/imagesnap /var/tmp/.snap.jpg > /dev/null; \(curl ipecho.net/plain ; echo; /usr/local/bin/whereami; uuencode /var/tmp/.snap.jpg snap.jpg\)\|mailx -s \"Macbook Invalid Login Attempt\" ductm310@gmail.com; echo \"Someone Is Trying To Log Into Your Macbook Check Gmail for Snapshot\" \|rm -f /var/tmp/.snap.jpg")}' &
var/tmp/.snap.jpg
fi
```

__Make sure your script is executable__

Autostart
---------
There are many ways to make this script autostart.

I use Automator to create application executing this script and add to StartupItems.
