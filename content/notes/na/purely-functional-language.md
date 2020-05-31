---
path: Purely functional language
date: 2020-05-31T19:15:51.591Z
category: notes
title: Purely functional language
description: Definition of a purely functional language
language: NA
tags:
  - functional
  - pure
  - definition
---
What is a "purely functional" programming language?

> This question has been the subject of some debate in the functional programming community. It is widely agreed that languages such as Haskell and Miranda are "purely functional", while SML and Scheme are not. However, there are some small differences of opinion about the precise technical motivation for this distinction. One definition that has been suggested is as follows:
>
> The term "purely functional" is often used to describe languages that perform all their computations via function application. This is in contrast to languages, such as Scheme and Standard ML, that are predominantly functional but also allow `side effects' (computational effects caused by expression evaluation that persist after the evaluation is completed).
>
> Sometimes, the term "purely functional" is also used in a broader sense to mean languages that might incorporate computational effects, but without altering the notion of \`function' (as evidenced by the fact that the essential properties of functions are preserved.) Typically, the evaluation of an expression can yield a \`task', which is then executed separately to cause computational effects. The evaluation and execution phases are separated in such a way that the evaluation phase does not compromise the standard properties of expressions and functions. The input/output mechanisms of Haskell, for example, are of this kind.

Taken from [FAQ University of Nottigham](http://www.cs.nott.ac.uk/~pszgmh/faq.html#purity).