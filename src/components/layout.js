import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Search from "./search"

class Layout extends React.Component {
  render() {
    const { location, title, children} = this.props
    const toggler = (
      <div className="toggler">
        <ThemeToggler>{({ theme, toggleTheme }) => (
          <label className="tog">
            <input
              type="checkbox"
              onChange={e =>
                toggleTheme(e.target.checked ? "dark" : "light")
              }
              checked={theme === "dark"}
              className="tog-checkbox"
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
        )}</ThemeToggler>
      </div>
    )
    const searchBox = (
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
    )

    return (
      <div className="site-container">
        <div className="header-container">
          <Link
            className="header-title"
            to={`/`}
          >
            {title}
          </Link>
          <div className="nav-container">
            <ul className="header-nav">
              <li>
                Tags
              </li>
              <li>
                Search
              </li>
              <li>
                {toggler}
              </li>
            </ul>
            <ul className="header-social">
              <li>GitHub</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} {title}, Built with
          {` `}
          <a className="gatsby" href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
