module.exports = {
  client: {
    includes: ["./src/**/*.{ts,tsx}", "./node_modules/gatsby-*/**/*.js"],
    tagName: "graphql",
    service: {
      name: "gatsby",
      localSchemaFile: "./schema.json",
    },
  },
}
