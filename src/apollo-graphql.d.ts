/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BioQuery
// ====================================================

export interface BioQuery_avatar_childImageSharp_fixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

export interface BioQuery_avatar_childImageSharp {
  __typename: "ImageSharp";
  fixed: BioQuery_avatar_childImageSharp_fixed | null;
}

export interface BioQuery_avatar {
  __typename: "File";
  childImageSharp: BioQuery_avatar_childImageSharp | null;
}

export interface BioQuery_site_siteMetadata_social {
  __typename: "SiteSiteMetadataSocial";
  twitter: string | null;
}

export interface BioQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  author: string | null;
  social: BioQuery_site_siteMetadata_social | null;
}

export interface BioQuery_site {
  __typename: "Site";
  siteMetadata: BioQuery_site_siteMetadata | null;
}

export interface BioQuery {
  avatar: BioQuery_avatar | null;
  site: BioQuery_site | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeoQuery
// ====================================================

export interface SeoQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface SeoQuery_site {
  __typename: "Site";
  siteMetadata: SeoQuery_site_siteMetadata | null;
}

export interface SeoQuery {
  site: SeoQuery_site | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteQuery
// ====================================================

export interface SiteQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface SiteQuery_site {
  __typename: "Site";
  siteMetadata: SiteQuery_site_siteMetadata | null;
}

export interface SiteQuery {
  site: SiteQuery_site | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogIndexQuery
// ====================================================

export interface BlogIndexQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface BlogIndexQuery_site {
  __typename: "Site";
  siteMetadata: BlogIndexQuery_site_siteMetadata | null;
}

export interface BlogIndexQuery_allMarkdownRemark_edges_node_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
  date: any | null;
  title: string | null;
  description: string | null;
  category: string | null;
  tags: (string | null)[] | null;
}

export interface BlogIndexQuery_allMarkdownRemark_edges_node {
  __typename: "MarkdownRemark";
  excerpt: string | null;
  timeToRead: number | null;
  fields: BlogIndexQuery_allMarkdownRemark_edges_node_fields | null;
}

export interface BlogIndexQuery_allMarkdownRemark_edges {
  __typename: "MarkdownRemarkEdge";
  node: BlogIndexQuery_allMarkdownRemark_edges_node;
}

export interface BlogIndexQuery_allMarkdownRemark {
  __typename: "MarkdownRemarkConnection";
  edges: BlogIndexQuery_allMarkdownRemark_edges[];
}

export interface BlogIndexQuery {
  site: BlogIndexQuery_site | null;
  allMarkdownRemark: BlogIndexQuery_allMarkdownRemark;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StartPageQuery
// ====================================================

export interface StartPageQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface StartPageQuery_site {
  __typename: "Site";
  siteMetadata: StartPageQuery_site_siteMetadata | null;
}

export interface StartPageQuery {
  site: StartPageQuery_site | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotesPageQuery
// ====================================================

export interface NotesPageQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface NotesPageQuery_site {
  __typename: "Site";
  siteMetadata: NotesPageQuery_site_siteMetadata | null;
}

export interface NotesPageQuery_allMarkdownRemark_edges_node_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
  date: any | null;
  title: string | null;
  description: string | null;
  category: string | null;
  tags: (string | null)[] | null;
}

export interface NotesPageQuery_allMarkdownRemark_edges_node {
  __typename: "MarkdownRemark";
  excerpt: string | null;
  timeToRead: number | null;
  fields: NotesPageQuery_allMarkdownRemark_edges_node_fields | null;
}

export interface NotesPageQuery_allMarkdownRemark_edges {
  __typename: "MarkdownRemarkEdge";
  node: NotesPageQuery_allMarkdownRemark_edges_node;
}

export interface NotesPageQuery_allMarkdownRemark {
  __typename: "MarkdownRemarkConnection";
  edges: NotesPageQuery_allMarkdownRemark_edges[];
}

export interface NotesPageQuery {
  site: NotesPageQuery_site | null;
  allMarkdownRemark: NotesPageQuery_allMarkdownRemark;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlug
// ====================================================

export interface BlogPostBySlug_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface BlogPostBySlug_site {
  __typename: "Site";
  siteMetadata: BlogPostBySlug_site_siteMetadata | null;
}

export interface BlogPostBySlug_markdownRemark_fields {
  __typename: "MarkdownRemarkFields";
  title: string | null;
  date: any | null;
  description: string | null;
}

export interface BlogPostBySlug_markdownRemark {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: BlogPostBySlug_markdownRemark_fields | null;
}

export interface BlogPostBySlug {
  site: BlogPostBySlug_site | null;
  markdownRemark: BlogPostBySlug_markdownRemark | null;
}

export interface BlogPostBySlugVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NoteBySlug
// ====================================================

export interface NoteBySlug_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface NoteBySlug_site {
  __typename: "Site";
  siteMetadata: NoteBySlug_site_siteMetadata | null;
}

export interface NoteBySlug_markdownRemark_fields {
  __typename: "MarkdownRemarkFields";
  title: string | null;
  date: any | null;
  description: string | null;
}

export interface NoteBySlug_markdownRemark {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: NoteBySlug_markdownRemark_fields | null;
}

export interface NoteBySlug {
  site: NoteBySlug_site | null;
  markdownRemark: NoteBySlug_markdownRemark | null;
}

export interface NoteBySlugVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TilPageQuery
// ====================================================

export interface TilPageQuery_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface TilPageQuery_site {
  __typename: "Site";
  siteMetadata: TilPageQuery_site_siteMetadata | null;
}

export interface TilPageQuery_markdownRemark {
  __typename: "MarkdownRemark";
  id: string;
  html: string | null;
}

export interface TilPageQuery {
  site: TilPageQuery_site | null;
  markdownRemark: TilPageQuery_markdownRemark | null;
}

export interface TilPageQueryVariables {
  slug: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed
// ====================================================

export interface GatsbyImageSharpFixed {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp
// ====================================================

export interface GatsbyImageSharpFixed_withWebp {
  __typename: "ImageSharpFixed";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_tracedSVG {
  __typename: "ImageSharpFixed";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_noBase64 {
  __typename: "ImageSharpFixed";
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFixed_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFixed_withWebp_noBase64 {
  __typename: "ImageSharpFixed";
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid
// ====================================================

export interface GatsbyImageSharpFluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp
// ====================================================

export interface GatsbyImageSharpFluid_withWebp {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_tracedSVG {
  __typename: "ImageSharpFluid";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpFluid_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpFluid_withWebp_noBase64 {
  __typename: "ImageSharpFluid";
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions
// ====================================================

export interface GatsbyImageSharpResolutions {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp {
  __typename: "ImageSharpResolutions";
  base64: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_tracedSVG {
  __typename: "ImageSharpResolutions";
  tracedSVG: string | null;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpResolutions_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpResolutions_withWebp_noBase64 {
  __typename: "ImageSharpResolutions";
  width: number;
  height: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes
// ====================================================

export interface GatsbyImageSharpSizes {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp
// ====================================================

export interface GatsbyImageSharpSizes_withWebp {
  __typename: "ImageSharpSizes";
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_tracedSVG
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_tracedSVG {
  __typename: "ImageSharpSizes";
  tracedSVG: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GatsbyImageSharpSizes_withWebp_noBase64
// ====================================================

export interface GatsbyImageSharpSizes_withWebp_noBase64 {
  __typename: "ImageSharpSizes";
  aspectRatio: number;
  src: string;
  srcSet: string;
  srcWebp: string | null;
  srcSetWebp: string | null;
  sizes: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SiteInformation
// ====================================================

export interface SiteInformation_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  author: string | null;
  description: string | null;
}

export interface SiteInformation {
  __typename: "Site";
  siteMetadata: SiteInformation_siteMetadata | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MarkdownRemarksShortInfo
// ====================================================

export interface MarkdownRemarksShortInfo_edges_node_fields {
  __typename: "MarkdownRemarkFields";
  slug: string | null;
  date: any | null;
  title: string | null;
  description: string | null;
  category: string | null;
  tags: (string | null)[] | null;
}

export interface MarkdownRemarksShortInfo_edges_node {
  __typename: "MarkdownRemark";
  excerpt: string | null;
  timeToRead: number | null;
  fields: MarkdownRemarksShortInfo_edges_node_fields | null;
}

export interface MarkdownRemarksShortInfo_edges {
  __typename: "MarkdownRemarkEdge";
  node: MarkdownRemarksShortInfo_edges_node;
}

export interface MarkdownRemarksShortInfo {
  __typename: "MarkdownRemarkConnection";
  edges: MarkdownRemarksShortInfo_edges[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MarkdownRemarkInfo
// ====================================================

export interface MarkdownRemarkInfo_fields {
  __typename: "MarkdownRemarkFields";
  title: string | null;
  date: any | null;
  description: string | null;
}

export interface MarkdownRemarkInfo {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  html: string | null;
  fields: MarkdownRemarkInfo_fields | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TilInfo
// ====================================================

export interface TilInfo {
  __typename: "MarkdownRemark";
  id: string;
  html: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
