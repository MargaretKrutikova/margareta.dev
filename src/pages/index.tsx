import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"

import { BlogIndexQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { NavigationMenu } from "../components/navigation"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"

type Props = PageRendererProps

const BlogIndex = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<BlogIndexQuery>>(graphql`
    query StartPageQuery {
      site {
        ...SiteInformation
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="margareta.dev" keywords={[`tech`]} />
      <NavigationMenu />
    </Layout>
  )
}

export default BlogIndex
