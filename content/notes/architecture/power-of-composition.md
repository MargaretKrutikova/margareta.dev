---
date: 2020-05-27T09:43:00.831Z
title: The power of composition
category: note
tags: [functional, architecture]
published: true
description: Notes on the podcast "The power of composition with Scott Wlaschin" by Three Devs and a maybe
---

If you want to change the logic, you just build another piece without changing the current logic.

- **Treat your code as immutable** - the same way you treat your data structures. If you don’t alter your code, it is hard to introduce new bugs.

- **Single responsibility principle** - if you are changing smith you are adding a responsibility.

Having a lot of small components is a good idea! Micro services, pipelines etc

FP forces you to do interfaces - every function parameter defines an interface, the type is the interface itself, see [unit testing in FP vs OOP](http://localhost:8002/notes/architecture/functional-architectures/#unit-testing-and-tdd).

## Arguments against statically typed languages

Types cause coupling - argument for dynamic typed languages. Row polymorphism.

Types are anti-modular - it is a contract between things, no types provides flexibility.

Efficiency (how well does your engine work) vs effectiveness. Developers focus on efficiency and we can get lost without going into the right direction. Type systems ensures correctness but doesn’t help to go in the right direction (Rich Hickey, `clojure`),

> Programming is not a mathematical thing - it is a human thing! <br />(c) Scott Wlaschin
