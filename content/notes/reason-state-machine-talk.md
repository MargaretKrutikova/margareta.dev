# A road to state machines

Hello everyone! My name is Margarita and this is my first talk at a remote meetup, so it feels a bit different to have the audience so far away, so please feel free to ask any questions any time in chat, so we can have some interactions during the talk.

I called this one a road to state machines and what I want to do here is to explain the concept of state machine applied to state modelling on a practical example. We will try to implement a little feature together.

The road symbolizes that we are going on a trip, where we will start by implementing the feature in a simple naive way (which we are going to see will prove buggy), so we will have hinders on the way, but we will make a stop, analyze the hinders, change the course and finally arrive at a much more robust and safe solution with state machine, marking the destination point of the trip.

## Me

## Before we start

This talk started with an article I wrote a couple of weeks ago on modelling domain with state machines in ReasonML. Assumes some basic knowledge of ReasonML variants

## Short intro

## Agenda

## Machine

In its essence a state machine is a mathematical concept which became a design pattern in software development. As many useful mathematical concepts from category theory are heavily used in functional programming, so as state machine is not an exception and is widely used for domain modelling.

What do we mean by modelling domain?
Representing data and behavior (business rules) of a concrete area in code with types, functions etc.

So we will have a domain for our feature and implement the data and behavior.

## A ROAD TO STATE MACHINE

In the feature we are going to implement, our domain is going to be simply USER.

We have a website, where people can browse our products and one page in particular where users can ask questions about the products. We are going to have some tricky requirements when it comes to users posting questions.

### 1

The first thing is we need to know whether the user is logged in.
Then we realize we have to add data for the logged in user, so we use `option`, since this is how you represent data that might be present, might be not.

### 2

Implement some functions working on the user type. We will call those functions in response to user input - like clicking on a log-in/log-out buttons.

### 3

Implement our post-question feature using pattern match on tuple. Taking into account the requirement about users with temporary names.

Now when we think we are done approaching the destination, but suddenly it feels so far away and eventually fades away.

We get a bunch of support questions instead from angry and confused people. Hinders start appearing on our path...

We could fix this by adding more if-checks and pattern matching on our flags and options.
But we can do better.

### 4

What went wrong?

With our user type we allow many invalid combinations of state, while essentially there can only be one state at a time, since those states are mutually incompatible.

Because our states are implicit (modelled with flags and options), it is difficult to keep track of what properties belong to the same state and have to be updated together.

it leads to buggy code, because it is easy to miss to update/synchronize some properties that belong to one state. The same applies to the behavior of our user - as we saw in `postQuestion` function. We didn't take into account those dependent properties and it became buggy.

Our user inputs (such as user pressing on log in/log out or setting temporary user name) are also implicit. It is difficult to see the connection between the states and the inputs, but it clearly exists: when you press on log in your state should change to log in if you are not already logged in, if you are logged in and press on log out, you should be logged out...

We are getting on the right track here. And we have realized that we need to make states and inputs explicit.

### 5

Let's explicitly define our state and our inputs.

For the input type we are also using a DU explicitly marking what inputs are going to trigger changes in our state.

We have already noticed that input in combination with the current state will determine the next state.
Let's call this function transition, since it will transition us from the current state to the next one when we detect user input.

This is where we can define the behavior of our user model and how it responds to the external input.

Here we need to take into account all possible combinations of states and inputs that can occur in our system. Not all of them are going to be valid (like trying to set a temporary name while being logged-in).

It might feel overwhelming to think through all of those combinations, so a good solution here would be to create a table and write them down, or visualize with a simple diagram.

### 6 Visualizing

Click through and explore the behavior of your system.

### 7 Transition

The important part here is pattern matching on the state first, not on the event, since the state machine pattern emphasizes state and it should make the primary decisions.

When we are in an invalid transition, we simply return our current state.

Notice how we include all possible transitions explicitly, without using the underscore wildcard to handle default case, which in general should be avoided.

The biggest benefit it gives us, is compiler warnings when non-exhaustive pattern matching is detected - simply when we forget to handle a state or input. This helps to account for all edge cases, plus we will be really thankful when we extend our user and add a state or an input, we will immediately see what cases we are not handling.

### 8

If we are writing a React application, we can plug in our transition function as-is in `useReducer` hook to manage component's state.

### 9

Use state and pattern matching in UI to give the user some hints when posting questions.

So we have arrived at the final destination, station "state machine"

Maybe this example seems really contrived, and some of you think that it was clear from the start that the data model was wrong. However, in a more complex state, where you already have a lot of logic going on, and need to add a small feature, it is easy to miss the big picture and go with a boolean flag, creating a couple of implicit states, which eventually might lead to bugs.

## Benefits

By handling all combinations of states and inputs you are also handling all edge cases,
moreover you start understanding the domain better, and might be able to discover mistakes or omissions in the specification early in the development process, which might divert failure of the whole project if it happened later in the process.

You become more structured and organized because there is a clear path.
A lot of benefits for us as developers.
