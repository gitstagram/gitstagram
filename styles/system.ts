export const baseSize = 16

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
