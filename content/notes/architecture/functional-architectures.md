---
date: 2020-06-27T21:43:00.831Z
title: Functional architectures
category: note
tags: [functional, architecture]
published: true
description: Notes on the talk "Functional architectures - The pits of success" by Mark Seemann
---

See the original talk [Functional architecture - The pits of success](https://www.youtube.com/watch?v=US8QG9I1XW0) by Mark Seemann, and the [blog](http://blog.ploeh.dk).

## TL;DR

- write as many **pure** functions as possible
- write impure functions on the boundary of the system and call pure functions from them
- strive for function isolation: the less the function knows about the outside world, the better

Result:

- Pure function - ideal + testable
- Isolated function - testable

## Port and adapters

In other words, it is layered app architecture. In the middle there is **domain model and business logic**. Around it there are layers that protect it from technical details, like db or web server frameworks.

On top of the business logic there is application model or service layer that adapts the business models to the outside world.

This architecture is tightly coupled with SOLID and DI in the OOP world. Which means that in order to do it right, you should read a couple of books that explain those concepts (like Bob Martin "The clean architecture"), which are like 500 pages long.

> “If you need 500 pages to explain a concept, there is probably be a better way to explain it”
> (c) Mark Seeman

If you break these principles and layers (which is easy and sometimes tempting to do in OOP since it is a quick fix to a potential problem), you are screwed. Even if you think you will fix it later.

> “Later is never”
> (c) Mark Seeman

This architecture is difficult to achieve with OOP, but with FP it falls into this architecture by itself.

One of the design ideas of FP is **pure functions**. **Goal** is to maximize pure functions. Every system is impure at the boundary or entry point, so a guideline is to call the pure functions at the boundary functions which are impure.

As an example, in `Haskell` ([pure functional language](/notes/purely-functional-language/)), IO **must** happen at the boundary of the systems.

## Services and data

A typical OO pattern is **Active record**, where you have data and behavior coupled together (encapsulation), like having entity data from db together with CRUD operation on that entity. This is more of an anti-pattern, since such classes grow quickly with more behavior and eventually become **god classes** with too much behavior (single responsibility principle suffers).

Business logic coupled with data into objects - is <mark>baaaad</mark>, since business logic changes at a difference cadence then data. Solution in OOP is to put business logic into objects that are collections of behavior - services, and keep objects just with data in entities and value objects.

**Conclusion**: data and behavior should be separate, which in FP just happens by default.

## Testability

Pure functions are always testable and in `F#` functions that accept other functions as params might be pure or impure depending on the functions passed in. The function that accepts other functions is like a Schrödinger's cat, it is pure if the dependency functions are pure, and is impure if one of them is impure.

In a unit test you just pass pure functions as dependencies and the function being tested becomes **pure**. Such functions are extremely easy to test since, **pure functions are intrinsically testable**.

### Function isolation

[Jessica Kerr](https://jessitron.com/) talks "function isolation":

> Function Isolation - the only information a function has about the outside world is passed into it via arguments - (c) Jessica Kerr

**Function isolation** is a desirable quality of a function, when the function has no implicit knowledge of the outside world. Pure functions are a subset of isolated functions.

### Unit testing and TDD

Tests a unit in **isolation** from its dependencies.

> Test driven development leads to test induced damage. <br />(c) David Heinemeir Hansson

The original blog article [test-induced design damage, 2014](https://dhh.dk/2014/test-induced-design-damage.html). This is applicable for OOP, since writing OOP code for testability requires a lot of noise just for the sake of being testable (all the noise includes interfaces for all dependencies with DI).

In FP, higher order functions is your DI. A function is like an interface implicitly, function's type is the interface analogue.

Isolation + OOP + TDD = Test induced damage. Why?

#### OOP

- philosophy is encapsulation
- to make it testable we need to aim for isolation
- it requires a lot of effort and control
- TDD needs isolation

The culprit is OOP, not TDD.

#### FP

- pure functions are isolated
- impure functions might still have isolation if they don't have any implicit knowledge about the outside world
- write as many pure functions as possible
