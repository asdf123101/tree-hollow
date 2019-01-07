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
font-family: "Merriweather Sans", Helvetica, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
font-family: "Lato", Helvetica, sans-serif;
margin-bottom: 10px;
}

h3, h4, h5, h6 {
margin: 0.5em 0 0.2em 0;
}

a:link {
text-decoration: none;
color: #007acc; }

a:visited {
color: #007acc; }

a:hover, a:visited:hover {
color: #da3f3d; }

code {
font-family: Courier, monospace;
background-color: rgba(27, 31, 35, 0.05);
border-radius: 3px;
font-size: 95%;
padding: 0.1em;}
`

export default GlobalStyles
