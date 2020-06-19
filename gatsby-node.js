const { createFilePath } = require(`gatsby-source-filesystem`)

require("source-map-support").install()
require("ts-node").register()

const { getUrlPath } = require("./src/utils")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const relativeFilePath = createFilePath({
      node,
      getNode,
    })

    createNodeField({
      name: `slug`,
      node,
      value: relativeFilePath,
    })

    createNodeField({
      name: "id",
      node,
      value: node.id,
    })

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: "description",
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: "date",
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(" ")[0] : "",
    })

    createNodeField({
      name: "category",
      node,
      value: node.frontmatter.category || [],
    })

    createNodeField({
      name: "tags",
      node,
      value: node.frontmatter.tags || [],
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      tags: [String!]!
    }
  `
  createTypes(typeDefs)
}

exports.createPages = require("./src/lib/createPages").createPages
