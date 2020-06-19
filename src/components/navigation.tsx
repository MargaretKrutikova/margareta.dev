import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

const Wrapper = styled.nav`
  display: flex;
  margin-bottom: ${rhythm(1.4)};
`

const StyledLink = styled.span`
  margin-right: ${rhythm(1)};
`

export const NavigationMenu: React.FunctionComponent<{}> = () => {
  return (
    <Wrapper>
      <StyledLink>
        <Link activeClassName="active" partiallyActive={true} to="/blog/">
          /blog
        </Link>
      </StyledLink>
      <StyledLink>
        <Link activeClassName="active" partiallyActive={true} to="/notes/">
          /notes
        </Link>
      </StyledLink>
      <StyledLink>
        <Link activeClassName="active" partiallyActive={true} to="/til/">
          /today-i-learned
        </Link>
      </StyledLink>
    </Wrapper>
  )
}
