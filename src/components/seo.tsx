import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Helmet from "react-helmet"

import { SeoQuery } from "../apollo-graphql"
import { NoUndefinedField } from "../types"

interface Meta {
  name: string
  content: string
}

interface Props {
  title: string
  lang?: string
  meta?: Meta[]
  keywords?: string[]
  description?: string
}

export const SEO = (props: Props) => {
  const lang = props.lang || "en"
  const meta = props.meta || []
  const keywords = props.keywords || []
  const description = props.description || ""

  const { site } = useStaticQuery<NoUndefinedField<SeoQuery>>(
    graphql`
      query SeoQuery {
        site {
          ...SiteInformation
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={props.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          content: metaDescription,
          name: `description`,
        },
        {
          content: props.title,
          property: `og:title`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: site.siteMetadata.author,
          name: `twitter:creator`,
        },
        {
          content: props.title,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                content: keywords.join(`, `),
                name: `keywords`,
              }
            : []
        )
        .concat(meta)}
    >
      <meta
        name="google-site-verification"
        content="VwIi-8suCEx6TvN1s-Nzdr2Ah9Y_r4Ctg_zqbLqC5yk"
      />
    </Helmet>
  )
}
