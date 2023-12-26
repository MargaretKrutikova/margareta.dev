import { graphql, Link, PageRendererProps, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import { BlogIndexQuery } from "../apollo-graphql"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { NoUndefinedField } from "../types"
import { rhythm } from "../utils/typography"

type Props = PageRendererProps

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: ${rhythm(0.7)};
`

const IconWrapper = styled.div`
  padding-left: 3px;
  margin-right: 3px;
  padding-bottom: 2px;
  width: 30px;
  svg {
    display: block;
  }
`

const StartPage = (props: Props) => {
  const data = useStaticQuery<NoUndefinedField<BlogIndexQuery>>(graphql`
    query StartPageQuery {
      site {
        ...SiteInformation
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title || ""

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="margareta.dev" keywords={[`tech`]} />
      <p>
        Hello! I am a software developer from Ukraine, now living in Sweden.
      </p>
      <p>
        My name is Margarita, but <strike>margarita.dev</strike> was not
        available, so I changed one letter and it became{" "}
        <Link to="/">margareta.dev</Link>. Here I post, write notes, document
        small things I learn every day, and keep track of the books I read.
        Links to my internet life:
      </p>
      <Wrapper>
        <StyledLink href="https://github.com/MargaretKrutikova" target="_blank">
          <IconWrapper>
            <svg viewBox="0 0 1024 998" height="25" fill="currentColor">
              <path d="M0 512q0 166 95.5 298.5T343 996q6 1 10 1t6.5-1.5 4-3 2-5 .5-4.5V882q-37 4-66-.5t-45.5-14-29-23.5-17-25.5-9-24T194 780q-9-15-27-27.5t-27-20-2-14.5q50-26 113 66 34 51 119 30 10-41 40-70-116-21-172-86t-56-158q0-87 55-151-22-65 6-137 29-2 65 11.5t50.5 23T384 264q57-16 128.5-16T642 264q13-9 29-19t49-21.5 61-9.5q27 71 6 135 56 64 56 152 0 92-56.5 157.5T615 744q43 43 43 104v129q0 1 1 3 0 6 .5 9t4.5 6 11 3q154-52 251.5-185.5T1024 512q0-104-40.5-199t-109-163.5T711 40.5 512 0 313 40.5t-163.5 109T40.5 313 0 512z" />
            </svg>
          </IconWrapper>
          /github
        </StyledLink>
        <StyledLink href="https://twitter.com/rita_krutikova" target="_blank">
          <svg viewBox="0 0 512 512" fill="currentColor" width="33">
            <title>twitter icon</title>
            <path d="M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z" />
          </svg>
          /twitter
        </StyledLink>
        <StyledLink href="https://dev.to/margaretkrutikova" target="_blank">
          <IconWrapper>
            <svg
              viewBox="0 32 447.99999999999994 448"
              height="25"
              fill="currentColor"
            >
              <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z" />
            </svg>
          </IconWrapper>
          /dev.to
        </StyledLink>
      </Wrapper>
      <p style={{ marginTop: 150 }}>
      - It is impossible to please you, you spent most of your life in a rainy and miserable place and now you have sun, a lot of it! And you are grumpy..
      - Nonsense! I want sun! But not all of it all the time … I also want rain, sometimes. 
        I want my life bright and perfect, but sometimes I want it dark and empty.
        I want love, hope and warmth but sometimes I have an appetite for desperation, misery and pain. 
        I want to be right, most of the time, and I want to be wrong and make a lot of mistakes the rest of the time. 
        I want to make love at daytime, and I want to cry at night.
        I want to stumble and fall on the ground while the sun is high up in the sky, and rise up through pain and blood and run forward under a heavy rain. 
        I want to make you laugh, but I want to make you cry too, because you need to learn, you need sun, and you need rain.
      </p>
    </Layout>
  )
}

export default StartPage
