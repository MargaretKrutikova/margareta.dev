import * as React from "react"
import styled from "styled-components"
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY
} from "typography-breakpoint-constants"

import { Tag } from "../utils/common"
import { colors } from "../utils/theme"
import { rhythm } from "../utils/typography"

type Props = {
  tags: Tag[]
  onClick: (tagValue: string) => void
  isSelected: (tagValue: string) => boolean
}

const TagsSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: ${rhythm(1.5)};
  ${TABLET_MEDIA_QUERY} {
    margin-right: ${rhythm(0.5)};
  }
  ${MOBILE_MEDIA_QUERY} {
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: 0;
    margin-bottom: ${rhythm(0.7)};
  }
`

const StyledTag = styled(({ ...props }) => <div {...props} />)`
  padding: 2px 4px;
  margin-bottom: 5px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.95em;
  white-space: nowrap;
  background-color: ${(props: any) =>
    props.selected ? colors.darkBeige : colors.beige};

  ${MOBILE_MEDIA_QUERY} {
    margin-right: 8px;
  }
  &:hover {
    background-color: ${colors.darkBeige};
  }
`

const StyledCount = styled.span`
  font-size: 0.8em;
`

const StyledHashtag = styled.span`
  font-size: 0.8em;
`

export const TagsSection: React.FunctionComponent<Props> = props => {
  return (
    <TagsSectionWrapper>
      {props.tags.map(tag => (
        <StyledTag
          key={tag.value}
          onClick={() => props.onClick(tag.value)}
          selected={props.isSelected(tag.value)}
        >
          <StyledHashtag>#</StyledHashtag> {tag.value}{" "}
          <StyledCount>({tag.count})</StyledCount>
        </StyledTag>
      ))}
    </TagsSectionWrapper>
  )
}
