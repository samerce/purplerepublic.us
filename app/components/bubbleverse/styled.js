import styled, {injectGlobal, keyframes} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon,
} from '../../global/styled'

injectGlobal`
  .bubbleverseSelectPill {
    top: 20px;
    left: initial;
    right: 20px;
    transform: translateY(-100px);

    .start-show & {
      transform: none;
      transition: transform 1s ${EASE_OUT} 6s;
    }
  }
`

const fastBlink = keyframes`
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
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: hidden;
  pointer-events: none;
  z-index: 3;

  &.start-show, &.start-arrange {
    pointer-events: all;
  }
`

export const BubbleEditingButtonsRoot = AbsoluteFlex.extend`
  bottom: 20px;
  right: 20px;
  flex-direction: column;
`
