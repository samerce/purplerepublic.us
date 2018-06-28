import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'

const aColor = '#498359'
let CIRCLE_SIZE_SMALL = 60
let CIRCLE_SIZE_MEDIUM = 80
let CIRCLE_SIZE_LARGE = 150
let CIRCLE_SIZE_FOCUSED = CIRCLE_SIZE_SMALL

if (window.innerWidth <= SCREEN_WIDTH_M) {
  CIRCLE_SIZE_SMALL = 40
  CIRCLE_SIZE_MEDIUM = 60
  CIRCLE_SIZE_LARGE = 80
}

injectGlobal`
  .bubbleBuilderButton {
    z-index: 30;
    position: relative;
    width: initial;
    height: initial;
    margin: 0 10px;

    i {
      font-size: 40px;
      color: white;
      border-radius: 100%;
      border: 1px solid white;
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      background: ${aColor};
      transition: all 1s ${EASE_OUT};

      &:hover {
        transform: scale(.9);
      }
      &:active {
        transform: scale(.85);
      }
      .bubbleArrangeActive & {
        background: ${darken(.2, aColor)};
        transform: scale(1.1);
      }
    }
  }
`
