import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "../components/tags"

import "../styles/style.css"

class BlogIndexTemplate extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const currentPage = this.props.pageContext.index / 5 + 1
    const lastPage = parseInt((this.props.pageContext.postCount - 1) /5 + 1)
    const prevPage = currentPage - 1
    const nextPage = currentPage + 1

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <div className="post-card">
              <Tags tags={node.frontmatter.tags}/>
                <header>
                  <h1>
                    <Link to={node.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  {/* {node.frontmatter.description || node.excerpt} */}
                </section>
              </div>
            </article>
          )
        })}
        {currentPage === 1 || <Link to={prevPage === 1 ?`/` :`/` + prevPage}>{`<`}</Link>}
        <span>Page {currentPage}</span>
        {currentPage === lastPage || <Link to={`/` + nextPage}>{`>`}</Link>}
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
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
