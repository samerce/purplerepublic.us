import styled, {injectGlobal, keyframes, css} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon, Flex,
} from '../../global/styled'

export const Root = Flex.extend`
  align-items: flex-start;
  pointer-events: all;
  padding: 0 0 20px;
  align-content: flex-start;
  transition: all 1s ${EASE_OUT};
  z-index: 3;
  flex: 0 0 20%;
  overflow-x: scroll;

  ${p => p.hidden? `
    opacity: 0;
    pointer-events: none;
  ` : ''}
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  height: ${p => p.size}px;
  flex: 0 0 ${p => p.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${p => p.theme.veryLight};
  padding: 0 5px;
  transition: all .3s ${EASE_OUT};

  &.active {
    border: 1px solid ${p => p.theme.veryLight};
    border-top: none;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  &.gapItem {
    flex: 0 0 10px;
  }

  ${p => p.heroConfig && `
    flex: 0 0 ${p.heroConfig.width}px;
    justify-content: ${p.heroConfig.leftSide? 'flex-end' : 'initial'};
  `}

  ${p => p.hidden && `
    flex: 0 0 0;
    overflow: hidden;
    opacity: 0;
    padding: 0;
  `}
`

export const ArrangeButton = AbsoluteFlex.extend`
  top: 50px;
  left: 10px;
  align-items: center;
  justify-content: center;
  animation-name: fastBlink;
  animation-duration: 1s;
  animation-timing-function: ${EASE_OUT};
  animation-iteration-count: infinite;
  animation-play-state: paused;
  visibility: hidden;
  z-index: 25;
  height: 100%;
  width: 100%;
  cursor: pointer;
  pointer-events: all;

  .bubbleverse-arrange & {
    visibility: visible;
    animation-play-state: running;
  }
`

export const ArrangeIcon = Icon.extend`
  font-size: 30px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  border-radius: 100%;
  background: ${p => p.theme.main};
  transition: all .5s ${EASE_OUT};

  ${ArrangeButton}:hover & {
    background: white;
    color: ${p => p.theme.main};
  }
`
