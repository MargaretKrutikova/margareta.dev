---
path: fear of frontend
date: 2020-05-14T20:20:21.800Z
category: blog-post
title: "I dread working with frontend "
published: false
description: I have felt it for quite some time now, it is finally time to admit
  it - I am scared to work with frontend
---
**\*Warning/Disclaimer**. There is a lot of rant in this post, it might include swear words or inappropriate content and is not recommended if the reader is in a good mood or is in general a very positive person with hope for the future. The reader's mood is at risk to be destroyed. This is my way of coping with downsides. Please, continue at your own risk. I am not blaming OSS or maintainers, this is merely a story of a bug I encountered at my job and how I battled it.*

A few days after a code freeze before the next big release there comes a performance regression issue. In Frontend. In IE 11. Oh my ... Having mixed feelings between absolute endless fear of not being able to solve it in time and a little bit of curiosity, I start digging. 

One of the pages in our huge product takes 20 seconds to load in IE11. The funny part is that the page freezes, the loading indicator that is supposed to indicate to the user "Be patient, I am loading some initial data for you here!" freezes for 20 seconds. Wtf... 

The api call for the initial data takes less than a second. It fetches an enormous list of 10,000 items, data specifically designed for stress testing. But it is not the api call causing the slowness, it is something that happens after it that makes the whole page freeze. Crazy. 

With the help of my brilliant colleagues after some time spent in  chrome devtools profiler we realize that it is our json decoder that runs for 19 seconds while decoding 10,000 items. We ensure type safety of the api responses by decoding them in runtime and throwing exceptions if it fails. This makes sure the data is not corrupt in any way.

So it sounds sick that it would take so much time to run through an array of 10,000 items making sure the 4 fields they have are of the correct type. Looking closer at the decoder I notice that it uses array `map` and `reduce` and spreads the array to immutably reduce it into one value with `[...acc, item]`. I am a big proponent of immutability and functional style, so I don't complain at such code, but the profiler shows that this exact operation is taking 98% of the time... Wtf

The decoding library hasn't been updated in 2 years. Again, me and some big brains from my department make a wild guess that it has something to do with polyfills we have to use to support the retarded browsers. Fortunately the previous release doesn't have this issue, so I make a big fat diff between the two commits and check what changed in our `package.json` hoping someone had updated our polyfills. 

And there is nothing. No changes. The hope I had a minute ago fades away, I close my eyes and dream about a long afternoon nap, it is getting late, would be nice to go home ....

In despair, I start git bisect between the two commits. Something must have changed with those bloody polyfills. There are a lot of commits, each time I need to do `npm i` and run the whole thing to check whether the bug is there. Again, and again, damn! it is still fast ... Yes! Here comes the broken commit. Wait ... It is an updated version of our own `npm` repository, the header of application is not part of our monorepo and is developed separately. Great, so it is something with the polyflls there...

I am becoming really whiny and keep complaining to myself that I should already be at home. But no, polyfills are ruthless. I dive into the header repo and get a diff between the versions, and sure thing, there is an update in polyfills, we switched from our own build system to `create-react-app` and installed `react-app-polyfill` that upgraded `core-js` from v2 to v3. Ehm, so what you might think? How is that supposed to cause this mad house? Honestly, I don't know, I am dreaming of a power nap...

Don't believe me? See <https://github.com/zloirock/core-js/issues/677>, scroll all the way down to see a fresh comment directly from the witness of this madness (spoiler alert, it is me...). 

> it also affects `Array#{ filter, map }`:-(

This is madness my dear friends. No, I don't want to be frontend developer any more, I just want to enjoy my afternoon nap ...

- - -

I have seen developers who are scared to work with frontend, and I understand why - it is all new and they haven't seen much of it. I am the opposite - I feel like I have seen too much to have a reason to be scared. 
From implementing close on click outside and fighting some `npm` library with a component that uses `event.stopPropagation` and steels the click event so you can never ever be done with your little click-outside feature. Friends don't let friends stop propagating events! Especially if those friends are creating an `npm` library.

My fear originates from a complete uncertainty regardless of how much experience in Frontend you have. This new feature request to open the dropdown from an `npm` library on click on the small icon might take anywhere from an hour to weeks of dreadful headbang work. 