import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../styles/style.css"

class TagIndexTemplate extends React.Component {
  render() {
    const props = this.props
    const tag = this.props.pageContext.tag
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout title={siteTitle}>
        <SEO
          // title={`#${tag}`}
          title={`#${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
          keywords={[`${tag}`, `blog`, `gatsby`, `javascript`, `react`]}
        />
        <header className="tag-page-head">
          <h1 className="page-head-title">#{tag}({props.data.allMarkdownRemark.totalCount})</h1>
        </header>
      <div className="post-feed">
        {posts.map(({ node }) => {
          return (
            <PostCard
              key={node.fields.slug}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
    )
  }
}

export default TagIndexTemplate

export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 670, maxHeight: 200, cropFocus: CENTER) {
                  src
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`
