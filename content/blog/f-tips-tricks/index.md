---
path: fsharp-tips-and-tricks
date: 2020-05-03T21:27:59.831Z
title: F# Tips & Tricks
description: F# useful code example and concepts
---

Performing side effects in a loop with saving result from each one of them in a resulting list:

```fsharp
let createOrders (userId : int) (orders : OrderInputModel seq) : Result<unit, ApiError> =
    seq {
        for order in orders ->
            orderApiService.CreateOrder userId order
    }
    |> foldResultList
    |> Result.ignore

let processOrders (userId : int) (orders : OrderInputModel seq) : Result<UserHistoryModel, ApiError> =
    result {
        do! createOrders userId orders
        return! orderApiService.GetUserHistory userId
    }
```
