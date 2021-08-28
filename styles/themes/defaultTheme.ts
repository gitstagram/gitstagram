import * as sys from 'styles/system'

export const defaultTheme = {
  tabletPortrait: `(min-width: ${sys.breakPointMinimums.tabletPortrait}rem)`,
  tabletLandscape: `(min-width: ${sys.breakPointMinimums.tabletLandscape}rem)`,
  laptop: `(min-width: ${sys.breakPointMinimums.laptop}rem)`,
  desktop: `(min-width: ${sys.breakPointMinimums.desktop}rem)`,

  font_FontSize: `${sys.fontSizes.fs16}rem`,
  font_FontFamily: sys.fontFamilies.default,

  font_Color: sys.monos.mc100,
  font_Color__Inverse: sys.monos.mc900,

  fontLogo_Family: sys.fontFamilies.logo,
  fontHero_FontSize: `${sys.fontSizes.fs60}rem`,

  fontTertiary_Size: `${sys.fontSizes.fs12}rem`,
  fontTertiary_Color: sys.monos.mc300,

  fontFooter_Size: `${sys.fontSizes.fs12}rem`,
  fontFooter_Color: sys.monos.mc900,

  fontLink_Color: sys.colors.blue300,

  root_BgColor: sys.monos.mc900,
  base_BgColor: sys.monos.mc700,
}
