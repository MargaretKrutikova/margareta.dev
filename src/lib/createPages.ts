import path from "path"

import { CreatePagesQuery, GatsbyCreatePages, RequiredProperty } from "../types"

export const createPages: GatsbyCreatePages = async ({
  graphql,
  boundActionCreators,
}) => {
  const { createPage } = boundActionCreators

  const allMarkdown = await graphql(`
    query CreatePagesQuery {
      notesQuery: allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "note" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              title
              slug
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }

      postsQuery: allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "blog-post" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              title
              slug
              date(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    throw allMarkdown.errors
  }

  const data: RequiredProperty<CreatePagesQuery> = allMarkdown.data
  // Create blog posts pages.
  const posts = data.postsQuery.edges
  posts.forEach((post, index: number) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      // tslint:disable-next-line:object-literal-sort-keys
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        next,
        previous,
        slug: post.node.fields.slug,
      },
    })
  })

  // Create pages for notes.
  const notes = data.notesQuery.edges
  notes.forEach((note, index: number) => {
    const previous = index === notes.length - 1 ? null : notes[index + 1].node
    const next = index === 0 ? null : notes[index - 1].node

    createPage({
      path: note.node.fields.slug,
      // tslint:disable-next-line:object-literal-sort-keys
      component: path.resolve(`./src/templates/note.tsx`),
      context: {
        next,
        previous,
        slug: note.node.fields.slug,
      },
    })
  })

  // Today I learned
  createPage({
    path: "/random",
    component: path.resolve(`./src/pages/til.tsx`),
  })

  return null
}
