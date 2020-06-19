---
path: fsharp-list
date: 2020-06-03T21:35:00.831Z
title: F# list
category: note
language: fsharp
tags: [fsharp, functional]
published: true
description: F# list - why avoid concat and prefer cons
---

## List data structure and common operations

`F#` list is a linked list, where each node has a link to the next node. It is also <mark>immutable</mark>. See [mastering `F#` lists](https://docs.microsoft.com/en-us/archive/blogs/chrsmith/mastering-f-lists#linked-lists). Available operations:

- `Cons` - add an element to the beginning of a list. `'a –> 'a list –> 'a list`, constant time `O(1)`. Example `1::[2..4]`.
- `Concat` - join two lists together. `'a list * 'a list -> 'a list`, `O(n)` where `n` is the length of the first list. Example: `[2; 3; 4] @ [5 .. 7]`

## Avoid @

Avoid list concatenation with `@`, from [SO](https://stackoverflow.com/a/5460603/6053299):

> In F# the list type is implemented as a singly linked list. Because of this you get different performance for x @ y and y @ x if x and y are of different length. That's why your seeing a difference in performance. (x @ y) has running time of X.length.

The append operator (`@`) creates a new list by concatenating two lists, so appending a shorter list to a longer list is slower than appending a longer list to a shorter list, since it needs to copy the first list (lists are immutable, duh...).

## Correct way to build a list

To build a list prepend the new data to the front and then reverse (if e.g. using `List.foldBack`).

See SO [Why can you only prepend to lists in functional languages?](https://stackoverflow.com/questions/1435359/why-can-you-only-prepend-to-lists-in-functional-languages).

And why not just use doubly-linked list on [SO](https://stackoverflow.com/questions/7709632/why-dont-f-lists-have-a-tail-pointer), spoiler alert - requires mutability.
