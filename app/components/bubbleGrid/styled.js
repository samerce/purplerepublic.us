import styled, {injectGlobal, keyframes, css} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon, Flex,
} from '../../global/styled'

export const Root = Flex.extend`
  flex-wrap: wrap;
  align-items: flex-start;
  pointer-events: all;
  padding: 20px 50px 20px 20px;
  align-content: flex-start;
  transition: all 1s ${EASE_OUT};
  z-index: 3;
  ${p => p.hidden? `
    opacity: 0;
    pointer-events: none;
  ` : ''}
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  flex: 0 0 ${p => p.size}px;
  height: ${p => p.size}px;
  margin: 5px;
  display: flex;
  transition: all 1s ${EASE_OUT} .3s;

  ${p => p.heroConfig && `
    flex: 0 0 ${p.heroConfig.width}px;
    justify-content: ${p.heroConfig.leftSide? 'flex-end' : 'initial'};
  `}

  ${p => p.hidden && `
    flex: 0 0 0;
    overflow: hidden;
    margin: 0;
    opacity: 0;
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
