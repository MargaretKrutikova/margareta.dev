import { graphql, Link, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"

import { NoteBySlug } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { RequiredProperty, SitePageContext } from "../types"
import { rhythm, styledScale } from "../utils/typography"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: RequiredProperty<NoteBySlug>
}

const Date = styled.p`
  display: block;
  ${styledScale(-1 / 3)};
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`

const Divider = styled.hr`
  margin-bottom: ${rhythm(1)};
`

const PostNavigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

const BlogPostTemplate = (props: Props) => {
  const { markdownRemark: post, site } = props.data
  const { fields, excerpt, html } = post

  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location} title={site.siteMetadata.title}>
      <SEO title={fields.title} description={fields.description || excerpt} />
      <h1>{fields.title}</h1>
      <Date>{fields.date}</Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <Divider />

      <PostNavigator>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.fields.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.fields.title} →
            </Link>
          )}
        </li>
      </PostNavigator>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    site {
      ...SiteInformation
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MarkdownRemarkInfo
    }
  }
`
