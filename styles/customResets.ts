import { css } from 'styled-components'

export const customResets = css`
  /**
  * Border box everything
  */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /**
  * Full viewport body
  */
  body {
    min-block-size: 100vh;
  }

  /**
  * Remove element margins
  */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /**
  * Remove list styles
  */
  ul[class],
  ol[class] {
    list-style: none;
    padding: 0;
  }

  /**
  * Responsive block images
  */
  img {
    display: block;
    max-inline-size: 100%;
  }

  /**
  * Text readability
  */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  figcaption {
    max-width: 60ch;
  }
`
