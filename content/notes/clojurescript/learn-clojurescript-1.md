---
path: clojurescript-start-template
date: 2020-06-18T23:40:00.831Z
title: ClojureScript start template
category: note
tags: [clojurescript, functional]
published: true
description: Start a ClojureScript project with lein and figwheel
---

## Smooth start

lein new figwheel clojure-test -- --reagent

Install npm dependencies via 'npm install'
Then run 'lein figwheel'

Result:

```sh
Figwheel: Cutting some fruit, just a sec ...
Could not find artifact org.clojure:clojurescript:jar:1.10.775 in central (https://repo1.maven.org/maven2/)
Could not find artifact org.clojure:clojurescript:jar:1.10.775 in clojars (https://repo.clojars.org/)
This could be due to a typo in :dependencies, file system permissions, or network issues.
If you are behind a proxy, try setting the 'http_proxy' environment variable.
```

WTF

Incorrect version in project.clj for clojurescript:
https://github.com/clojure/clojurescript/releases - latest `1.10.758`, default in the generated template `1.10.775`
