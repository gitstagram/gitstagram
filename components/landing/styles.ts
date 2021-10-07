import styled from 'styled-components'
import { theme, themeConstant } from 'styles/themes'

export const LandingStyles = styled.div`
  flex-grow: 1;
  width: 100%;
  text-align: center;

  .logo {
    margin-bottom: ${theme('sz8')};
  }

  .hero {
    margin-bottom: ${theme('sz12')};
  }

  .benefit-list {
    width: fit-content;
    margin-right: auto;
    margin-bottom: ${theme('sz12')};
    margin-left: auto;
    text-align: left;

    li {
      margin-bottom: ${theme('sz4')};
    }
  }

  .login-panel {
    max-width: ${theme('sz512')};
    margin-right: auto;
    margin-bottom: ${theme('sz4')};
    margin-left: auto;
  }

  .explain-title {
    margin-bottom: ${theme('sz4')};
  }

  .explain-list {
    text-align: left;
    list-style: circle;
    list-style-position: inside;
  }

  .sign-up {
    display: block;
    margin-top: ${theme('sz16')};
    margin-bottom: ${theme('sz24')};
  }

  .login {
    width: calc(${theme('sz16')} * 2 + 100%);
    margin: calc(${theme('sz16')} * -1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${themeConstant('media__TabletLandscape')} {
    position: relative;

    .left-column {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 50%;
      max-height: ${theme('sz512')};
      margin-top: auto;
      margin-bottom: auto;
      padding-right: ${theme('sz48')};
      padding-left: ${theme('sz48')};
      text-align: left;

      .benefit-list {
        margin-left: 0;
      }
    }

    .right-column {
      position: absolute;
      top: 50%;
      right: 0;
      width: 50%;
      padding-right: ${theme('sz48')};
      padding-left: ${theme('sz48')};
      transform: translate(0, -50%);

      .mobile-preview {
        position: absolute;
        top: -120%;
        left: -5%;
        display: block;
        width: ${theme('sz256')};
        height: ${theme('sz512')};
      }

      .mobile-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 84%;
        height: 65%;
        transform: translate(-50%, -50%);
      }

      .login-panel {
        position: relative;
      }
    }
  }
`
