export interface SitePageContext {
  next: RequiredProperty<MarkdownRemarkContextInfo> | null
  previous: RequiredProperty<MarkdownRemarkContextInfo> | null
  slug: string
}

interface PageInput {
  path: string
  component: string
  layout?: string
  context?: SitePageContext
}

interface BoundActionCreators {
  createPage: (page: PageInput) => void
  deletePage: (page: PageInput) => void
  createRedirect: (opts: {
    fromPath: string
    isPermanent?: boolean
    redirectInBrowser?: boolean
    toPath: string
  }) => void
}

export type GatsbyCreatePages = (fns: {
  graphql: any
  boundActionCreators: BoundActionCreators
}) => void

export enum Category {
  BlogPost = "blog-post",
  Note = "note",
  TIL = "til",
}

export type RequiredProperty<T> = {
  [P in keyof T]: Required<NonNullable<RequiredProperty<T[P]>>>
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}

export interface MarkdownFields {
  title: string | null
  slug: string | null
  date: any | null
}

export interface MarkdownRemarkContextInfo {
  id: string
  fields: MarkdownFields | null
}

export interface CreatePagesQuery {
  notesQuery: {
    edges: Array<{ node: MarkdownRemarkContextInfo }>
  }
  postsQuery: {
    edges: Array<{ node: MarkdownRemarkContextInfo }>
  }
  tilQuery: {
    fields: MarkdownFields | null
  }
}
