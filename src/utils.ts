import { Node } from "gatsby"

import { Category } from "./types"

export const getUrlPath = (node: Node) => {
  switch ((node.frontmatter as any).category) {
    case Category.BlogPost:
      return `/blog`
    case Category.Note:
      return "/notes"
    default:
      return "/"
  }
}
