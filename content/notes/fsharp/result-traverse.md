---
path: fsharp-result-traverse
date: 2020-05-03T21:27:59.831Z
title: F# Traverse on Result
category: notes
language: fsharp
tags: [fsharp, functional, traverse]
description: F# Traverse on Result
---

Performing side effects in a loop with saving result from each one of them in a resulting list:

```fsharp
let createOrders (userId : int) (orders : Order seq) : Result<unit, ApiError> =
    seq {
        for order in orders ->
            orderService.CreateOrder userId order
    }
    |> Result.foldResultList
    |> Result.ignore

let processOrders (userId : int) (orders : Order seq) : Result<UserHistory, ApiError> =
    result {
        do! createOrders userId orders
        return! orderService.GetUserHistory userId
    }
```
