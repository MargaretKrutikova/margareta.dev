# Tech

## Good stuff

- Generating code is fantastic, e.g. db type generation as in SqlHydra, swagger type gen as in Hawaii, GraphQL type generation etc. Prefer code generation to magic of type providers in F# or other magic where you don't see the types being used. Also the magic will backfire during CI/CD.
- Infrastructure as code is awesome, preferably a real language with good UX. E.g. `cdk` in `Typescript` is torrific, the best infrastructure solution ever,
- Github actions are amazing, running integration tests with `postgres` configured as a service is great - running locally as well as on the CI server the same way. Deploying infra with `cdk` on GH actions is super smooth - much more convenient than via aws cloud formation deploys.
- Using `mermaid` for building diagrams in markdown is super smooth and helpful.

## Bad stuff

- F# type providers is better to avoid, might be good for prototyping and experimenting, but no more - too much magic, fails often, cache is stale and doesn't work properly on CI.
