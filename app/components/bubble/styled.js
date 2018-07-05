import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
} from '../../global/constants'
import {screen, AbsoluteFlexFillParent} from '../../global/styled'

const aColor = '#956C95'

export const Root = AbsoluteFlexFillParent.extend`
  z-index: 10;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  flex-direction: column;
  transition: all .7s ${EASE_OUT};
  pointer-events: none;

  &.bubble-focused, &.bubble-editing {
    transition: top .5s, left .5s, background .5s ${EASE} .3s;
    transition-timing-function: ${EASE_OUT};
    position: fixed;
    pointer-events: all;
    overflow-y: scroll;
    overflow-x: hidden;
    background: rgba(0,0,0,.3);
    z-index: 30;
  }
  &.bubble-willFocus {
    transition: none;
    position: fixed;
  }
  &.bubble-willDefocus {
    position: fixed;
    transition: top .7s, left .7s;
    transition-timing-function: ${EASE_OUT};
  }
  &.bubble-defocused {
    transition: none;
  }
  &.bubble-editing {
    padding: 120px 0 120px 250px;
  }

  ${screen.medium`
    &.bubble-focused {
      margin-top: 20px;
    }
  `}
`
