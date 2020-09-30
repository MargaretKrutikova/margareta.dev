import { graphql, PageRendererProps } from "gatsby"
import React from "react"

import { BooksPageQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { RequiredProperty } from "../types"

interface Props extends PageRendererProps {
  data: RequiredProperty<BooksPageQuery>
}

const Books = (props: Props) => {
  const node = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Books" keywords={[`books`]} />
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
    </Layout>
  )
}

export default Books

export const pageQuery = graphql`
  query BooksPageQuery($slug: String!) {
    site {
      ...SiteInformation
    }
    markdownRemark(fields: { slug: { eq: $slug }, category: { eq: "books" } }) {
      ...BooksInfo
    }
  }
`
