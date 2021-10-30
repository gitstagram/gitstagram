import * as sys from 'styles/system'
import { percentToHex } from 'styles/utilities'

const viewPorts = {
  maxWidth: `${sys.maxWidth}rem`,
  appPadding: `${sys.sizes.sz32}rem`,
}

const rootGradientColor1 = sys.monos.mc600
const rootGradientColor2 = sys.monos.mc800

const backgrounds = {
  root_Bg__Gradient1: rootGradientColor1,
  root_Bg__Gradient2: rootGradientColor2,
  html_Bg: rootGradientColor2,
  root_Bg: `radial-gradient(ellipse at right bottom, ${rootGradientColor1}, ${rootGradientColor2})`,
  nav_Bg: sys.monos.mc800,
  base_BgColor: sys.monos.mc700,
  base_BgColor__Hover: sys.monos.mc500,
  base_BgColor__Active: sys.monos.mc600,
  base_BgColor__Emph: sys.monos.mc600,
  dialog_BgColor: `${sys.monos.mc600}${percentToHex(50)}`,
  tableRow_BgColor__THead: sys.monos.mc800,
  tableRow_BgColor__TRowOdd: sys.monos.mc600,
  checkbox_BgColor: sys.monos.mc800,
  checkbox_BgColor__Checked: sys.monos.mc600,
  inset_BgColor__Hover: sys.monos.mc700,
  inset_BgColor__Active: `${sys.monos.mc700}${percentToHex(50)}`,
}

const boxShadows = {
  panel_BoxShadow: `${sys.monos.mc800} 0px 13px 27px -5px, ${sys.monos.mc800} 0px 8px 16px -8px`,
  button_BoxShadow: `inset 0px -3px 4px 2px rgb(0 0 0 / 15%)`,
  input_BoxShadow__Focus: `${sys.colors.blue200} 0 0 0 1px`,
  inset_BoxShadow: `${sys.monos.mc900} 3px 3px 6px 0 inset, ${sys.monos.mc600} -3px -3px 6px 1px inset`,
  float_BoxShadow: `${sys.monos.mc800} 10px 10px 9px 2px`,
}

const fonts = {
  font_FontSize: `${sys.fontSizes.fs16}rem`,
  font_FontFamily: sys.fontFamilies.default,
  font_FontSize__Skeleton: `${sys.fontSizes.fs20}rem`,

  font_Color: sys.monos.mc100,
  font_Color__Inverse: sys.monos.mc900,
  font_Color__Deemph: sys.monos.mc300,
  font_FontSize__Deemph: `${sys.fontSizes.fs14}rem`,
  font_Color__Hilite: sys.monos.mc200,
  font_Color__Hilite_Active: sys.monos.mc100,

  fontLogo_Family: sys.fontFamilies.logo,
  fontLogo_FontSize__Large: `${sys.fontSizes.fs60}rem`,
  fontLogo_FontSize__Small: `${sys.fontSizes.fs36}rem`,
  fontLogo_Color: sys.monos.mc000,
  fontLogo_ShadowColor: sys.monos.mc300,
  fontLogo_LetterSpacing: `-${sys.letterSpacings.ls2}rem`,
  fontLogo_FontWeight: 'normal',

  fontHero_FontSize: `${sys.fontSizes.fs30}rem`,

  fontH2_Color: sys.monos.mc100,
  fontH2_FontSize: `${sys.fontSizes.fs30}rem`,
  fontH2_Weight: 'normal',

  fontH3_Color: sys.monos.mc100,
  fontH3_FontSize: `${sys.fontSizes.fs20}rem`,
  fontH3_FontWeight: 'normal',

  fontSecondary_Color: sys.monos.mc200,
  fontSecondary_FontWeight: 'bold',

  fontTertiary_Color: sys.monos.mc400,
  fontTertiary_FontSize: `${sys.fontSizes.fs14}rem`,

  fontFooter_FontSize: `${sys.fontSizes.fs12}rem`,
  fontFooter_Color: `rgba(0, 0, 0, 0.65)`,

  fontLink_Color: sys.colors.blue400,
  fontLink_Color__Hover: sys.colors.blue300,
  fontLink_Color__Active: sys.colors.blue500,
  fontLink_FontWeight__Bold: 'bold',

  fontLink_FontSize__Deemph: `${sys.fontSizes.fs14}rem`,
  fontLink_Color__Deemph: sys.monos.mc400,
  fontLink_Color__Deemph_Hover: sys.monos.mc300,
  fontLink_Color__Deemph_Active: sys.monos.mc500,

  fontLabel_FontWeight: 'bold',
  fontLabel_FontSize: `${sys.fontSizes.fs14}rem`,

  fontButton_Color: sys.monos.mc000,
  fontButton_Color__Invert: sys.monos.mc200,
  fontButton_FontWeight: 'bold',
  fontButton_FontWeight__Large: 'normal',
  fontButton_FontSize__Small: `${sys.fontSizes.fs14}rem`,

  fontAttn_FontSize: `${sys.fontSizes.fs12}rem`,
  fontAttn_Color: sys.monos.mc400,
  fontAttn_FontWeight: 'bold',
  fontAttn_TextTransform: 'uppercase',

  fontInfo_FontSize: `${sys.fontSizes.fs14}rem`,
  fontInfo_Color: sys.monos.mc400,
  fontInfo_FontStyle: 'italic',

  fontCode_BgColor: sys.monos.mc000,
  fontCode_Color: sys.monos.mc900,

  fontHEmboss_FontSize: `${sys.fontSizes.fs36}rem`,
  fontHEmboss_Color: sys.monos.mc500,
  fontHEmboss_ShadowColor: sys.monos.mc800,
  fontHEmboss_FontWeight: 'bold',

  fontTextEmboss_Color: sys.monos.mc500,
  fontTextEmboss_ShadowColor: sys.monos.mc400,

  fontPlaceholder_Color: sys.monos.mc400,
  fontPlaceholder_Opacity: 0.8,
  fontPlaceholder_FontSize: `${sys.fontSizes.fs16}rem`,
  fontPlaceholder_Color__Deemph: sys.monos.mc500,

  fontCheckbox_Color: sys.monos.mc100,
  fontCheckbox_FontSize: `${sys.fontSizes.fs16}rem`,
  fontCheckbox_FontWeight: 'bold',
}

const textShadows = {
  overlay_TextShadow: `0 -2px 0 rgba(255, 255, 255, 0.5)`,
  logo_TextShadow__Hover: `0 0 2px ${fonts.fontLogo_ShadowColor}`,
  logo_TextShadow__Active: `0 0 5px ${fonts.fontLogo_ShadowColor}`,
  hEmboss_TextShadow: `3px -3px 0 ${fonts.fontHEmboss_ShadowColor}`,
  textEmboss_TextShadow: `1px 0 1px ${fonts.fontTextEmboss_ShadowColor}`,
}

const intentionColors = {
  intentPrimary_Color: sys.colors.yellow400,
  intentPrimary_Color__Hover: sys.colors.yellow300,
  intentPrimary_Color__Active: sys.colors.yellow500,

  intentNaked_Color: sys.monos.mc200,
  intentNaked_Color__Hover: sys.monos.mc000,
  intentNaked_Color__Active: sys.monos.mc300,

  intentSuccess_Color: sys.colors.green500,
  intentSuccess_Color__Hover: sys.colors.green400,
  intentSuccess_Color__Active: sys.colors.green600,

  intentWarning_Color: sys.colors.yellow300,
  intentWarning_Color__Active: sys.colors.yellow500,

  intentDanger_Color: sys.colors.red500,
  intentDanger_Color__Active: sys.colors.red700,

  intentDisabled_Color: sys.monos.mc600,
  intentDisabled_Color__Accent: sys.monos.mc400,
}

const iconColors = {
  iconNav_Color: sys.monos.mc300,
  iconNav_Color__Hover: sys.monos.mc200,
  iconNav_Color__Active: sys.monos.mc400,

  iconInput_Color: sys.monos.mc200,
  iconInput_Color__Hover: sys.monos.mc000,
  iconInput_Color__Active: sys.monos.mc300,
}

const borderColors = {
  input_BorderColor: sys.monos.mc500,
  input_BorderColor__Hover: sys.monos.mc400,
  input_BorderColor__Focus: sys.monos.mc300,
  input_BorderColor__Active: sys.monos.mc200,

  hr_BorderColor: sys.monos.mc300,
  hr_BorderColor__Deemph: sys.monos.mc600,

  buttonInvert_Border_Color: sys.monos.mc400,
}

const transitionSpeed = sys.transitionSpeeds.trans150
const opacityAnimate = `opacity ${transitionSpeed}ms ease-in-out`
const transformAnimate = `transform ${transitionSpeed}ms ease-in-out`
const colorAnimate = `color ${transitionSpeed}ms ease-in-out`
const bgColorAnimate = `background-color ${transitionSpeed}ms ease-in-out`
const rotation = `rotation 6s linear infinite`

const transitions = {
  trans_Speed: transitionSpeed,
  trans_Opacity: opacityAnimate,
  trans_Transform: transformAnimate,
  trans_OpacityTransform: `${opacityAnimate}, ${transformAnimate}`,
  trans_Color: colorAnimate,
  trans_BgColor: bgColorAnimate,
  trans_ColorBgColor: `${colorAnimate}, ${bgColorAnimate}`,
  trans_Rotation: rotation,
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
  ...textShadows,
  ...intentionColors,
  ...iconColors,
  ...borderColors,
  ...transitions,
  ...roundedRadius,
}
