import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import Search from "./search"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        // <h1
        //   style={{
        //     // ...scale(1.5),
        //     // marginBottom: rhythm(1.5),
        //     // marginTop: 0,
        //   }}
        // >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        // </h1>
      )
    } else {
      header = (
        <h3
          style={{
            // fontFamily: `Montserrat, sans-serif`,
            // marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <ul className="test">
          <li>
            <header>{header}</header>
          </li>
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
