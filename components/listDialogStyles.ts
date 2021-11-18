import styled from 'styled-components'
import { Dialog } from 'components/ui'
import { theme } from 'styles/themes'

export const ListDialogStyles = styled(Dialog)`
  .list-dialog-body {
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

  .list-dialog-nothing {
    margin-top: ${theme('sz56')};
    text-align: center;
  }

  .list-dialog-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${theme('sz64')};
  }

  .list-dialog-profile {
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

  .list-dialog-profile-img {
    flex-shrink: 0;
    margin-right: ${theme('sz12')};
    margin-left: ${theme('sz12')};
  }

  .list-dialog-profile-details {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list-dialog-profile-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .list-dialog-follow-button {
    position: absolute;
    right: ${theme('sz12')};
  }

  .list-dialog-following-removed {
    .list-dialog-profile {
      opacity: 0.35;
    }

    .list-dialog-follow-button {
      opacity: 0.35;

      &:hover,
      &:active,
      &:focus {
        opacity: 1;
      }
    }
  }
`
