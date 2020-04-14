import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

import "../styles/style.css"

class BlogIndexTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const postPerPage = 5
    const currentPage = this.props.pageContext.index / postPerPage + 1
    const lastPage = parseInt((this.props.pageContext.postCount - 1) /postPerPage + 1)
    const prevPage = currentPage - 1
    const nextPage = currentPage + 1
        
    return (
      <Layout location={data.location} title={siteTitle}>
        <SEO title="Posts" />
        {posts.map(({ node }) => {
          return (
            <PostCard
              key={node.fields.slug}
              node={node}
              postClass={`post`}
            />
          )
        })}
        {lastPage === 1 || 
        <div className="pagenator">
          {currentPage === 1
            ?<div className="pagenator-unlinked">{`<`}</div>
            :<Link className="pagenator-link" to={prevPage === 1 ?`/` :`/` + prevPage}>{`<`}</Link>}
          <div>Page {currentPage}</div>
          {currentPage === lastPage
            ?<div className="pagenator-unlinked">{`>`}</div>
            :<Link className="pagenator-link" to={`/` + nextPage}>{`>`}</Link>}
        </div>}
      </Layout>
    )
  }
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  query BlogIndexByIndex($index: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 5, skip: $index) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            tags
            description
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
