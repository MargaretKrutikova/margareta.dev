import { graphql, Link, PageRendererProps } from "gatsby"
import React from "react"
import styled from "styled-components"

import { BlogPostBySlug } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { RequiredProperty, SitePageContext } from "../types"
import { rhythm, styledScale } from "../utils/typography"
import { colors } from "../utils/theme"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: RequiredProperty<BlogPostBySlug>
}

const Date = styled.div`
  display: block;
  ${styledScale(-1 / 2)};
  margin-bottom: ${rhythm(0.7)};
  margin-top: ${rhythm(-1)};

`

const ReadingTime = styled.div`
  ${styledScale(-0.6)};
  margin-bottom: ${rhythm(0.5)};
  color: ${colors.darkerGrey};
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
  margin-left: 0;
`

const BlogPostTemplate = (props: Props) => {
  const { markdownRemark: post, site } = props.data
  const { fields } = post

  const { previous, next } = props.pageContext
  const timeToRead = (post as any).timeToRead
  const timeToSkim = Math.floor(timeToRead / 3)

  return (
    <Layout location={props.location} title={site.siteMetadata.title}>
      <SEO
        title={fields.title}
        description={fields.description || post.excerpt}
      />
      <h1>{fields.title}</h1>
      <Date>{fields.date}</Date>
      <ReadingTime>{timeToRead} min read &middot; {timeToSkim} min skim</ReadingTime>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
  query BlogPostBySlug($slug: String!) {
    site {
      ...SiteInformation
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MarkdownRemarkInfo
    }
  }
`
