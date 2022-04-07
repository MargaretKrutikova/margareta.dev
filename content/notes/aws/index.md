---
path: aws
date: 2022-04-07T11:30:00.831Z
title: AWS
category: note
tags: [aws, best-practice, devops]
published: true
description:
---

# Code best practice

A construct is a logical unit of the app.

- Not recommended to have multiple cdk apps in the same repository.
- Combine the code for the infra and runtime app into a single construct.
- Represent each logical unit as a construct, while each deployment unit as a stack.
- Do env variable lookup at the top level of an cdk app and pass them as props down.
- Avoid network lookups during synthesis
- Model production stages in code
- Write unit tests

# Application best practice

- Make decisions at synthesis time (don't use CloudFormation IF-constructs and Parameters)
- Use generated resource names and don't set custom names, see resources that support custom names https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html
- Configure removal policies and log retention (use https://docs.aws.amazon.com/cdk/latest/guide/aspects.html)
- Synthesizing an app shouldn't have side effects (like network calls to modify aws account or resources), to execute arbitrary code during deployment use custom resources

# Working with stacks and constructs

- better to keep as many resources in the same stack as possible
- stateful resources should be in a separate stack than stateless (termination protection on the stateful stack)
- be careful with renaming constructs with stateful resources since they will be replaced

# AWS Well-Architected Tool

- free
- used to evaluate workloads, identify high-risk issues and record improvements
