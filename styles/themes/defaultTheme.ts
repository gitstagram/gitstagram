import * as sys from 'styles/system'

const viewPorts = {
  maxWidth: `${sys.maxWidth}rem`,
  media_TabletPortrait: `(min-width: ${sys.breakPointMinimums.tabletPortrait}rem)`,
  media_TabletLandscape: `(min-width: ${sys.breakPointMinimums.tabletLandscape}rem)`,
  media_Laptop: `(min-width: ${sys.breakPointMinimums.laptop}rem)`,
  media_Desktop: `(min-width: ${sys.breakPointMinimums.desktop}rem)`,
}

const backgrounds = {
  root_Bg: `radial-gradient(ellipse at right bottom, ${sys.monos.mc600}, ${sys.monos.mc800})`,
  nav_Bg: sys.monos.mc800,
  base_BgColor: sys.monos.mc700,
  base_BgColor__Hover: sys.monos.mc500,
  base_BgColor__Active: sys.monos.mc600,
}

const boxShadows = {
  panel_BoxShadow: `${sys.monos.mc800} 0px 13px 27px -5px, ${sys.monos.mc800} 0px 8px 16px -8px`,
  button_BoxShadow: `inset 0px -3px 4px 2px rgb(0 0 0 / 15%)`,
}

const fonts = {
  font_FontSize: `${sys.fontSizes.fs16}rem`,
  font_FontFamily: sys.fontFamilies.default,

  font_Color: sys.monos.mc100,
  font_Color__Inverse: sys.monos.mc900,

  fontLogo_Family: sys.fontFamilies.logo,
  fontLogo_FontSize: `${sys.fontSizes.fs60}rem`,
  fontLogo_FontSize__Small: `${sys.fontSizes.fs36}rem`,
  fontLogo_Color: sys.monos.mc000,
  fontLogo_Color__Emboss: sys.monos.mc300,
  fontLogo_LetterSpacing: `-${sys.letterSpacings.ls2}rem`,

  fontHero_FontSize: `${sys.fontSizes.fs30}rem`,

  fontSecondary_Color: sys.monos.mc200,

  fontTertiary_Color: sys.monos.mc400,
  fontTertiary_FontSize: `${sys.fontSizes.fs14}rem`,

  fontFooter_FontSize: `${sys.fontSizes.fs12}rem`,
  fontFooter_Color: `rgba(0, 0, 0, 0.65)`,

  fontLink_Color: sys.colors.blue400,
  fontLink_Color__Hover: sys.colors.blue300,
  fontLink_Color__Active: sys.colors.blue500,

  fontLink_FontSize__Deemph: `${sys.fontSizes.fs14}rem`,
  fontLink_Color__Deemph: sys.monos.mc400,
  fontLink_Color__Deemph_Hover: sys.monos.mc300,
  fontLink_Color__Deemph_Active: sys.monos.mc500,

  fontButton_Color: sys.monos.mc000,

  fontAttn_FontSize: `${sys.fontSizes.fs12}rem`,
  fontAttn_Color: `${sys.monos.mc400}`,

  fontCode_BgColor: `${sys.monos.mc000}`,
  fontCode_Color: `${sys.monos.mc900}`,
}

const intentionColors = {
  intentPrimary_Color: sys.colors.yellow400,

  intentSuccess_Color: sys.colors.green500,
  intentSuccess_Color__Hover: sys.colors.green400,
  intentSuccess_Color__Active: sys.colors.green600,
}

const iconColors = {
  iconNav_Color: sys.monos.mc300,
  iconNav_Color__Hover: sys.monos.mc200,
  iconNav_Color__Active: sys.monos.mc400,
}

const opacityAnimate = `opacity ${sys.transitionSpeeds.trans150}ms ease-in-out`
const transformAnimate = `transform ${sys.transitionSpeeds.trans150}ms ease-in-out`

const transitions = {
  trans_Speed: `${sys.transitionSpeeds.trans150}`,
  trans_Opacity: opacityAnimate,
  trans_Transform: transformAnimate,
  trans_OpacityTransform: `${opacityAnimate}, ${transformAnimate}`,
}

const roundedRadius = {
  roundedNone: `${sys.borderRads.rad0}px`,
  roundedSmall_BorderRadius: `${sys.borderRads.rad4}px`,
  rounded_BorderRadius: `${sys.borderRads.rad8}px`,
  roundedLarge_BorderRadius: `${sys.borderRads.rad16}px`,
  roundedCircle_BorderRadius: sys.borderRads.radFull,
}

export const defaultTheme = {
  ...sys.iconSizesRem,
  ...sys.sizesRem,
  ...viewPorts,
  ...backgrounds,
  ...boxShadows,
  ...fonts,
  ...intentionColors,
  ...iconColors,
  ...transitions,
  ...roundedRadius,
}
