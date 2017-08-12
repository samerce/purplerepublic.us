import { injectGlobal } from 'styled-components'
import {EASE_OUT} from './global/constants'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background: rgba(87, 5, 76, .8);
  }

  body {
    font-family: 'averia sans libre', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'averia sans libre', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input {
    transition: all .3s ${EASE_OUT};
  }

  .route {
    transition-timing-function: ${EASE_OUT};
    position: absolute;

    &.entering {
      opacity: 0;
      transform: translateX(40%);
      transition: opacity .4s, transform .5s;
      z-index: 3;

      &.entering-active {
        opacity: 1;
        transform: none;
      }
    }
    &.entered {
      opacity: 1;
      z-index: 3;
    }
    &.exiting {
      transform: none;
      transition: transform .5s;
      z-index: 2;

      &.exiting-active {
        transform: translateX(-200px);
      }
    }
  }
`
