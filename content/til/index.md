---
path: today i learned
date: 2020-06-10T18:40:00.831Z
title: today i learned
category: til
description: what I learn every day
---

## TIL #12

<small> #cmd, #linux </small><small>2021-08-19</small>

Check history of commands in `linux` using `history`.
Search the history with `Ctrl + R`.

## TIL #11

<small> #git, </small><small>2021-08-12</small>

Get list of file changes between two branches in `git`:

```
git diff --summary origin/master origin/feature-branch
```
Shows rename/move information one file per line

```
git diff --name-only origin/master origin/feature-branch
```
Shows list of files that changed.

## TIL #10

<small> #cmd, #linux </small><small>2021-07-23</small>

Command to search for files and folders in `linux` by name:

```
sudo find / -name filebeat.yml
```

## TIL #9

<small> #git, </small><small>2020-09-25</small>

Difference between `HEAD~` and `HEAD^`.
`branch-name~` is used to go back a number of commits from the tip of the branch, while `branch-name^` is used to choose a parent of the tip of the branch, which only makes sense if there was a merge and the commit has several parents.

Examples:

- `HEAD~3` (go 3 commits back from the current commit) is the same as `HEAD^^^` (parent of parent of parent),
- `HEAD^2` means the second parent of the current commit, which is rarely needed,
- `HEAD~` is the same as `HEAD~1` and `HEAD^` is the same as `HEAD^1`.
- undo the last commit:

```
git reset HEAD~
```

## TIL #8

<small> #git, </small><small>2020-06-26</small>

Get the name of the current branch in `git`:

```
git rev-parse --abbrev-ref HEAD
```

## TIL #7

<small> #dev-ops, #docker, </small><small>2020-06-22</small>

Kill the process locking a port on Mac:

```sh
$ sudo lsof -i tcp:3000
$ kill -p PID
```

## TIL #6

<small> #dev-ops, #docker, </small><small>2020-06-14</small>

You can reload `nginx` configuration inside your `docker` container without restarting the whole container, [source](https://www.shellhacks.com/docker-reload-nginx-inside-container/). Find the id of your `nginx` container and send `reload` signal to it:

```sh
$ docker ps
# check whether the configuration is valid
$ docker container exec <container> nginx -t
$ docker container exec <container> nginx -s reload
```

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
