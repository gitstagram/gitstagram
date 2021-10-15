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
    height: ${theme('sz64')};
  }

  .search-item-img {
    margin-left: ${theme('sz8')};
  }

  .search-item-name {
    margin-left: ${theme('sz12')};
  }
`
