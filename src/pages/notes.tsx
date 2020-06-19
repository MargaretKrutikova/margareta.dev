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

const NoteLink = styled(Link)`
  box-shadow: none;
  background-image: none;
  color: ${colors.darkPink};
  transition: 200ms color;
  &:hover {
    color: ${colors.pink};
  }
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

  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const handleTagClick = (tagValue: string) => {
    const newTags = selectedTags.includes(tagValue)
      ? selectedTags.filter(tag => tag !== tagValue)
      : [...selectedTags, tagValue]

    setSelectedTags(newTags)
  }

  const notes = data.allMarkdownRemark.edges || []
  const siteTitle = data.site.siteMetadata.title || ""
  const allTags = getUniqueTags(notes.map(note => note.node.fields.tags || []))

  const isTagSelected = (tagValue: string) => selectedTags.includes(tagValue)

  const visibleNotes =
    selectedTags.length > 0
      ? notes.filter(note =>
          selectedTags.some(tag =>
            (note.node.fields.tags || []).some(ownTag => ownTag === tag)
          )
        )
      : notes

  return (
    <Layout variant="wide" location={props.location} title={siteTitle}>
      <SEO title="All notes" keywords={[`notes`, `code`]} />
      <Container>
        <TagsSection
          onClick={handleTagClick}
          tags={allTags}
          isSelected={isTagSelected}
        />
        <div>
          {visibleNotes.map(({ node: { fields, excerpt } }) => (
            <NoteListItem key={fields.slug}>
              <NoteTitle>
                <NoteLink to={fields.slug}>{fields.title}</NoteLink>
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
