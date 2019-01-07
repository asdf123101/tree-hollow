import React, { Component } from 'react'
import { theme, ThemeProvider } from '../../theme'

import Intro from '../../Components/Intro'
import Hollow from '../Hollow'

import GlobalStyles from './globalStyles'

import AppWrapper from './style'

class App extends Component {
  public render() {
    return (
      <AppWrapper className="App">
        <GlobalStyles />
        <Intro />
        <Hollow />
      </AppWrapper>
    )
  }
}

export default App
