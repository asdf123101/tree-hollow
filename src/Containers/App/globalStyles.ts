import { createGlobalStyle } from '../../theme'

/* eslint no-unused-expressions: 0 */
const GlobalStyles = createGlobalStyle`
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
background-image: linear-gradient(${props =>
  props.theme.color.primaryColor + ', ' + props.theme.color.secondaryColor});
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Lato", Helvetica, sans-serif;
}

a:link {
  text-decoration: none;
  color: #007acc;
}

a:visited {
  color: #007acc;
}

a:hover,
a:visited:hover {
  color: #da3f3d;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-size: 95%;
  padding: 0.1em;
}
`

export default GlobalStyles
