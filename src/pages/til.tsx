import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"

import { TilPageQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"

type Props = PageRendererProps

const Til = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<TilPageQuery>>(graphql`
    query TilPageQuery {
      site {
        ...SiteInformation
      }
      markdownRemark(fields: { category: { eq: "til" } }) {
        ...TilInfo
      }
    }
  `)

  const node = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Today I learned" keywords={[`til`]} />
      <p dangerouslySetInnerHTML={{ __html: node.html }} />
    </Layout>
  )
}

export default Til
