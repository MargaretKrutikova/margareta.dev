---
title: Modelling remote data in ReasonReact
published: true
description: Avoid invalid states and create reusable abstractions when modelling remote data in ReasonReact
tags: [reasonml, react]
date: 2019-05-23T12:00:59.831Z
category: blog-post
---

Let's look at a very common way of modelling state for api data in a react app with `Typescript`. You have an `isLoading` flag, the actual `data` and an `error` property in case something goes wrong:

```typescript
type State = {
  isLoading: boolean
  data: Data | null
  error: string | null
}
```

This structure is easy to work with, but is far from perfect, since it allows to represent invalid states and can be error-prone when rendering the UI parts for a particular state (a bunch of `if`s in the `render` function).

An example of such an error is setting initial data to an empty array of, let's say notifications, and forgetting to hide it while loading the actual notifications. This results in "you have no notifications" message, while it should show "loading notifications". This example is described in details in this great article [How Elm Slays a UI Antipattern](http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html).

When writing `reason`, the language gives us a solid type system which allows to model remote data in a better way by using variants and pattern matching. With a proper data model, the language will also force us to give the user correct feedback for each possible state.

In this article I want to show a way to model state for api data, while avoiding invalid states. I will show how to use the library [`remotedata-re`](https://github.com/lrosa007/remotedata-re), and finally how to create our own abstraction over it to reuse it in different parts of the application.

---

## Remote data states

The examples I am going to show to explain the concepts of remote data, are from a mini app I built - an advice generator with the api at [api.adviceslip.com](https://api.adviceslip.com/advice).

Now you might think, this sounds silly :) But it was actually fun to play with the app, and some pieces of advice were really enlightening, like these ones:

> - Enjoy a little nonsense now and then.
> - You don't need to floss all of your teeth. Only the ones you want to keep.

The source code for the app is in [this repo](https://github.com/MargaretKrutikova/advice-app-re) on my github. In the app the user can search for advice by typing into a search input, which calls the api when the user presses `Enter` and displays a list of hits.

When making api calls, we are interested in the following states:

- I don't have any data to show and haven't made an api call yet,
- I don't have any data yet, but I have sent an api call and waiting for response (`loading`),
- I have received an error from the server,
- I have received some data and can render it,
- I am re-fetching the data, (`loading` but showing the old data to prevent content blinking).

## Modelling states with a variant

So we want to express those states and we start with a [variant](https://reasonml.github.io/docs/en/variant). The search api response and the search result could look like this:

```ocaml
type searchResponse = {
  total_results: int,
  items: string,
};

type searchResult =
  | NotAsked
  | Loading(option(searchResponse))
  | Failure(string)
  | Success(searchResponse)
```

Here we have constrained the data type to be only in one of these states: loading with possible data of `searchResponse`, failure with a `string` and success with data of `searchResponse`.

Note how loading state can also hold data, which is going to be empty before the first search, but will have the previous search result on any subsequent search.

If loading state doesn't carry any information, next time we search the current search result will disappear before the next response comes back. In some scenarios that might be okay or even useful (to prevent showing stale data e.g.), but in this case we don't want the screen jumping unnecessarily in between the calls.

## Using `RemoteData`

In order to reuse the above data structure, we could make it polymorphic and add a type parameter:

```ocaml
type apiData(a') =
  | NotAsked
  | Loading(option(a'))
  | Failure(string)
  | Success(a')
```

Now we can create our type like `type searchResult = apiData(searchResponse)`.

But there is already a small and handy library called [remotedata-re](https://github.com/lrosa007/remotedata-re) with a similar data type. The library also comes with a couple utility functions for working with this data structure. The type defined in `RemoteData` looks very similar to our own `webData`:

```ocaml
type t('a, 'p, 'e) =
  | NotAsked
  | Loading('p)
  | Failure('e)
  | Success('a);
```

Using this structure, we can redefine `searchResult`, and model our state like this:

```ocaml
type state = {
  searchResult: RemoteData.t(searchResponse, option(searchResponse), string),
};

let initialState = {searchResult: RemoteData.NotAsked};
```

## Transition between states

In order to transition between the states when making api calls, we need to define actions that will bear the information about the transition, and a reducer that will respond to those actions.

Here is how it might look:

```ocaml
type action =
  | SearchLoading
  | SearchError(string)
  | SearchSuccess(searchResponse);

let reducer = (state, action) => {
  switch (action) {
  | SearchLoading => {
      ...state,
      searchResult: RemoteData.(Loading(
          state.searchResult |> map(d => Some(d)) |> withDefault(None),
        )),
    }
  | SearchError(error) => {...state, searchResult: RemoteData.Failure(error)}
  | SearchSuccess(result) => {...state, searchResult: RemoteData.Success(result)}
  };
};
```

When processing the loading state, I am using helper functions `RemoteData.map` to apply the function `(d => Some(d))` to the underlying data if `searchResult` is `Success`, and `RemoteData.withDefault` to "unwrap" the data from state `Success`, or give back `None` otherwise.

`RemoteData.(...)` opens the module locally and allows to refer to the module values inside the scope without prefixing them with `RemoteData`.

## Custom remote data type

Usually a bigger app with several pages will need to perform different api calls at different points of time. So do we have to repeat that monster-block of code in our reducer when handling `Loading`, `Error` and `Success` cases?

I wanted to avoid doing so and, as an experiment, created a small abstraction over that piece of logic in a module called `WebData` (name borrowed from an elm package `elm-web-data`):

```ocaml
type t('a) = RemoteData.t('a, option('a), string);

type apiAction('a) =
  | RequestLoading
  | RequestError(string)
  | RequestSuccess('a);

let toLoading = (data: t('a)): t('a) =>
  RemoteData.(Loading(data |> map(d => Some(d)) |> withDefault(None)));

let updateWebData = (data: t('a), action: apiAction('a)): t('a) => {
  switch (action) {
  | RequestLoading => data |> toLoading
  | RequestError(error) => RemoteData.Failure(error)
  | RequestSuccess(response) => RemoteData.Success(response)
  };
};
```

Here I define a polymorphic type that already has `option('a)` as `Loading` state. I am also including an action type for transitioning between the states and a helper function to handle the actual transitions.

Now we can modify the above code for search result like this:

```ocaml
type state = {searchResult: WebData.t(searchResponse)};

type action =
  | SearchRequest(WebData.apiAction(searchResponse));

let reducer = (state, action) => {
  switch (action) {
  | SearchRequest(searchAction) => {
      searchResult: WebData.updateWebData(state.searchResult, searchAction),
    }
  };
};
```

This looks much cleaner! I am wrapping the api action for search result in a more specific variant `SearchRequest`. Then when pattern matching over it, I can extract the underlying api action and pass it into the function `updateWebData`, which gives back the new state for `searchResult`.

This pattern was inspired by The Elm Architecture, where you can create a module that owns its own state and exposes its update function and message. When the module is plugged into the main program, its message is wrapped into a new constructor that is part of the global message, the global update function can then unwrap it and call the update function of that module with the underlying message that the module understands.

In the advice generator app, the `WebData` module is reused for both fetching search results and generating random advice, you can check the implementation [here](https://github.com/MargaretKrutikova/advice-app-re/tree/master/src).

## Render remote data

Let's see how we can pattern match all the possible states of our `state.searchResult` and give the user correct feedback for each case:

```ocaml
{switch (state.searchResult) {
  | NotAsked =>
    <Message type_=Information text="You haven't searched yet!" />
  | Loading(None) => <Spinner />
  | Success(data) => <SearchResult data />
  | Loading(Some(data)) => <> <Spinner /> <SearchResult data /> </>
  | Failure(err) => <Message type_=Error text=err />
  }}
```

Here `Message`, `Spinner` and `SearchResult` are components I defined in the app (source code [here](https://github.com/MargaretKrutikova/advice-app-re/tree/master/src)).

There is a bit of duplication going on here. `Success` and `Loading` with `Some(data)` both use `SearchResult` to render that data, but the actual rendering logic could be more complicated, so we might want to handle it in one case to avoid this duplication:

```ocaml
{switch (state.searchResult) {
  | NotAsked =>
    <Message type_=Information text="You haven't searched yet!" />
  | Loading(None) => <Spinner show=true />
  | (Success(data) | Loading(Some(data))) as searchState =>
    <>
      <Spinner show={RemoteData.isLoading(searchState)} />
      <SearchResult data />
    </>
  | Failure(err) => <Message type_=Error text=err />
  }}
```

There can be different ways to render `RemoteData` or `WebData` with pattern matching and using helper functions from `remotedata-re`, and they will most likely vary with different UI requirements (e.g. placement of the spinner, disabling other elements on the page while loading etc.).

## Conclusion

The key points are:

- using variants to model remote data in `ReasonMl` helps to avoid invalid states,
- each constructor in the variant represents a particular state of an api call and can carry extra information (like `Success` state with api data),
- `remotedata-re` is a handy package that already implements a remote data type and exposes functions for working with it,
- you can create your own reusable abstractions to help manage api data throughout your application,
- rendering remote data involves pattern matching directly in your `jsx` and the implementation might vary depending on the UI.

What patterns have you found useful when working with remote data in reason? Curious to hear about your experience and appreciate sharing it in the comments :)
