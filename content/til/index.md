---
path: today i learned
date: 2020-06-10T18:40:00.831Z
title: today i learned
category: til
description: what I learn every day
---

# T.I.L. - Today I learned

## TIL #5

<small> #dev-ops, #docker, </small><small>2020-06-14</small>

Difference between `docker-compose restart` and `docker-compose up`: `up` builds, recreates and starts the containers. Typically, you want `docker-compose up` since `restart` will not recreate them so any changes made to `docker-compose.yaml` are not going to be picked up.

¯\\\_(ツ)\_/¯

## TIL #4

<small> #typescript, #react, </small><small>2020-06-12</small>

Tagged union can help avoid invalid states, e.g. passing nullable id when in fact it can never be null:

```tsx
type State = { status: "Empty" } | { status: "SelectedProject"; id: number }

const App = () => {
  ...
  return state.status === "Empty" ? (
    <NoProjectsAvailable />
  ) : (
    <SelectedProject id={state.id} />
  )
}
```

## TIL #3

<small> #git, </small><small>2020-06-12</small>

You can cherry-pick only some specific changes in a commit in `git`:

```sh
git cherry-pick -n <commit_hash>
# the changes appear as staged
# unstage/modify/stage
git commit -m "Fix stuff"
```

You can inspect and modify the result and then commit. Awesome!

## TIL #2

<small> #gatsby, #react, </small><small>2020-06-11</small>

Filenames in `gatsby` must be lowercased, otherwise the page will become blank in production builds. It is a convention in `gatsby` since the casing of filename maps directly to the rendered file.

¯\\\_(ツ)\_/¯

## TIL #1

<small> #git, #windows, </small><small>2020-06-10</small>

Rename case-only directory on `Windows` in a `git` repo:

```sh
$ git mv docs DocsS2
$ git mv Docs2 Docs
```
