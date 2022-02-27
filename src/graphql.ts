import { graphql } from "gatsby"

export const siteInfo = graphql`
  fragment SiteInformation on Site {
    siteMetadata {
      title
      author
      description
    }
  }
`

export const markdownRemarksShortInfo = graphql`
  fragment MarkdownRemarksShortInfo on MarkdownRemarkConnection {
    edges {
      node {
        excerpt
        timeToRead
        fields {
          slug
          date(formatString: "MM-DD-YYYY")
          title
          description
          category
          tags
        }
      }
    }
  }
`

export const markdownRemarkInfo = graphql`
  fragment MarkdownRemarkInfo on MarkdownRemark {
    id
    excerpt(pruneLength: 160)
    timeToRead
    html
    fields {
      title
      date(formatString: "MMMM DD, YYYY")
      description
    }
  }
`

export const tilInfo = graphql`
  fragment TilInfo on MarkdownRemark {
    id
    html
  }
`

export const booksInfo = graphql`
  fragment BooksInfo on MarkdownRemark {
    id
    html
  }
`
