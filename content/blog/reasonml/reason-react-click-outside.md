---
title: Detect click outside in ReasonReact with hooks
published: true
description: Implementing a custom hook to determine click outside of an element using the DOM API and a couple of built-in hooks
tags: [reasonml, react]
date: 2019-04-29T12:00:59.831Z
category: blog-post
---

Working on a `reason-react` application is an absolute delight. The language is perfectly suitable for writing the application's logic with reducers, especially with the latest version of `ReasonReact` with simpler and more concise syntax for writing components with hooks.

But when you need to do DOM manipulations, use `refs` on DOM elements, attach some event handlers or work with event objects, it gets less pleasant. There are not many resources available, it is difficult to get the types right and compiler errors are sometimes not very helpful.

In this article I want to show how to do all of the above without pain, while solving a very common problem: detecting a click outside of a DOM element.

The end result will be a `useClickOutside` hook, which takes in a function to run when a click is detected outside of an element, and returns a `ref` that you need to attach to that element. The source code is in [my github repo](https://github.com/MargaretKrutikova/use-click-outside-re) with an example usage of the hook, so feel free to check it out directly if you just need a working solution.

# Use case

There are quite a few reasons why you might want to detect clicks outside of an element. The most common is to hide an element when the user clicks outside of its area, like closing a modal, a dropdown, a notification etc. So here is a straight forward solution:

1. Listen to the `onmousedown` event on the document,
2. In the event handler get the element that dispatched the event (event target),
3. Check whether the target element is a descendant of the main element that needs to react on click outside using [`Node.contains`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains),
4. Call the function if it is not within the main element.

# Implementation

I am using the latest `ReasonReact` version (>= 0.7.0) that allows using hooks, if you haven't used them already in `ReasonReact`, I highly recommend checking out this [article](https://dev.to/iwilsonq/reasonml-with-react-hooks-tutorial-building-a-pomodoro-timer-57h0).

For the implementation we will use [`bs-webapi`](https://github.com/reasonml-community/bs-webapi-incubator) with `reason` bindings to the DOM API and a couple of react hooks (`useRef` and `useEffect`).

So let's embrace the `OCaml` type system and dive right into the implementation.

## Add dependencies

Install `bs-webapi`:

```shell
npm install bs-webapi --save
```

and add it to the dependencies in `bsconfig.json`:

```json
"bs-dependencies": ["reason-react", "bs-webapi"]
```

## Add event listener in useEffect

Let's start implementing the `useClickOutside` hook by adding a mousedown event listener in `useEffect`:

```ocaml
open Webapi.Dom;

let useClickOutside = (onClickOutside: Dom.mouseEvent => unit) => {
  let handleMouseDown = (_) => ();

  React.useEffect0(() => {
    Document.addMouseDownEventListener(handleMouseDown, document);
    // cleanup - unsubscribe on unmount.
    Some(
      () => Document.removeMouseDownEventListener(handleMouseDown, document),
    );
  });
}
```

Here `Document.addMouseDownEventListener` and `document` come from `Webapi.Dom`.

We start listening to the `mousedown` event on the `document` inside `useEffect` hook. `useEffect0` means it has no dependencies and thus only runs once after the component is rendered the first time.

In order to unsubscribe from the event, we can return a "cleanup" function from the effect. In `ReasonReact` the type signature of the function in `useEffect` is `(unit => option(unit => unit))`, so we need to wrap our cleanup function in `Some`.

## Working with refs

Now we define the `handleMouseDown` function, which also needs to access a `ref` to the main element which lets us determine the `outside` area:

```ocaml
let elementRef = React.useRef(Js.Nullable.null);

let handleClickOutside = (elRef, e, fn) => ();

let handleMouseDown = (e: Dom.mouseEvent) => {
  elementRef
  ->React.Ref.current
  ->Js.Nullable.toOption
  ->Belt.Option.map(refValue =>
      handleClickOutside(refValue, e, onClickOutside)
    )
  ->ignore;
};
```

This looks cryptic ... What we are doing here:

- define a `ref` with `useRef`, initialise it with `null`,
- access the underline value of the reference with `React.Ref.current` and convert it to option,
- use `Belt.Option.map` to run `handleClickOutside` only if the ref value is `Some` and return the result wrapped in `Some`, otherwise `None`,
- `ignore` to disregard the result returned from `Belt.Option.map`.

I am using the fast pipe `->` here to apply an expression as the first argument to the functions. [Here](https://dev.to/splodingsocks/a-quick-explanation-about---and--in-reasonml-5329) is a great article explaining how the fast pipe works if you are curious.

There is more info on working with refs in [reason-react docs](https://reasonml.github.io/reason-react/docs/en/refs).

## Check if element is outside

Great, almost done! Now we need to implement `handleClickOutside` that will actually determine whether to call our custom function or not:

```ocaml
let handleClickOutside = (domElement: Dom.element, e: Dom.mouseEvent, fn) => {
  let targetElement = MouseEvent.target(e) |> EventTarget.unsafeAsElement;

  !(domElement |> Element.contains(targetElement)) ? fn(e) : ();
};
```

Here `domElement` will determine the inside/outside boundary. It is important to mention that the mouse event in this case is not a react event (a.k.a. `Synthetic` event), since we manually attached our callback to the document. In case of react mouse event you would use `ReactEvent.Mouse.t`, in our case however we use `Dom.mouseEvent`.

We will use `Element.contains` to check whether the target element is a descendant of the `domElement`. But here is a problem. This function takes in two parameters of type `Element`, but the target element is of type `EventTarget`, which strictly speaking, is not always an element and could for example be of type `XMLHttpRequest` ([mdn docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)).

However, since we attached the event handler to a DOM element we know for sure it is an element and can use `EventTarget.unsafeAsElement` to convert it to one.

Here is the [link](https://github.com/MargaretKrutikova/use-click-outside-re/blob/master/src/ClickOutside.re) with the complete code of `useClickOutside` hook.

## Example usage

Here is how the hook can be used in the wild:

```ocaml
open ClickOutside;

[@react.component]
let make = () => {
  let handleClickOutside = _ => {
    Js.log("Click outside detected");
  };
  let divRef = useClickOutside(handleClickOutside);

  <div ref={ReactDOMRe.Ref.domRef(divRef)} />;
};
```

I have created a simple dropdown component to show a real use-case scenario, source code on [github](https://github.com/MargaretKrutikova/use-click-outside-re/blob/master/src/Dropdown.re).

---

I hope this article can help beyond this specific case of detecting click outside by providing some helpful tips and explanations when it comes to working with the DOM API.

Have you found anything that helped you? Or are you having trouble with DOM manipulations and refs while solving your particular case? Let me know by leaving a comment and we will figure it out :)
