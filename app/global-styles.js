import { injectGlobal } from 'styled-components'
import {EASE_OUT} from './global/constants'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background: white;
    overflow: hidden;
  }

  body {
    font-family: 'averia sans libre', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'averia sans libre', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100%;
    min-height: 100%;
    min-width: 100%;
    position: relative;
    overflow: hidden;
  }

  [data-reactroot] {
    height: 100%;
  }

  input {
    transition: all .3s ${EASE_OUT};
  }

  .route {
    transition-timing-function: ${EASE_OUT};
    position: absolute;

    &.entering {
      opacity: 0;
      transform: translateX(30%);
      transition: opacity .3s, transform .4s;
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
