import { createGlobalStyle } from 'styled-components'
import { customResets } from 'styles/customResets'
import { theme, Theme, defaultTheme } from 'styles/themes'
import { keys } from 'helpers'
import { zIndicies } from 'styles/zIndicies'

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

  #__next {
    height: 100%;
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

  .glb-skeleton {
    background-color: ${theme('font_Color')};
    border-radius: ${theme('roundedSmall_BorderRadius')};
    opacity: 0.3;
    animation-name: skeleton;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;

    @keyframes skeleton {
      0% {
        opacity: 0.1;
      }

      50% {
        background: 0.3;
      }

      100% {
        background: 0.1;
      }
    }

    @media screen and (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .glb-rotate {
    animation: ${theme('trans_Rotation')};

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(359deg);
      }
    }

    @media screen and (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  .glb-clip-hide {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
  }

  .glb-nav-tooltip {
    z-index: ${zIndicies.navTooltip};
  }
`
