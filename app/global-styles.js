import { injectGlobal } from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT} from './global/constants'

const getRandInt = range => Math.ceil(Math.random() * range)
const getRand = range => `${getRandInt(range)}px`

const aColor = '#956C95'

let jiggleIndex = 0
export const makeJiggler = () => {
  const name = 'jiggle' + jiggleIndex
  injectGlobal`
    @keyframes ${name} {
      0% {
        transform: translate(${getRand(6)}, ${getRand(5)});
      }

      25% {
        transform: translate(${getRand(-6)}, ${getRand(-4)});
      }

      50% {
        transform: translate(${getRand(4)}, ${getRand(-6)});
      }

      75% {
        transform: translate(${getRand(-6)}, ${getRand(2)});
      }

      100% {
        transform: translate(${getRand(5)}, ${getRand(-5)});
      }
    }
  `
  jiggleIndex++
  return name
}

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background: white;
    overflow: hidden;
    span, div, input, textarea {
      outline-color: ${lighten(.4, aColor)} !important;
    }
  }

  body {
    font-family: 'IM Fell DW Pica', 'Helvetica Neue', Helvetica, sans-serif;
  }

  body.fontLoaded {
    font-family: 'IM Fell DW Pica', 'Open Sans', 'Helvetica Neue', Helvetica, serif;
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

  @keyframes jiggle {
    0% {
      transform: translate(${getRand(6)}, ${getRand(5)});
    }

    25% {
      transform: translate(${getRand(-6)}, ${getRand(-4)});
    }

    50% {
      transform: translate(${getRand(4)}, ${getRand(-6)});
    }

    75% {
      transform: translate(${getRand(-6)}, ${getRand(2)});
    }

    100% {
      transform: translate(${getRand(5)}, ${getRand(-5)});
    }
  }

  @keyframes blinking {
    from {
      opacity: 1;
    }

    to {
      opacity: .3;
    }
  }

`
