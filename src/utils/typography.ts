import { CSSObject } from "styled-components"
import Typography from "typography"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"
import Wordpress2016 from "typography-theme-wordpress-2016"

import { colors } from "./theme"

delete Wordpress2016.googleFonts

const typography = new Typography({
  ...Wordpress2016,
  baseFontSize: "20px",
  baseLineHeight: 1.6,
  bodyFontFamily: ["Nunito Sans", "sans-serif"],
  headerFontFamily: ["Quicksand", "sans-serif"],
  scaleRatio: 1.8,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 600,
  googleFonts: [
    {
      name: "Nunito+Sans",
      styles: ["400", "400i", "600", "600i", "800", "800i", "900", "900i"],
    },
    {
      name: "Quicksand",
      styles: ["400", "400i", "600", "600i"],
    },
  ],
  overrideStyles: (arg, options) => {
    const styles = Wordpress2016.overrideStyles(arg, options)

    return {
      ...styles,
      a: {
        ...styles.a,
        textDecoration: "none",
        backgroundSize: "100% 180%",
        boxShadow: "none",
        backgroundPositionY: "10%",
        transition: "200ms background-position-y",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 55%, ${colors.pink} 50%)`,
        color: "#404040",
      },
      "a:hover, a.active, a:focus": {
        backgroundPositionY: "20%",
      },
      mark: {
        backgroundColor: colors.pink,
        borderRadius: "3px",
      },
      h1: {
        fontFamily: "Quicksand",
      },
      "h1,h2,h3,h4,h5,h6": {
        marginTop: arg.rhythm(1),
      },
      "h2, h3, h4": {
        marginBottom: arg.rhythm(0.7),
      },
      p: {
        marginBottom: arg.rhythm(0.6),
      },
      "ul,ol": {
        marginLeft: arg.rhythm(1),
      },
      strong: {
        fontWeight: 800,
      },
      li: {
        marginBottom: arg.rhythm(0.2),
      },
      "li p": {
        margin: 0,
      },
      "li > ul": {
        marginTop: arg.rhythm(0.2),
      },
      "ul ul": {
        listStyleType: "circle",
      },
      blockquote: {
        ...styles.blockquote,
        fontSize: arg.scale(1),
      },
      [MOBILE_MEDIA_QUERY]: {
        blockquote: {
          marginLeft: arg.rhythm(-1 / 2),
        },
        html: {
          fontSize: "110%",
        },
      },
    }
  },
})

Wordpress2016.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    backgroundImage: `none`,
  },
  "a.anchor.before": {
    backgroundImage: `none`,
  },
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

type StyledScale = (values: number) => CSSObject
export const styledScale = scale as StyledScale
