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

```sh
lein new figwheel clojure-test -- --reagent
```

Install npm dependencies via `npm install`. Then run `lein figwheel`. In case you this error:

```sh
Figwheel: Cutting some fruit, just a sec ...
Could not find artifact org.clojure:clojurescript:jar:1.10.775 in central (https://repo1.maven.org/maven2/)
Could not find artifact org.clojure:clojurescript:jar:1.10.775 in clojars (https://repo.clojars.org/)
This could be due to a typo in :dependencies, file system permissions, or network issues.
If you are behind a proxy, try setting the 'http_proxy' environment variable.
```

As of 2020-06-18 there was a bug in `figwheel-template` - `clojurescript` version was incorrect, see [github issue](https://github.com/bhauman/figwheel-template/issues/47).

Go into `project.clj` and set the version to the [latest](https://github.com/clojure/clojurescript/releases). At the time of writing it is `1.10.758`.
