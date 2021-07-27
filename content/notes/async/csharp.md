---
path: async-csharp
date: 2020-10-31T17:39:00.831Z
title: Asynchronous programming in C#
category: note
language: csharp
tags: [csharp, async]
published: true
description:
---

# Asynchronous programming

## Asynchronous programming: wrong answers only

It is when you run things on different threads
It is executing tasks in parallel
It is putting a heavy computation to be executed on a parallel thread

## Some light in the dark async room

Thread of execution - logical path of execution taken by the program, synonymous to **control flow** from [](https://slikts.github.io/concurrency-glossary/?id=thread-of-execution-and-the-blocking-thread).

Compiled from several sources including [SO on concurrency/parallelism/async](https://stackoverflow.com/questions/4844637/what-is-the-difference-between-concurrency-parallelism-and-asynchronous-methods), [Rob Pike - ‘Concurrency Is Not Parallelism’](https://vimeo.com/49718712) and some of the information leftovers I found in my brain:

1. Sequential - each next operation is executed only after the previous one has completed, instructions are executed in the same order as they appear in code.

2. Parallel - executing computations literally at the same time in different threads on several CPU cores (multiple threads of execution). In general needs hardware support.

> Parallelism is about doing lots of things at once. Rob Pike
> https://talks.golang.org/2012/waza.slide#8

3. Concurrent - executing several operations with overlapping time periods, but doesn't have to run parallel. They can actually run parallel, or "appear" parallel - executed simultaneously by switching between them but still share the execution thread (one CPU core multiple threads). \*

> Concurrency is about dealing with lots of things at once. Rob Pike
> https://talks.golang.org/2012/waza.slide#8

Concurrent solution is **structured** in a way that it can be parallelized.

> CPU time-slicing feature of operating system where each task run part of its task and then go to waiting state. When first task is in waiting state, CPU is assigned to second task to complete it’s part of task.

4. Asynchronous - a style of programming (programming model), a type of control flow with non-blocking function execution. Can be implemented without threads (event loop in JS) or with threads (.NET)

I ask for something and don't wait for the result but provide a way to get notified when the result is available, e.g. callback.

Can be async but sequential

## So async operations are only possible with multiple threads/in parallel environment?

No. If you only have one thread, you can still perform operations asynchronously by switching between them when they require waiting.
Say you want to make an api call, you fire up the request and can safely do something else - say receive user input for the next request.
When the first operation completes (you get the data back from the api), you go back there and process it, then when you are done, you can process the user input and send more api requests. This is what happens when you run JS in the browser.

JS is a single-threaded environment but it is asynchronous because it switches between operations back and forth when they require waiting for external IO. You start executing the next operation before the current one completes because it needs to wait for some external event to happen.

This will however not work if you have heavy computations that need to run - when you start such a computation, you will block everything else and will have to complete it before being able to perform any other operations. That's why you dont run a loop billion types in JS, but if you do, you put it in another service worker which is essentially another thread :)

## What can and should be done async

All potentially blocking operations:

- I/O bound: get data from a network, access data from a db, read/write to a file
- CPU- or Compute-bound: performing an expensive calculation

Why is async programming important:

- in client applications - can't block the UI thread while performing api calls
- in server applications - avoid blocking threads that could be serving other requests

## .NET async models

There are [different async programming patterns](https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/) in .NET (including event-based similar to NodeJS), where Task-based is the recommended one.

## Task-based asynchronous pattern

- Uses System.Threading.Tasks namespace to have an arbitrary async operations.
- Single method to represent the beginning and end of the async operation. Such methods return Task or Task<T>

## C# specific behaviors

`Task` is a task that is already in progress

https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern

> When an asynchronous method is called, it synchronously executes the body of the function up until the first await expression on an awaitable instance that has not yet completed, at which point the invocation returns to the caller.

> For performance reasons, if a task has already completed by the time the task is awaited, control is not yielded, and the function continues to execute.

## Async in C

await allows to start a task in a non blocking way

Control flow

with await - the thread is not blocked but suspended and the execution is yielded to the caller
