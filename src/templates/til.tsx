import { graphql, PageRendererProps } from "gatsby"
import React from "react"

import { TilPageQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { RequiredProperty } from "../types"

interface Props extends PageRendererProps {
  data: RequiredProperty<TilPageQuery>
}

const Til = (props: Props) => {
  const node = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Today I learned" keywords={[`til`]} />
      <div dangerouslySetInnerHTML={{ __html: node.html }} />
    </Layout>
  )
}

export default Til

export const pageQuery = graphql`
  query TilPageQuery($slug: String!) {
    site {
      ...SiteInformation
    }
    markdownRemark(fields: { slug: { eq: $slug }, category: { eq: "til" } }) {
      ...TilInfo
    }
  }
`
