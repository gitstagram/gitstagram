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
  ${customResets}

  :root {
    ${createCssVariables(defaultTheme)}
    color: ${theme('font_Color')};
    background-color: ${theme('root_BgColor')};
  }

  html {
    font-size: ${theme('font_Size')};
    font-family: ${theme('font_Family')};
  }
`
