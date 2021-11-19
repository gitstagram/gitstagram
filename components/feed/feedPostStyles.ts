import styled from 'styled-components'
import { theme } from 'styles/themes'

export const FeedPostStyles = styled.div`
  margin-bottom: ${theme('sz24')};

  .post-panel {
    padding: 0;
  }

  .post-header {
    display: flex;
    align-items: center;
    height: ${theme('sz64')};
  }

  .post-user {
    margin-right: ${theme('sz12')};
    margin-left: ${theme('sz24')};
  }

  .post-square {
    position: relative;
    width: 100%;
    border-top-left-radius: ${theme('roundedNone')};
    border-top-right-radius: ${theme('roundedNone')};
  }

  .post-square::after {
    display: block;
    padding-bottom: 100%;
    content: '';
  }

  .post-like-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: ${theme('trans_All')};

    i {
      transform: scale(2);
    }

    &.active {
      transform: scale(2.5);
      opacity: 1;
    }
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .post-like-overlay {
      transition: none;
    }
  }

  .post-action-row {
    display: flex;
    padding: ${theme('sz16')};

    i {
      margin-right: ${theme('sz8')};
    }

    .bi-heart-fill {
      color: ${theme('intentSplendid_Color')};
    }
  }

  .post-likes {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-description {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-comments {
    padding: ${theme('sz16')};
    padding-top: 0;
  }

  .post-time-ago {
    padding: ${theme('sz16')};
    padding-top: 0;
  }
`
