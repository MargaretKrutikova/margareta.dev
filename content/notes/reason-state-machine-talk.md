---
path: road-to-state-machines
date: 2020-05-18T23:29:59.831Z
title: A road to state machines
category: blog-post
tags: []
published: true
---

I called this one a road to state machines and what I want to do here is to explain the concept of state machine applied to state modelling on a practical example, where we will try to implement a little feature together.

The road symbolizes that we are going on a trip (call it a road trip if you'd like), where we will start by implementing the feature in a simple naive way (which we are going to see will prove buggy), so we will have hinders on the way, but we will make a stop, analyze the hinders, change the course and finally arrive at a much more robust and safe solution with state machine, marking the destination point of the trip.

## Before we start

The article assumes some basic knowledge of functional concepts, such variants (or discriminated unions in other languages), pattern matching and pure functions/immutability. The examples are written in ReasonML, but it should be quite easy to apply them in other languages since the concepts are going to be similar everywhere.

This is going to be a beginner introduction to state machines, so if you are already an experienced user of state machines, you might not discover anything new for yourself, but I hope it will still be a fun read.

## Agenda

A few words about state machine
Pack your bag, we are driving out
State machine recap
Benefits
Recognizing state machines

## Machine

In its essence a state machine is a mathematical concept which became a design pattern in software development. As many useful mathematical concepts from category theory are heavily used in functional programming, so as state machine is not an exception and is widely used for domain modelling.

What do we mean by modelling domain? Think about it as representing data and behavior (business rules) of a concrete area in code with types, functions etc.

So during our little journey we will have a domain for our feature and we will implement the data and behavior to describe the domain.

## Road trip begins

In the feature we are going to implement, our domain is going to be simply **user**. Let's imagine that we have a website, where people can browse our products and one page in particular where users can ask questions about the products. We are going to have some tricky requirements when it comes to users posting questions.

### #1 Model domain data

The first thing is we need to know whether the user is logged-in, which we will simply model with a `boolean` flag `isLoggedIn`:

```reason
type user = {
  isLoggedIn: bool,
};

```

Then we realize we have to add data for the logged-in user, so that we can identify the user by its email and username in the app. Since this data might or might not be present, we decide to use `option`, because this seems like a nice way to model this type of information in a functional way (it is, but not in this case as we will see later...).

```reason
type userData = {
  userName: string,
  email: string,
};

type user = {
  isLoggedIn: bool,
  userData: option(userData),
};
```

Okay, almost done. There is one tricky requirement left to model in our user type. We want to allow even non-registered users to post questions to get more people interested in our products. For this we will have users choose a temporary name for themselves which we will use when they post questions as their author name. And again we will model it as an `option`:

```reason
type user = {
  isLoggedIn: bool,
  userData: option(userData),
  tempUserName: option(string),
};
```

### #2 Model domain behavior

Next step is to implement some functions working on the domain data of type `user`. Those functions will update the user object immutably by creating a new user. We need to handle the events when the user sets his temporary name, successfully logs in or logs out:

```reason
let setTempUserName = (tempUserName, user) =>
  {...user, tempUserName: Some(tempUserName)};

let logIn = (userData, user) => {
  ...user,
  isLoggedIn: true,
  userData: Some(userData),
};

let logOut = user => {...user, isLoggedIn: false};
```

We will call those functions in response to user input - like clicking on a log-in/log-out buttons.

### #3 Model core feature

And finally we are ready to implement our core feature for posting questions. Taking into account the requirement about users with temporary names and logged-in users, here is how we can do it quickly:

```reason
let postQuestion = (question, user) => {
  let authorName =
    switch (user.tempUserName, user.userData) {
    | (Some(tempName), _) => tempName
    | (_, Some(userData)) => userData.userName
    | _ => failwith("You can't post questions!")
    };

  post(question, authorName)
};
```

Now when we think we are done with our journey and approaching the destination, it suddenly it feels so far away and eventually fades away. Instead of curious users asking questions about our products, we get a bunch of support questions from angry and confused people. Bumps appear everywhere in the road and it gets rough...

An angry user writes:

> What, I just set temporary name while being logged-in by mistake! Now I am stuck with it! 😠

If we check our `setTempUserName` function closer we will notice that we allow to set the temporary name while being logged-in, which was exactly what the user did. And the `postQuestion` gives preference to the temp name ignoring what is already present in the logged-in user's data.

> Wait, I logged in, why does it show my temporary name? 🤨

This one is from a confused user who sees his temporary name even after he has logged in. And again, if we go back and check the `logIn` function we will notice that we forgot to clear the temporary username after the user logs in, and it is the one that is preferred when posting questions. Ooops...

And finally, one user thinks he has hacked our system and is really happy about it:

> Haha, I logged out and could still post with my user name! 😆

He is asking about how much our bug bounty will pay him. Well funny enough, we just forgot to reset `userData` in our `logOut` function. Just look at it yourself:

```reason
let logOut = user => {...user, isLoggedIn: false};
```

Damn, that's a lot of bugs... We could fix them by being more careful and adding more if-checks and pattern matching on our flags and options, not forgetting to clear out some stale data, assign `None` to all the options when needed... but that sounds not only boring but plain wrong. We can do better.

### #4 What went wrong

Let's first analyze why we have been having such a bumpy ride so far.

With our user type we allow many invalid combinations of state, like there is nothing here preventing from accidentally setting `isLoggedIn` to `true` and at the same time `tempUserName` being present and `userData` being `None`. That doesn't make sense for our domain, but the possibility is still there, just look at the type:

```reason
type user = {
  isLoggedIn: bool,
  userData: option(userData),
  tempUserName: option(string),
};
```

While essentially there can only be one state at a time - the user is anonymous OR temporary OR logged-in - and those states are mutually incompatible.

Because we have modelled our states implicitly (with flags and options), it became difficult to keep track of what properties belong to the same state and which of them and when have to be updated together.

The same applies to the behavior of our user - as we saw in `postQuestion` function. We didn't take into account those dependent properties when fetching the author's name.

Next, our user inputs (such as user pressing on log in/log out or setting temporary user name) are also implicit. It is difficult to see the connection between the states and the inputs, but it clearly exists: you press on log-in - your state should change to logged-in, you press on log out, you should be logged out...

We are getting on the right track here. And we have realized that to get to our destination we need to re-implement our domain properly by first making our states and inputs **explicit**.

### #4 Making state and input explicit

Let's explicitly define our state and inputs:

```reason
type user =
  | Anonymous
  | TemporaryUser(string)
  | LoggedInUser(userData)

type userInput =
  | SetTemporaryName(string)
  | LogIn(userData)
  | LogOut;
```

It became clear that the state should modelled as a variant (discriminated union). For the input type we are also using a variant explicitly marking what inputs are going to trigger changes in our state.

### #5 Transition function

We have already noticed that input in combination with the current state will determine the next state. Let's encode this behavior in a function, which we will **transition** function, since it will transition us from the current state to the next one when we detect user input. This is where we define the behavior of our user model and how it responds to the external input.

> nextState = transition (currentState, input)

Here we need to take into account all possible combinations of states and inputs that can occur in our system. The number of such combinations is `states * inputs`.

Not all of them are going to be valid (like trying to set a temporary name while being logged-in), but we do need to handle all of them since as we have already seen, **it is dangerous to assume your users are going to use the system the same way you do when you test your code**.

At first, it might feel overwhelming to think through all those combinations, so we could create a table for states and inputs and write down outcomes for those combinations, or we can visualize our state machine with an online tool, created as part of [`xstate`](https://github.com/davidkpiano/xstate), a library for implementing state machines in `typescript` projects.

### #6 Visualizing

We start in some initial state, that makes sense for our domain. In our case it makes sense for the user to start in `Anonymous` state. After that, we can start triggering some events to transition into other states.

Click through and explore the behavior of your system.

### #7 Implementing transitions

Our transition function will handle four valid transitions, while the other 5 are going to be invalid, in which case the function will just return the current state:

```reason
let transition = (user, input) => {
  switch (user) {
  | Anonymous =>
    switch (input) {
    | SetTemporaryName(name) => TemporaryUser(name)
    | LogIn(data) => LoggedInUser(data)
    | LogOut => user
    }
  | TemporaryUser(_) =>
    switch (input) {
    | LogIn(data) => LoggedInUser(data)
    | SetTemporaryName(_) | LogOut => user
    }
  | LoggedInUser(_) => ...
  };
};
```

The important part here is pattern matching on the state first, and not on the input, since the state machine pattern emphasizes state and it is the state that should make the primary decisions. This is different from a `reducer` pattern, where you pattern match on the action (~input), changing your state accordingly. I sometimes think of `reducer` as a half state machine.

Notice how we include all possible transitions explicitly, without using the underscore wildcard to handle the default case. The biggest benefit we get from doing so, is compiler warnings when **non-exhaustive pattern matching** is detected - simply when we forget to handle a case. This helps to account for all edge cases, plus we when we extend our user and add a state or an input, we will immediately see what cases we are not handling.

While it is tempting to use `_` for all default cases and might save you a few lines of code, should be avoided in most cases.

### #8 Use as reducer

If we are writing a React application, we can plug in our transition function as-is in `useReducer` hook to manage our component's state:

```reason
[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(transition, Anonymous);

  <button onClick={_ => dispatch(LogOut)}>
    {React.string("Log out")}
  </button>;
};
```

Isn't it beautiful?

### #9 Use in UI

And the last example is how to use our state and pattern matching in a `react` component. Let's give the user some hints on whether he can post questions:

```reason
<div>
  {(switch (state) {
    | Anonymous => "You can't post questions."
    | TemporaryUser(userName) =>
      "Post with your temporary name: " ++ userName
    | LoggedInUser({userName}) =>
      "Post with your user name:" ++ userName
  }) |> React.string}
</div>;
```

---

So we have arrived at the final destination, station "state machine".

Maybe this example seemed really contrived to you, and maybe you think that it was clear from the start that the data model was wrong. However, in a more complex state, where you already have a lot of logic going on, and need to add a small feature, it is easy to miss the big picture and go with a `boolean` flag, creating a couple of implicit states, which eventually might lead to bugs similar to what we have seen in our little feature.

## Recap

State machine in a nutshell:

- State - variant (discriminated union)
- Only one state at a time
- Start in some initial state
- Input (event) - variant (DU)
- Transition - new state from current state + input

Some useful observations:

- It is just a design pattern (no lib required)
- Can be introduced just in a small part of your app
- Can be used in any language/environment
- Better support in functional languages
  - Variants/pattern matching
  - Compiler warnings - exhaustive match

## Benefits

- Protection against invalid states
- Protect against invalid state transitions
- Account for all edge cases (trivial...)
- Better understand the domain
- Discover potential problems in spec of business rules
- IT IS EASY - follow the pattern, focus on the behaviour
- Fun to visualize

By handling all combinations of states and inputs you are also handling all edge cases,
moreover you start understanding the domain better, and might be able to discover mistakes or omissions in the specification early in the development process, which might divert failure of the whole project if it happened later in the process.

You become more structured and organized because there is a clear path.
Overall, I see a lot of benefits not only for the users of our less buggy systems, but also for us, developers.

## Use cases

Boolean flags
isValid, isLoading, isError,
Options
error, validResponse etc.
A flood of If-checks

```reason
type apiRequest('t) = {
  isLoading: bool,
  data: option('t),
  error: option(string),
};
```
