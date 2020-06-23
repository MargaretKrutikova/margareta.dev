---
path: async-seq
date: 2020-06-23T21:43:00.831Z
title: Asynchronous sequences in F#
category: note
language: fsharp
tags: [fsharp, async, functional]
published: true
description: Some common examples working with asynchronous sequences with AsyncSeq
---

Some examples of working with asynchronous sequences in F# with the library `FSharp.Control.AsyncSeq`:

## Example #1

**Given** a function that fetches an item by `id` asynchronously and a sequence of ids.

**Goal:** transform the ids into `items : Async<'a list>`

```fsharp
let getByIdsAsync (ids : int seq) (getById : int -> Async<'a>) : Async<'a list>=
    ids
    |> AsyncSeq.ofSeq             // returns AsyncSeq<int>
    |> AsyncSeq.mapAsync getById  // returns AsyncSeq<'a>
    |> AsyncSeq.toListAsync       // returns Async<'a list>
```

## Quick reference:

- `AsyncSeq.ofSeq : seq<'a> -> AsyncSeq<'a>` - create an asynchronous sequence
- `AsyncSeq.mapAsync : ('a -> Async<'b>) -> AsyncSeq<'a> -> AsyncSeq<'b>` - map each element to `Async`
- `AsyncSeq.toListAsync : AsyncSeq<'a> -> Async<'a list>` - creates an async computation which iterates the `AsyncSeq` and collects the output into a list
