import { graphql, Link, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"

import { SitePageContext } from "../../graphql-types"
import { NoteBySlug } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { RequiredProperty } from "../types"
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
  const frontmatter = post.frontmatter

  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location} title={site.siteMetadata.title}>
      <SEO
        title={frontmatter.title!}
        description={frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter!.title}</h1>
      <Date>{frontmatter.date}</Date>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <Divider />
      <PostNavigator>
        <li>
          {previous && (
            <Link to={previous.fields!.slug!} rel="prev">
              ← {previous.frontmatter!.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields!.slug!} rel="next">
              {next.frontmatter!.title} →
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
