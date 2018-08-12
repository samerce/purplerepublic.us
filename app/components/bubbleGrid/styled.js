import styled, {injectGlobal, keyframes} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon,
} from '../../global/styled'

export const Root = AbsoluteFlexFillParent.extend`
  display: ${p => p.hidden? 'none' : 'flex'};
  flex-wrap: wrap;
  align-items: flex-start;
  pointer-events: all;
  padding: 20px 50px 20px 20px;
  align-content: flex-start;
  overflow: scroll;
`

export const BubbleGridItem = styled.div`
  position: relative;
  pointer-events: none;
  flex: 0 0 ${p => p.size}px;
  height: ${p => p.size}px;
  margin: 5px;

  &:first-child {
    visibility: hidden;
  }

  ${screen.medium`
    height: ${p => p.size * .47}px;
    flex: 0 0 ${p => p.size * .47}px;
  `}

  ${p => p.hidden && `
    flex: 0 0 0;
    overflow: hidden;
    margin: 0;
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

  .start-arrange & {
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
