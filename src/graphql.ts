import { graphql } from "gatsby"

export const notesPageQuery = graphql`
  query NotesPageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(notes)/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            category
            description
            path
            title
            language
            tags
          }
        }
      }
    }
  }
`
