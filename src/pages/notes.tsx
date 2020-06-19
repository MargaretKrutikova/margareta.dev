import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import { NotesPageQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { TagsSection } from "../components/tagsSection"
import { NoUndefinedField } from "../types"
import { getUniqueTags } from "../utils/common"
import { colors } from "../utils/theme"
import { rhythm } from "../utils/typography"

const StyledLink = styled(Link)`
  box-shadow: none;
  color: ${colors.pink};
  /* border-bottom: 1px solid rgb(27, 179, 143); */
`

const StyledH3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
  font-size: 1em;
`

const NoteTitle = styled.h3`
  margin-top: 0;
  margin-bottom: ${rhythm(1 / 4)};
`

const NoteListItem = styled.div`
  margin-bottom: ${rhythm(0.7)};
`

const Description = styled.p`
  font-size: 0.9em;
  line-height: 1.3;
  margin-bottom: ${rhythm(1 / 3)};
`

const Container = styled.section`
  display: flex;
  align-items: flex-start;
  ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
  }
`

type Props = PageRendererProps

const Notes = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<NotesPageQuery>>(graphql`
    query NotesPageQuery {
      site {
        ...SiteInformation
      }
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "note" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        ...MarkdownRemarksShortInfo
      }
    }
  `)

  const notes = data.allMarkdownRemark.edges || []
  const siteTitle = data.site.siteMetadata.title || ""
  const allTags = getUniqueTags(notes.map(note => note.node.fields.tags || []))

  return (
    <Layout variant="wide" location={props.location} title={siteTitle}>
      <SEO title="All notes" keywords={[`notes`, `code`]} />
      <StyledH3>/notes</StyledH3>
      <Container>
        <TagsSection tags={allTags} />
        <div>
          {notes.map(({ node: { fields, excerpt } }) => (
            <NoteListItem key={fields.slug}>
              <NoteTitle>
                <StyledLink to={fields.slug}>{fields.title}</StyledLink>
              </NoteTitle>
              {/* <small>{fields.date}</small> */}
              <Description
                dangerouslySetInnerHTML={{
                  __html: fields.description || excerpt,
                }}
              />
            </NoteListItem>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default Notes
