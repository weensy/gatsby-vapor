import React, { Component } from "react"
import { Link } from "gatsby"
import { Index } from "elasticlunr"
import Tags from "./tags"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div className="search-container">
        <div className="search-box-container">
          <input className="search-box" placeholder="Search" type="text" value={this.state.query} onChange={this.search} />
        </div>
        {this.state.results.map(page => (
          <div className="post-card">
            <Tags tags={page.tags}/>
            <header>
                <h1>
                  <Link to={page.slug}>
                    {page.title}
                  </Link>
                </h1>
                <small>{page.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: page.description || page.excerpt,
                  }}
                />
              </section>
          </div>
        ))}
    </div>
  )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true })
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}