import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import Search from "./search"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    
    return (
      <div className="page">
        <div className="header-container">
          <Link
            className="title"
            to={`/`}
          >
            {title}
          </Link>
          <ul className="test">
            <li>
              Tags
            </li>
            <li>
              Search
            </li>
            <li>
              <div className="toggler">
                <ThemeToggler>
                  {({ theme, toggleTheme }) => (
                    <label className="tog">
                      <input
                        type="checkbox"
                        onChange={e =>
                          toggleTheme(e.target.checked ? "dark" : "light")
                        }
                        checked={theme === "dark"}
                        className="tttt"
                      />
                      {theme === "dark" ? (
                        <div className="abc">
                          Light
                        </div>
                      ) : (
                        <div className="abc">
                          Dark
                        </div>
                      )}
                    </label>
                  )}
                </ThemeToggler>
              </div>
            </li>
          </ul>
        </div>
        <StaticQuery
              query={graphql`
                query SearchIndexQuery {
                  siteSearchIndex {
                    index
                  }
                }
              `}
              render={data => (
                <Search searchIndex={data.siteSearchIndex.index} />
              )}
            />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
