import { Link, PageRendererProps } from "gatsby"
import React from "react"

import { Button } from "../components/button"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"

type Props = PageRendererProps

const Index = (props: Props) => {
  const siteTitle = "Gatsby Starter Personal Website"

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <img style={{ margin: 0 }} src="./GatsbyScene.svg" alt="Gatsby Scene" />
      <h1>
        Hey people{" "}
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </h1>
      <p>Welcome to your new Gatsby website. You are on your home page.</p>
      <p>
        This starter comes out of the box with styled components and Gatsby's
        default starter blog running on Netlify CMS.
      </p>
      <p>Now go build something great!</p>
      <Link to="/blog/">
        <Button marginTop="35px">Go to Blog</Button>
      </Link>
    </Layout>
  )
}

export default Index
