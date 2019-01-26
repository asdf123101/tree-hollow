import * as styledComponents from 'styled-components'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>

export const theme = {
  color: {
    primaryColor: '#2abf65',
    secondaryColor: '#7FC29B',
    pcLightYellow: '#FEFDDF',
    pcWarmRed: '#FF4635',
  },
}

export type IThemeInterface = typeof theme

export default styled
export { css, createGlobalStyle, keyframes, ThemeProvider }
