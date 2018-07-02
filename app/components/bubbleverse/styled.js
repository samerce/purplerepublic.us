import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'

const aColor = '#956C95'

injectGlobal`
  div.bubbleButton-nolaMarch {
    top: 40px;
    left: 10px;
  }

  @keyframes fastBlink {
    0% {
      opacity: 1;
    }

    30% {
      opacity: .5
    }

    70% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: hidden;
  pointer-events: none;
  z-index: 2;

  &.start-show, &.start-arrange {
    pointer-events: all;
  }
`

export const BubbleGrid = styled.div`
  display: ${p => p.hidden? 'none' : 'flex'};
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 50px;
  pointer-events: all;

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    padding: 0;
  }
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  flex: 0 0 ${p => p.size}px;
  height: ${p => p.size}px;

  &:first-child {
    visibility: hidden;
    pointer-events: none;
  }

  @media (max-width: ${SCREEN_WIDTH_M_PX}) {
    height: ${p => p.size * (2/3)}px;
  }
`

export const BubbleEditingButtonsRoot = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  height: 80px;

`

export const ArrangeButton = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: fastBlink;
  animation-duration: 1s;
  ${'' /* animation-fill-mode: both; */}
  animation-timing-function: ${EASE_OUT};
  animation-iteration-count: infinite;
  animation-play-state: paused;
  visibility: hidden;
  z-index: 50;
  height: 100%;
  width: 100%;
  cursor: pointer;
  pointer-events: all;

  .start-arrange & {
    visibility: visible;
    ${'' /* animation-play-state: running; */}
  }

  &:hover i {
    background: white;
    color: ${aColor};
  }

  i {
    font-size: 30px;
    height: 50px;
    width: 50px;
    line-height: 50px;
    border-radius: 100%;
    background: ${aColor};
    transition: all .5s ${EASE_OUT};
    color: white;
    text-align: center;
  }
`
