import styled from 'styled-components'
import { theme, themeConstant } from 'styles/themes'

export const removeTooltipId = 'remove-tooltip'

export const NewStyles = styled.div`
  width: 100%;
  max-width: ${theme('sz384')};
  margin-right: auto;
  margin-left: auto;

  form {
    width: 100%;
  }

  .post-square {
    position: relative;
    width: 100%;
    border-radius: ${theme('roundedLarge_BorderRadius')};
    box-shadow: ${theme('inset_BoxShadow')};

    &:hover,
    &:focus {
      background-color: ${theme('inset_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('inset_BgColor__Active')};
    }

    &.post-square-loading {
      &:hover,
      &:focus,
      &:active {
        background-color: inherit;
      }
    }

    &.post-upload-loading {
      img {
        filter: brightness(0.5);
      }
    }
  }

  .post-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .post-square-content {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    div:first-child {
      border-radius: ${theme('roundedLarge_BorderRadius')};
      box-shadow: ${theme('float_BoxShadow')};
    }
  }

  [aria-describedby=${removeTooltipId}] {
    position: absolute;
    top: ${theme('sz12')};
    right: ${theme('sz12')};
  }

  .post-remove-button {
    width: ${theme('sz32')};
    height: ${theme('sz32')};
  }

  .post-preview-image {
    object-fit: cover;
  }

  .post-select-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
  }

  .post-label-loading {
    cursor: not-allowed;
  }

  .post-loading-icon {
    color: ${theme('font_Color__Deemph')};
  }

  .post-caption-panel {
    display: flex;
    width: 100%;
    margin-top: ${theme('sz12')};
  }

  .post-user-icon {
    flex-shrink: 0;
  }

  .post-caption-input {
    width: 100%;
    margin-left: ${theme('sz8')};

    textarea {
      min-height: ${theme('sz96')};
    }
  }

  .post-submit {
    position: sticky;
    bottom: ${theme('sz64')};
    margin-top: ${theme('sz24')};

    ${themeConstant('media__TabletLandscape')} {
      bottom: ${theme('sz16')};
    }

    button {
      min-width: ${theme('sz256')};
      height: ${theme('sz48')};
    }
  }
`
