import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import { BlogIndexQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"
import { rhythm } from "../utils/typography"

const StyledLink = styled(Link)`
  box-shadow: none;
`

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

type Props = PageRendererProps

const BlogIndex = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<BlogIndexQuery>>(graphql`
    query BlogIndexQuery {
      site {
        ...SiteInformation
      }
      allMarkdownRemark(
        filter: {
          frontmatter: {
            category: { eq: "blog-post" }
            published: { ne: false }
          }
        }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        ...MarkdownRemarksShortInfo
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title || ""
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <StyledLink to={"/notes"}>Notes</StyledLink>
      {posts.map(({ node }) => {
        const { fields, excerpt } = node

        const slug = fields.slug
        const title = fields.title || fields.slug

        return (
          <div key={slug}>
            <Title>
              <StyledLink to={slug}>{title}</StyledLink>
            </Title>
            <small>
              {fields.date}, <strong>{fields.category}</strong>
            </small>
            <p
              dangerouslySetInnerHTML={{
                __html: fields.description || excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
