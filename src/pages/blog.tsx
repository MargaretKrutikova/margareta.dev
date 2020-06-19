import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import { BlogIndexQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"
import { colors } from "../utils/theme"
import { styledScale } from "../utils/typography"

const BlogPostLink = styled(Link)`
  box-shadow: none;
  background-image: none;
  color: ${colors.darkPink};
  transition: 200ms color;
  &:hover {
    color: ${colors.pink};
  }
`

const Title = styled.h3`
  ${styledScale(0.8)}
  margin-bottom: 0;
  line-height: 1.3;
`

const Tag = styled.span`
  padding: 0 4px;
  border-radius: 3px;
  font-size: 0.95em;
  white-space: nowrap;
  margin-right: 8px;
  background-color: ${colors.darkBeige};
`

const Date = styled.small`
  color: ${colors.darkGrey};
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
      <SEO title="All posts" keywords={[`blog`]} />
      {posts.map(({ node }) => {
        const { fields, excerpt } = node

        const slug = fields.slug
        const title = fields.title || fields.slug
        const tags = fields.tags || []

        return (
          <div key={slug}>
            <Title>
              <BlogPostLink to={slug}>{title}</BlogPostLink>
            </Title>
            <span>
              <Date>{fields.date}, </Date>
              {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </span>
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
