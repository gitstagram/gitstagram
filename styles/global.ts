import { createGlobalStyle } from 'styled-components'
import { customResets } from 'styles/customResets'
import { theme, Theme, defaultTheme } from 'styles/themes'
import { keys } from 'helpers'

const createCssVariables = (theme: Theme): string => {
  return keys(theme).reduce((acc, key) => {
    const cssKey = `--${key}`
    const cssProperty = theme[key]
    const newCssDeclaration = `${cssKey}:${cssProperty};`
    return acc + newCssDeclaration
  }, '')
}

export const GlobalStyles = createGlobalStyle`
  ${/* sc-declaration */ customResets}

  @font-face {
    font-family: 'Cookie';
    src: url('/cookieSubset.ttf') format('woff');
    font-display: fallback;
  }

  :root {
    ${createCssVariables(defaultTheme)}
  }

  html {
    color: ${theme('font_Color')};
    font-size: ${theme('font_FontSize')};
    font-family: ${theme('font_FontFamily')};

    /* ios safari overscroll base background */
    background-color: ${theme('html_Bg')};
  }

  body {
    background: ${theme('root_Bg')};
  }

  /**
  * focus-visible polyfill
  */
  /* stylelint-disable */
  *:focus:not(.focus-visible) {
    outline: none;
  }
  /* stylelint-enable */

  /*
  * fixes ios fixed position input from scrolling page
  * https://stackoverflow.com/a/48516288/2957639
  */
  html,
  body {
    -webkit-overflow-scrolling: touch !important;
    height: 100% !important;
    overflow: auto !important;
  }
`
