---
path: fsharp-conf-2021
date: 2021-07-29T17:39:00.831Z
title: ".NET Conf: Focus on F#, July 29"
category: note
language: fsharp
tags: [fsharp, data-science, conf]
published: true
description:
---

https://focus.dotnetconf.net/agenda

# Data Science with F

- fsdocs
- FsLab for data science

![picture 1](./images/5cea1a6b3655f6bfddfbf48f5ee6e262a7253bda4d31463196976b1e0ea15051.png)

Model - some forecasting with ML
Transform data with F#, visualize the model etc.

Import data with FSharp.Data - multiple data sources.
Transformation with Deedle - data frame part, keeps the original data immutable and creates a new data frame.

Plotly.NET - visualizations.

FSharp.Stats - statistical testing, signal detection, ml etc.

![picture 2](./images/aa06b5c10cb391c6a1dfffc23e0f36f3141cc94730433094226dfbec23e152ef.png)

More: https://fslab.org

## Lab experiments

You need to keep track of as many parameters as possible because any of them can influence the experiment results: how much light, temperature, length of the day etc.

Goal: store digital structured metadata - swate, excel with office.js api. Using ontologies and not free text. Automatically adding machine readable information to the columns to perform metadata analysis on the structured metadata.

## Proteomics

Protein identification.

![picture 3](./images/8d9f00c7e47d567694344261d3e7ee64faadf0034428bd677c4441aaf2e5b7fc.png)

Computationally complex pipeline.
Galaxy project.

![picture 4](./images/764f24db8399a1df15df8ee47b7b9ff6d200f7b0139fe715a2f13e27fa934aca.png)

Conda tools.

Dotnet tools on galaxy.

# Data analytics and ML in F

@ljquintanilla

![picture 5](./images/056197c27c3e99e2315d6cff4518121c76d16526a10278ff7160243f2ca3fa91.png)

Modeling - training with different algorithms for the data set.
Model is deployed as a webservice. Later you need to go back and retrain the model.

![picture 6](./images/81fb0c85239282f8330a54727475e0c1474683a741338150d5010d7ae3d36ab2.png)

These tools are mostly Python oriented.
www.anaconda.com/state-of-data-science-2021

Dependencies in fsharp scripts: `#r "nuget:FSharp.Data"`

![picture 7](./images/399ee9837f7f555818b2ada3d453a590b73c88ecdad093ea2f30bab801f8b344.png)

.NET Apache Spark - .net bindings for spark
ML.NET - not only train but also use pre-trained models from other systems and make predictions. Interop with models from other frameworks.

TensorFlow.NET, ONNX

## End to end ML workflow

FsLab ML.NET Apache Spark

.NET notebook. Predict scores of the restaurant inspection.

1. Data preparation with Spark inside .net notebook
   Date frame - data in a tabular format
   Visualize with Plotly.NET
   Spark partitions data and processes it in batches.

2. Train model with ML and ML.AutoML
   AutoML with automatically search algorithms and types of params and provides guidance.
   Save serialized version of the model and load at a later step in api.
3. Evaluate
4. Deploy
   WebApi - register service called prediction engine pool - creates an object pool of prediction engine objects - makes it scalable.

List of resources for data science & ML with F#: https://www.theurlist.com/dotnet-conf-fsharp-ml
