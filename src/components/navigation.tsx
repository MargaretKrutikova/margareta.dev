import { Link } from "gatsby"
import * as React from "react"
import styled from "styled-components"

import { rhythm } from "../utils/typography"

const Wrapper = styled.nav`
  display: flex;
`

const StyledLink = styled.span`
  margin-right: ${rhythm(1)};
`

export const NavigationMenu: React.FunctionComponent<{}> = () => {
  return (
    <Wrapper>
      <StyledLink>
        <Link activeClassName="active" to="/">
          /blog
        </Link>
      </StyledLink>
      <StyledLink>
        <Link activeClassName="active" to="/notes/">
          /notes
        </Link>
      </StyledLink>
    </Wrapper>
  )
}
