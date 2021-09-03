import { keys } from 'helpers'

export const baseSize = 16
export const maxWidth = 1000 / baseSize

const defaultFontFamily = [
  'system-ui',
  /* macOS San Francisco*/ '-apple-system',
  /* macOS */ 'BlinkMacSystemFont',
  /* Windows */ '"Segoe UI"',
  /* Android & ChromeOS */ '"Roboto"',
  /* Firefox */ '"Fira Sans"',
  /* Ubuntu */ '"Ubuntu"',
  /* Gnome */ '"Cantarell"',
  /* KDE */ '"Noto Sans"',
  /* Android fallback */ '"Droid Sans"',
  /* KDE fallback */ '"Oxygen"',
  /* macOS fallback */ '"Helvetica Neue"',
  /* General fallback */ 'sans-serif',
  /* exclude emoji fonts */
].join(', ')
export const fontFamilies = {
  // https://furbo.org/2018/03/28/system-fonts-in-css/
  default: defaultFontFamily,
  logo: '"Cookie", serif',
}

export const monos = {
  mc000: '#f0f6fc',
  mc100: '#c9d1d9',
  mc200: '#b1bac4',
  mc300: '#8b949e',
  mc400: '#6e7681',
  mc500: '#484f58',
  mc600: '#30363d',
  mc700: '#21262d',
  mc800: '#161b22',
  mc900: '#0d1117',
}

export const colors = {
  blue000: '#cae8ff',
  blue100: '#a5d6ff',
  blue200: '#79c0ff',
  blue300: '#58a6ff',
  blue400: '#388bfd',
  blue500: '#1f6feb',
  blue600: '#1158c7',
  blue700: '#0d419d',
  blue800: '#0c2d6b',
  blue900: '#051d4d',

  yellow000: '#f8e3a1',
  yellow100: '#f2cc60',
  yellow200: '#e3b341',
  yellow300: '#d29922',
  yellow400: '#f5a623',
  yellow500: '#9e6a03',
  yellow600: '#845306',
  yellow700: '#693e00',
  yellow800: '#4b2900',
  yellow900: '#341a00',

  green000: '#aff5b4',
  green100: '#7ee787',
  green200: '#56d364',
  green300: '#3fb950',
  green400: '#2ea043',
  green500: '#238636',
  green600: '#196c2e',
  green700: '#0f5323',
  green800: '#033a16',
  green900: '#04260f',
}

export const letterSpacings = {
  ls2: 2 / baseSize,
}

export const fontSizes = {
  fs12: 12 / baseSize,
  fs14: 14 / baseSize,
  fs16: 16 / baseSize,
  fs20: 20 / baseSize,
  fs24: 24 / baseSize,
  fs30: 30 / baseSize,
  fs36: 36 / baseSize,
  fs48: 48 / baseSize,
  fs60: 60 / baseSize,
}

export const breakPointMinimums = {
  tabletPortrait: 600 / baseSize,
  tabletLandscape: 900 / baseSize,
  laptop: 1200 / baseSize,
  desktop: 1800 / baseSize,
}

export const borderRads = {
  rad0: 0,
  rad4: 4,
  rad8: 8,
  rad16: 16,
  radFull: '50%',
}

export const sizes = {
  sz4: 4 / baseSize,
  sz8: 8 / baseSize,
  sz12: 12 / baseSize,
  sz16: 16 / baseSize,
  sz24: 24 / baseSize,
  sz32: 32 / baseSize,
  sz48: 48 / baseSize,
  sz64: 64 / baseSize,
  sz96: 96 / baseSize,
  sz128: 128 / baseSize,
  sz192: 192 / baseSize,
  sz256: 256 / baseSize,
  sz384: 384 / baseSize,
  sz512: 512 / baseSize,
  sz640: 640 / baseSize,
}

type SizesMembers = {
  [K in keyof typeof sizes]: string
}

export const sizesRem = keys(sizes).reduce((acc, key) => {
  acc[key] = `${sizes[key]}rem`
  return acc
}, {} as Record<string, string>) as SizesMembers
