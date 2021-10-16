import styled from 'styled-components'
import { theme, themeConstant } from 'styles/themes'

export const SearchBoxStyles = styled.div`
  width: 100%;

  [data-leave] {
    visibility: hidden;
  }

  .search-menu {
    width: 90vw;
    max-width: ${theme('sz384')};
    height: 65vh;
    margin-right: auto;
    margin-left: auto;
    overflow: scroll;
  }

  ${themeConstant('media__TabletLandscape')} {
    .search-menu {
      width: ${theme('sz384')};
      height: 40vh;
    }
  }

  .search-prompt {
    margin-top: ${theme('sz56')};
    text-align: center;
  }

  .search-item {
    flex-shrink: 0;
    width: 100%;
    padding: ${theme('sz16')} ${theme('sz24')};
  }

  .search-item-img {
    flex-shrink: 0;
  }

  .search-item-text {
    width: calc(100% - 50px);
    margin-left: ${theme('sz12')};
  }

  .search-item-headline {
    display: flex;
    align-items: center;
  }

  .search-item-login {
    max-width: 55%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .search-item-byline {
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
