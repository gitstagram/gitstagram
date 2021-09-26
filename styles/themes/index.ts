import { defaultTheme } from 'styles/themes/defaultTheme'
import { constants } from 'styles/themes/constants'
import { nullish } from 'helpers'

export type Theme = typeof defaultTheme
type ThemeItem = keyof Theme

export const theme = (prop: ThemeItem): string => {
  if (process.env.NODE_ENV === 'development' && nullish(defaultTheme[prop]))
    throw new Error(`Property ${prop} not found on theme`)
  return `var(--${prop})`
}

type Constants = typeof constants
type ConstantsItem = keyof Constants

export const themeConstant = (prop: ConstantsItem): string => {
  if (process.env.NODE_ENV === 'development' && nullish(constants[prop]))
    throw new Error(`Property ${prop} not found in constants`)
  return constants[prop]
}

export * from 'styles/themes/defaultTheme'
