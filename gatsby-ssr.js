const React = require("react")

const themeScript = `
(function() {
  try {
    var theme = window.localStorage && window.localStorage.getItem("theme");
    theme = theme === "dark" ? "dark" : "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  } catch (error) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
})();
`

exports.onRenderBody = ({ setBodyAttributes, setPreBodyComponents }) => {
  setBodyAttributes({ className: "light" })
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme-script",
      dangerouslySetInnerHTML: { __html: themeScript },
    }),
  ])
}
