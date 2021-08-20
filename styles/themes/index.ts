import { defaultTheme } from 'styles/themes/defaultTheme'
import { nullish } from 'helpers'

export type Theme = typeof defaultTheme
type ThemeItem = keyof Theme

export const theme = (prop: ThemeItem): string => {
  if (process.env.NODE_ENV === 'development' && nullish(defaultTheme[prop]))
    throw new Error(`Property ${prop} not found on theme`)
  return `var(--${prop})`
}

export * from 'styles/themes/defaultTheme'
