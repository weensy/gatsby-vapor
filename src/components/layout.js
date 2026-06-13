import React, { Component } from "react";
import { Link } from "gatsby"

class Layout extends Component {
  state = {
    theme: "light",
  }

  componentDidMount() {
    const theme = this.getStoredTheme()
    this.setTheme(theme)
  }

  getStoredTheme = () => {
    if (typeof window === "undefined" || !window.localStorage) {
      return "light"
    }

    try {
      return window.localStorage.getItem("theme") || "light"
    } catch (error) {
      return "light"
    }
  }

  setTheme = theme => {
    const safeTheme = theme === "dark" ? "dark" : "light"

    this.setState({ theme: safeTheme })

    if (typeof document !== "undefined") {
      document.body.classList.remove("light", "dark")
      document.body.classList.add(safeTheme)
    }

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem("theme", safeTheme)
      } catch (error) {
        // Ignore storage errors in privacy-restricted contexts.
      }
    }
  }

  render() {
    const { title, children} = this.props
    const { theme } = this.state
    const toggler = (
      <div className="toggler">
        <label className="tog">
          <input
            type="checkbox"
            onChange={e => this.setTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
            className="tog-checkbox"
          />
          {theme === "dark" ? (
            <div className="tog-text">
              Light
            </div>
          ) : (
            <div className="tog-text">
              Dark
            </div>
          )}
        </label>
      </div>
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
              <li id="header-nav-first"><Link to={`/tags`}>Tags</Link></li>
              <li><Link to={`/search`}>Search</Link></li>
              <li>{toggler}</li>
            </ul>
            <ul className="header-link">
              <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <main>{children}</main>
        <footer className="footer-copyright">
          © {new Date().getFullYear()} {title}, Built with
          {` `}
          <a className="footer-gatsby" href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
