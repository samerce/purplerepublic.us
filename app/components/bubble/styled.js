import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE_IN_OUT_SINE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../global/constants'

const aColor = '#956C95'

injectGlobal`
  .logo-svg-root {
    background: white;
    width: 120px;
    height: 120px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const Root = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 10;
  animation-name: jiggle;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_IN_OUT_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .7s ${EASE_OUT};
  width: 100%;
  height: 100%;
  pointer-events: none;

  &.bubble-focused, &.bubble-expanded {
    left: 0;
    top: 0;
    transition: 1s ${EASE_OUT};
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    left: 40px;

    &.bubble-focused {
      top: 20px;
    }
    &.bubble-expanded {
      top: -180px;
    }
  }

  @media (max-width: ${SCREEN_WIDTH_S_PX}) {
    &.bubble-expanded {
      top: -380px;
    }
  }
`
