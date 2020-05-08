import { Link, PageRendererProps } from "gatsby"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

import { rhythm, styledScale } from "../utils/typography"

interface Props extends PageRendererProps {
  title: string
  children: ReactNode
}

const StyledH1 = styled.h1`
  ${styledScale(1.5)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`

const StyledH3 = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`

const StyledLink = styled(Link)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(22)};
  padding: ${`${rhythm(1.5)} ${rhythm(3 / 4)}`};
  ${MOBILE_MEDIA_QUERY} {
    padding: ${`${rhythm(1.5)} ${rhythm(1 / 2)}`};
  }
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`
export const Layout = (props: Props) => {
  const { location, title, children } = props
  const rootPath = `/`

  const HeaderTitle = location.pathname === rootPath ? StyledH1 : StyledH3

  return (
    <Content>
      <header>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
      </header>
      <main>{children}</main>
      {/* <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer> */}
    </Content>
  )
}
