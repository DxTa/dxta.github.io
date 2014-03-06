---
layout: post
title: "Init Script for Sidekiq in Centos"
date: 2014-03-06 13:56:07 +0700
comments: true
categories: [rails, sidekiq, script, centos]
keywords: dxta, ta minh duc, blog, archive, rails, sidekiq, init.d, centos, script
description: Init Script for Sidekiq in Centos
---

Sidekiq is a simple, efficient background processing for Ruby.
more_info: sidekiq.org

Sidekiq is easy to use, easy to setup. However, to make sidekiq run at startup is not so easy.
There 's also a nice script here (https://github.com/mperham/sidekiq/blob/master/examples/sidekiq),
although I 've got few problems with it.

If we have another user for deploying, then command __bundle exec__ only accessed with 'deploy' user.
Root  had no access to __bundle exec__.

Solution: Modify provided Sidekiq init script, to make it run __bundle exec__ as 'deploy' user

``` bash
AS_USER="kienbd"
START_CMD="$BUNDLE exec $SIDEKIQ -e $APP_ENV -P $PID_FILE"
CMD="cd ${APP_DIR}; ${START_CMD} >> ${LOG_FILE} 2>&1 &"

# $START_CMD >> $LOG_FILE 2>&1 & #replaced this
su -c "$CMD" - $AS_USER # with this
```
To make it run at startup, use __chkconfig__ to add this as new service. Moreover, you need to verify
header of your script, make sure it is fired after __redis-server__.

``` bash
chkconfig --add name_of_new_service
```

{% include_code [sidekiq] [lang:bash] sidekiq %}
