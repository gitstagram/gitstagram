import * as sys from 'styles/system'

export const defaultTheme = {
  // Root font size in px, all other sizes in rem
  font_Size: `${sys.baseSize}px`,
  font_Family: sys.fontFamily,

  font_Color: sys.monos.mc100,
  font_Color__Inverse: sys.monos.mc900,

  fontTertiary_Size: `${sys.fontSizes.fs12}rem`,
  fontTertiary_Color: sys.monos.mc300,

  root_BgColor: sys.monos.mc900,
  base_BgColor: sys.monos.mc700,

  link_Color: sys.colors.blue300,
}
