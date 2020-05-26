---
path: Type polymorphism
date: 2020-05-27T00:26:00.831Z
title: Type polymorphism
category: note
tags: [languages, polymorphism, nerd]
published: true
description: Different types of polymorphism and comparison between languages
---

## Structural vs nominal type systems

How the type system decides if the types are equivalent (1) or have a subtype-relationship (2)?

1. Structural typing

**Answer**: Structure of types Properties of types are identical.
**Examples**: `OCaml`, `Typescript`, `Haskell`.
Common for dynamically-typed languages.

2. Nominal typing

**Answer**: Explicit declarations. Type declarations have the same name.
**Examples**: `C#`, `Java`, `Rust`, `Swift`, `F#`.
Nominal is a subset of structural.

See [link](https://web.archive.org/web/20161013053206/http://c2.com/cgi/wiki?NominativeAndStructuralTyping)

## Types of polymorphism

1. Subtyping

Relation between types. Common for OOP languages, where it is referred to as **interface inheritance**. Not to be confused with inheritance, which is a relation between implementations.

"Substitute" relationship, subtypes/supertype.

**Examples**: `C#`, `Java`, `F#` (wtf)

No support in `OCaml` due to the module systems and type signatures for modules.

2. Parametric polymorphism (generics)

3. Row polymorphism

`OCaml` objects - polymorphic records.

See [this](https://stackoverflow.com/questions/48092739/what-are-row-types-are-they-algebraic-data-types) SO answer.

4. Ad-hoc polymorphism

https://medium.com/@pmbanka/polymorphwhat-e3b36bbb2f99
