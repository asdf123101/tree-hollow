import React, { Component, Fragment } from 'react'

import Intro from '../../Components/Intro'
import { theme, ThemeProvider } from '../../theme'
import Hollow from '../Hollow'
import GlobalStyles from './globalStyles'

import 'normalize.css'

class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyles />
          <Intro />
          <Hollow />
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default App
