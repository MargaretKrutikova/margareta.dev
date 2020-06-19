---
path: Type polymorphism
date: 2020-05-27T00:26:00.831Z
title: Type polymorphism
category: note
tags: [languages, polymorphism]
published: true
description: Different types of polymorphism and comparison between languages
---

Polymorphism can be defined as a way of representing multiple different types in a single abstraction.

## Structural vs nominal type systems

How the type system decides if the types are equivalent (1) or have a subtype-relationship (2)?

1. Structural typing

**Answer**: Structure of types. Properties of types must be identical in order for the types to be identical.
**Examples**: `OCaml`, `Typescript`, `Haskell`.
Common for dynamically-typed languages.

2. Nominal typing

**Answer**: Explicit declarations. Type declarations have the same name.
**Examples**: `C#`, `Java`, `Rust`, `Swift`, `F#`.
Nominal is a subset of structural.

See [link](https://web.archive.org/web/20161013053206/http://c2.com/cgi/wiki?NominativeAndStructuralTyping)

## Types of polymorphism

1. Subtyping

Restrict the range of types that can be used in a given abstraction (function or type) through relation between types.
Common for OOP languages through **interface** or **subclassing**. Requires "substitute" relationship, subtypes/supertype.

Subtypes can be used in places of supertypes.

**Examples**: `C#`, `Java`, `F#` (wtf)

No support in `OCaml` due to the module systems and type signatures for modules.

2. Parametric polymorphism (generics)

Handle values generically without depending on their type.
Generics in `Java` or `C#` and templates in `C++`.

3. Row polymorphism

`OCaml` objects - polymorphic records.

See [this](https://stackoverflow.com/questions/48092739/what-are-row-types-are-they-algebraic-data-types) SO answer.

4. Ad-hoc polymorphism

No relationship between the types is necessary (as opposed to subtyping). There concrete implementations for the different types.
**Examples**: `Haskell` operator overloading and type classes.

https://medium.com/@pmbanka/polymorphwhat-e3b36bbb2f99
