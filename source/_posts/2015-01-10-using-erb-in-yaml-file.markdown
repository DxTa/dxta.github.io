---
layout: post
title: "Using ERB in YAML file"
date: 2015-01-10 10:52:55 +0700
comments: true
categories: [rails, ruby]
keywords: dxta, ta minh duc, blog, archive, rails, ruby, erb
description: Using ERB Code in YAML file
---

YAML Configuration files is used in many Rails application, such as: `database.yml`,
`config.yml`.

Take `config.yml` for example:

	# config/config.yml
	development:
		key1: vccloud
        key2: vccloud is awesome
	...

This is normal YAML file. It can be seen that, information is normally repeated. In this
post, a solution will be given.

Old way of loading configuration file:

	# config/initializers/load_config.rb
	APP_CONFIG = YAML.load_file("#{Rails.root}/config/config.yml")[Rails.env]

New way:

	# config/initializers/load_config.rb
	APP_CONFIG = YAML.load(ERB.new(File.read("#{Rails.root}/config/config.yml")).result)[Rails.env]

In the new way, instead of loading YAML file directly, module YAML loads returned string
from module ERB. Therefore, `config.yml` can be editted:

	# config/config.yml
    <% name = vccloud %>
	development:
		key1: <%= name %>
        key2: <%= name %> is awesome
	...

