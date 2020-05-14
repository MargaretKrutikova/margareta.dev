import { graphql, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"

import { SiteQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"

type Props = PageRendererProps

export const NotFoundPage = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<SiteQuery>>(graphql`
    query SiteQuery {
      site {
        ...SiteInformation
      }
    }
  `)

  return (
    <Layout location={props.location} title={data.site.siteMetadata.title}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
