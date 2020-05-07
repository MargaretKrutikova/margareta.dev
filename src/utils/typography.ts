import { CSSObject } from "styled-components"
import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    boxShadow: `none`,
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography({
  ...Wordpress2016,
  baseFontSize: "20px",
  baseLineHeight: 1.6,
  bodyFontFamily: ["Nunito Sans", "sans-serif"],
  headerFontFamily: ["Nunito Sans", "sans-serif"],
  scaleRatio: 2,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 600,
  googleFonts: [
    {
      name: "Nunito+Sans",
      styles: ["400", "400i", "600", "600i", "900", "900i"],
    },
  ],
  overrideStyles: (arg, options) => ({
    ...Wordpress2016.overrideStyles(arg, options),
    "h1,h2,h3,h4,h5,h6": {
      marginTop: arg.rhythm(1.5),
    },
  }),
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
