import styled from 'styled-components'
import { Dialog } from 'components/ui'
import { theme } from 'styles/themes'

export const FollowDialogStyles = styled(Dialog)`
  .follow-dialog-body {
    width: 95vw;
    max-width: ${theme('sz384')};
    height: 80vh;
    max-height: ${theme('sz384')};
    overflow-y: scroll;

    :last-child {
      border-radius: ${theme('roundedNone')} ${theme('roundedNone')}
        ${theme('rounded_BorderRadius')} ${theme('rounded_BorderRadius')};
    }
  }

  .follow-nothing {
    margin-top: ${theme('sz56')};
    text-align: center;
  }

  .follow-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${theme('sz64')};
  }

  .follow-profile {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${theme('font_Color')};
    text-decoration: none;

    &:hover,
    &:focus {
      background-color: ${theme('base_BgColor__Hover')};
    }

    &:active {
      background-color: ${theme('base_BgColor__Active')};
    }
  }

  .follow-profile-img {
    flex-shrink: 0;
    margin-right: ${theme('sz12')};
    margin-left: ${theme('sz12')};
  }

  .follow-profile-details {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .follow-profile-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .follow-button {
    position: absolute;
    right: ${theme('sz12')};
  }

  .following-removed {
    .follow-profile {
      opacity: 0.35;
    }

    .follow-button {
      opacity: 0.35;

      &:hover,
      &:active,
      &:focus {
        opacity: 1;
      }
    }
  }
`
