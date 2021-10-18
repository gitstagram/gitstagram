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
    min-block-size: var(--app-height);
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
  ul,
  ol {
    padding: 0;
    list-style: none;
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

  /**
  * Resets iOS disabled opacity issues
  * https://stackoverflow.com/a/55876580/2957639
  */
  input:disabled,
  textarea:disabled,
  input:disabled::placeholder,
  textarea:disabled::placeholder {
    opacity: 1;
  }

  /**
  * Touch selection prevention
  */
  button,
  hr {
    user-select: none;
    -webkit-touch-callout: none;
  }

  /**
  * Sanitize.css overwrites
  */
  button {
    padding: 0;
  }
`
