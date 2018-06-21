import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
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

  .nolaEvent-emphasis {
    font-family: gloria Hallelujah;
    font-size: 22px;
  }
  .nolaEvent-venue {
    font-size: 24px;
    color: ${darken(.3, aColor)};
  }
  .nolaEvent-attire {
    color: ${darken(.3, aColor)};
  }
`

export const Root = styled.div`
  position: absolute;
  z-index: 10;
  animation-duration: 10s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_SINE};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .7s ${EASE_OUT};
  width: 100%;
  height: 100%;
  pointer-events: none;

  &.bubble-focused, &.bubble-expanded, &.bubble-editing {
    transition: top .5s, left .5s, background .5s ${EASE} .3s;
    transition-timing-function: ${EASE_OUT};
    position: fixed;
    height: 100%;
    pointer-events: all;
    overflow-y: scroll;
    overflow-x: hidden;
    background: rgba(0,0,0,.3);
    z-index: 30;
  }
  &.bubble-willFocus {
    transition: none;
    position: fixed;
    height: 100%;
  }
  &.bubble-willDefocus {
    position: fixed;
    height: 100%;
    transition: top .7s, left .7s;
    transition-timing-function: ${EASE_OUT};
  }
  &.bubble-defocused {
    transition: none;
  }
  &.bubble-editing {
    padding-top: 120px;
    padding-left: 250px;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    ${'' /* left: 40px; */}

    &.bubble-focused {
      top: 20px;
      ${'' /* left: 40px; */}
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
