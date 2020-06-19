---
path: Algebraic effects
date: 2020-05-24T18:40:00.831Z
title: Algebraic effects
category: note
tags: [ocaml, functional]
published: true
description: Notes from the talk on algebraic effects at Reason Bangalore meetup
---

These are my notes I compiled from the talk on algebraic effects by [@ManasJayanth](https://twitter.com/ManasJayanth) at the second Reason Bangalore online meetup (see [tweet](https://twitter.com/ReasonBangalore/status/1264389380128440322)), on the 24th of May, 2020.

All the credit goes to Manas, his original presentation published as [gist](https://gist.github.com/prometheansacrifice/826705234de788d6235a8e4736ff7991).

---

## An alternative to promises and monads

We constantly declare functions and callbacks that must run after a certain operation is over.

In `OCaml` - `Lwt` monads, in `JS`: browser promise, generators.

Monads and promises return lifted or wrapped values that need special operations to be programmed to work on those values. This results in a divide in the codebase since you now have to treat the code in promises specially.

`Async`/`await` to the rescue! The code looks sequential, but the whole function has to be wrapped in `async`. It becomes a suspendable function, but it infects the whole codebase since all calling code has to become `async`, so the same language divide.

With algebraic effects (AE) we could minimize the language divide.

There is a **problem**: can’t cancel a promise - they are binary - only accept or reject. Promises force a binary fork in code, while AEs seem to overcome this limitation. But **HOW** do they do it? Will see later 😝

What do haskellers gain from AE? They use a lot of monads and have to transform values from one monad into another. Can't mix and match two different monadic values 😬 Haskellers won’t have to do these painful ceremonial transformations with AE.

## What is an algebraic effect

The key point - you declare a certain action that represents a certain operation (like read file, fetch call etc). And you say `perform action`. You declare an operation but the semantics and the meaning of the operation is declared elsewhere.

Syntactically AEs look like `try/catch` - non-sequential code execution, the execution jumps to the `catch` block.

To declare the semantics of the algebraic operations we wrap the code performing these effects in a `try/with` block). `Try/with` will emit certain effects. If we do error handling, we catch different error objects and we have to figure out what exact kind of error it is. In `JS` that would be `e instanceof RangeError` for example, here is a `javascript` example:

```javascript
const perform = () => {
  throw new RangeError("range invalid")
}

try {
  perform()
} catch (e) {
  if (e instanceof RangeError) {
    console.log("Range error occured: " + e.message)
  }
  if (e instanceof ReferenceError) {
    ...
  }
}
```

The same idea is reused with AE. The action is called `V` in the example below:

```ocaml
effect V : int

let rec sum_up () =
   perform V

let () =
  let v =
    try sum_up () with
    | effect V k ->
	   continue k 667
   in
   Printf.printf "Value received is %d\n" v
```

`sum_up` - is our main app logic which does a lot of concurrent operations, it just states at some point that it will perform effect `V`. In the main function, I define what `perform V` means "I have received an effect `V`, here is what do I do with it", which is an effect handler.

You will need to handle different effects depending on their type, like a `catch` block.
Every effect phrase will receive the effect with its value plus a special parameter `k` - single letter variable, commonly known as continuation in the FP world.

Every time you try to handle an effect, you figure out what effect it is and then appropriately try to take certain actions.

Once the action is over, you might end up with some value and you might want to pass that value down to the continuation, which is just a callback essentially, `k` is the callback.

`continue k 667` - triggering the callback with the value `667`. The entire expression evaluates to `667`, which is why `V` gets the value `667` and this value gets printed in the example.

When it comes to `ReasonML` - keywords for AE (like `perform`, `effect`), `reason` needs to take those sources and emit the right AST. It is a matter of porting those keywords to the reason parser.

## Understanding the effects

The next examples are taken from [ocaml-effects-tutorial](https://github.com/ocamllabs/ocaml-effects-tutorial).

The effects are code jumps. Without AE - the moment we encounter an error, we are forced to handle it and move on:

```ocaml
exception Conversion_failure of string

let int_of_string l =
  try int_of_string l with
  | Failure _ -> raise (Conversion_failure l)

let rec sum_up acc =
    let l = input_line stdin in
    acc := !acc + int_of_string l;
    sum_up acc

let _ =
  let r = ref 0 in
  try sum_up r with
  | End_of_file -> Printf.printf "Sum is %d\n" !r
  | Conversion_failure s ->
      Printf.fprintf stderr "Conversion failure \"%s\"\n%!" s
```

Every parsing operation can fail so we try to catch and handle it. Any time it fails, line `sum_up acc` is not triggered/ Without AE, statements after exceptions are not executed and the code execution jumps up to the nearest `catch` block.

With AE:

```ocaml
effect Conversion_failure : string -> int

let int_of_string l =
  try int_of_string l with
  | Failure _ -> perform (Conversion_failure l)

let rec sum_up acc =
    let l = input_line stdin in
    acc := !acc + int_of_string l;
    sum_up acc

let _ =
  let r = ref 0 in
  try sum_up r with
  | End_of_file -> Printf.printf "Sum is %d\n" !r
  | effect (Conversion_failure s) k ->
      Printf.fprintf stderr "Conversion failure \"%s\"\n%!" s;
      continue k 0
```

`int_of_string` is bound to fail on invalid input. When there is a failure, we say `perform something`.
What is `Conversion_failure`? AE is written with much wider use-cases, it can perform anything - not just concurrent operations, `perform` can be anything and it is your job to state what that `perform` operation supposed to do.

Whenever we encounter a parsing error, we ask the runtime to perform `Conversion_failure` effect. The moment `int_of_string` received an invalid value, it will perform the effect and the code will jump into the main function that handles the effect with the keyword `effect` - thats were the runtime knows what to do with the effect.

All we do there is return zero - trigger the continue-callback with the value zero, and the code execution will continue to `sum_up` even if the parsing fails. There is no crash.

The key idea - **AE is <mark>resumable exception</mark>** - the one most important take-away from the talk.

### What does the ability to resume exceptions have to do with concurrency?

AE jumps from one place to another, plus resumable exceptions, plus a better way to handle concurrency. But how is it related to concurrency?

See the fun [gist](https://gist.github.com/sebmarkbage/2c7acb6210266045050632ea611aebee) made by [Sebastian Markbåge](https://twitter.com/sebmarkbage) where he does some AE prototyping by throwing promises (you heard me right ...) in `JS`.

Concurrent logic becomes very simple, being able to jump from somewhere deep down in our codebase. If we have a top-level main function and a deep dense tree of calls - the ability to jump from deep inside that tree all the way up to the top and going back where we were, is what we can do with AE. That execution jump is what makes such APIs possible. **YAAAAY** AE is exciting 😅

## AE contexts

1. `OCaml`'s answer to impurity - allows inherent side effects for functions. `OCaml` will support imperative statements and still achieve purity in the language.

2. Async programming & concurrency

3. Writing schedulers

For applications we don't usually write custom schedulers. `perform` can do a lot of things since it is so generic and very useful in writing custom schedulers. That's why the multicore release of `OCaml` that will happen, will have AE baked in since multicore programs require a lot of scheduling of threads on multiple cores. AE will be exposed as a primitive.

4. Generators, async/await, coroutines, iterators - concurrency primitives - can be expressed in terms of AEs.

Why not implement `react`'s core algorithms with generators since generators are similar to AE and provide jump-mechanics - repeatedly yield values from the function and jump back and forth between two unrelated call trees. Hah? Mindbending control flow with generators. So what's the difference between generators and AE?

Generators are inherently stateful - call it a second time and it will correctly resume its execution from somewhere in the middle of the function. How does the runtime know where to resume it? The runtime knows since generators are stateful, that's why it is difficult to reuse them in different algorithms.

For AE the runtime doesn't need state, it tracks the call execution by identifying which effect was triggered as opposed to trying to keep track in memory in the runtime. Knows where to jump depending on **WHAT** effect was triggered.

## Reading list

Check the list of papers and articles recommended by Manas [here](https://gist.github.com/prometheansacrifice/826705234de788d6235a8e4736ff7991#reading).

What's especially interesting, research project - `Koka` language with typed AEs which compiles to JS 🤯
