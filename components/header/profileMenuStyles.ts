import styled from 'styled-components'
import { theme, themeProp } from 'styles/themes'

export const ProfileMenuStyles = styled.div`
  display: flex;

  .profile {
    position: relative;
    width: ${theme('sz32')};
    height: ${theme('sz32')};
    border: 1px solid ${theme('iconNav_Color')};
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .profile-image {
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .placeholder-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${theme('sz32')};
    height: ${theme('sz32')};
    border: 1px solid ${theme('iconNav_Color__Hover')};
    border-radius: ${theme('roundedCircle_BorderRadius')};
  }

  .profile-placeholder {
    color: ${theme('iconNav_Color')};
  }

  .profile-menu-button {
    border: none;

    &:hover,
    &:focus {
      .profile,
      .placeholder-wrapper {
        border: 1px solid ${theme('iconNav_Color__Hover')};
      }

      .placeholder-wrapper {
        border: 1px solid ${theme('iconNav_Color__Hover')};
      }

      .profile-placeholder {
        color: ${theme('iconNav_Color__Hover')};
      }
    }

    &:active {
      .profile,
      .placeholder-wrapper {
        border: 1px solid ${theme('iconNav_Color__Active')};
      }

      .profile-placeholder {
        color: ${theme('iconNav_Color__Active')};
      }
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .profile-menu-items {
      transition: none;
    }
  }

  .profile-menu-items {
    display: flex;
    flex-direction: column;
    width: ${theme('sz192')};
    background-color: ${theme('base_BgColor')};
    border-radius: ${theme('rounded_BorderRadius')};
    box-shadow: ${theme('panel_BoxShadow')};
    transform: scaleY(0.5);
    transform-origin: top center;
    opacity: 0;
    transition: ${themeProp('trans_OpacityTransform')};
  }

  [data-enter] {
    .profile-menu-items {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  .profile-menu-arrow {
    top: -40px;
    color: ${theme('base_BgColor')};
  }

  hr {
    width: 100%;
    margin-top: ${theme('sz4')};
    margin-bottom: ${theme('sz4')};
    opacity: 0.1;
  }

  .logout-button {
    padding-top: ${theme('sz8')};
    padding-bottom: ${theme('sz8')};
    border: none;
    border-radius: ${theme('roundedNone')} ${theme('roundedNone')}
      ${theme('rounded_BorderRadius')} ${theme('rounded_BorderRadius')};
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')};
    }
  }

  a {
    display: flex;
    align-items: center;
    padding-top: ${theme('sz8')};
    padding-right: ${theme('sz12')};
    padding-bottom: ${theme('sz8')};
    padding-left: ${theme('sz12')};
    color: ${theme('font_Color')};
    text-decoration: none;

    :first-child {
      border-radius: ${theme('rounded_BorderRadius')}
        ${theme('rounded_BorderRadius')} 0 0;
    }

    i {
      margin-right: ${theme('sz8')};
    }

    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')};
    }
  }
`
