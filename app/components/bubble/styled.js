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
  ${'' /* animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: ${p => p.isFullscreen? 'none' : p.jiggler}; */}
  flex-direction: column;
  pointer-events: none;

  &.bubble-focused, &.bubble-editing {
    transition: transform .5s ${EASE_OUT}, background .3s ${EASE} .2s;
    position: fixed;
    pointer-events: all;
    overflow-y: scroll;
    overflow-x: hidden;
    background: rgba(0,0,0,.3);
    z-index: 30;
    animation-name: none;
  }
  &.bubble-willFocus {
    transition: none;
    position: fixed;
    animation-name: none;
  }
  &.bubble-willDefocus {
    position: fixed;
    transition: transform .4s ${EASE_OUT};
    animation-name: none;
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
