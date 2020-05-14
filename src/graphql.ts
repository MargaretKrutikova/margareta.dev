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
        fields {
          slug
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`

export const markdownRemarkInfo = graphql`
  fragment MarkdownRemarkInfo on MarkdownRemark {
    id
    excerpt(pruneLength: 160)
    html
    fields {
      title
      date(formatString: "MMMM DD, YYYY")
      description
    }
  }
`
