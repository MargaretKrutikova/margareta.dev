import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import { NotesPageQuery } from "../../graphql-types"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { rhythm } from "../utils/typography"

const StyledLink = styled(Link)`
  box-shadow: none;
`

const StyledH3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`

const Title = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

type Props = PageRendererProps

const Notes = (props: Props) => {
  const data = useStaticQuery<NotesPageQuery>(graphql`
    query NotesPage {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(/notes/)/" } }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              category
              description
              path
              title
              language
              tags
            }
          }
        }
      }
    }
  `)

  const notes = data.allMarkdownRemark.edges
  const siteTitle = data.site?.siteMetadata?.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <StyledH3>Notes</StyledH3>
      <SEO title="All notes" keywords={[`notes`, `snippets`, `code`]} />
      {notes.map(({ node }) => {
        const frontmatter = node!.frontmatter!

        const fields = node!.fields!

        const slug = fields.slug!

        const excerpt = node!.excerpt!

        const title = frontmatter.title || fields.slug
        return (
          <div key={slug}>
            <Title>
              <StyledLink to={slug}>{title}</StyledLink>
            </Title>
            <small>{frontmatter.date}</small>
            <small>{frontmatter.language}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default Notes
