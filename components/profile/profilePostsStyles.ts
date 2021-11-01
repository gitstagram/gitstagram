import styled from 'styled-components'
import { theme, themeConstant } from 'styles/themes'

export const ProfilePostsStyles = styled.div`
  .posts-empty {
    margin-top: ${theme('sz56')};
  }

  .posts-grid {
    width: 100vw;
    max-width: ${theme('maxWidth')};
    margin-top: ${theme('sz24')};
    margin-left: calc(-1 * ${theme('appPadding')});
  }

  ${themeConstant('media__TabletLandscape')} {
    .posts-grid {
      margin-top: 0;
      padding: ${theme('appPadding')};
    }
  }

  .posts-square-row {
    display: flex;
    margin-bottom: ${theme('sz4')};

    ${themeConstant('media__TabletLandscape')} {
      margin-bottom: ${theme('sz24')};
    }
  }

  .posts-square-overlay {
    display: none;
  }

  ${themeConstant('media__TabletLandscape')} {
    .posts-square-overlay {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${theme('font_Color')};
      background-color: ${theme('shroud_BgColor')};
      border-radius: ${theme('roundedSmall_BorderRadius')};
      opacity: 0;
      transition: ${theme('trans_Opacity__Long')};

      @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }

  .posts-overlay-stats {
    display: flex;
    align-items: center;
    opacity: 0;
    transition: ${theme('trans_Opacity__Long')};

    @media screen and (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &:first-child {
      margin-right: ${theme('sz24')};
    }

    i {
      margin-right: ${theme('sz8')};
    }
  }

  .posts-square {
    position: relative;
    width: 100%;
    margin-right: ${theme('sz4')};

    ${themeConstant('media__TabletLandscape')} {
      margin-right: ${theme('sz24')};
    }

    &:hover,
    &:focus {
      .posts-square-overlay {
        opacity: 1;
      }

      .posts-overlay-stats {
        opacity: 1;
      }
    }

    &:active {
      filter: brightness(80%);
    }
  }

  .posts-square:last-child {
    margin-right: 0;
  }

  .posts-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .posts-square-content {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .posts-image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .posts-square-image {
    object-fit: cover;
    border-radius: ${theme('roundedSmall_BorderRadius')};
  }

  .posts-square-invalid {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: ${theme('fontInfo_Color')};
    background-color: ${theme('base_BgColor__Emph')};
    border-radius: ${theme('roundedSmall_BorderRadius')};

    &:hover,
    &:focus {
      filter: brightness(95%);
    }

    &:active {
      filter: initial;
    }
  }
`
