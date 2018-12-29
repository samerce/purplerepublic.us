import styled, {injectGlobal, keyframes} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon, Flex,
  CloseButton as aCloseButton, ExpandingBackground,
} from '../../global/styled'

export const Root = Flex.extend`
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 3;
  overflow-y: scroll;
  opacity: 0;
  transition: all .5s ${EASE_OUT};

  &.bubbleverse-show, &.bubbleverse-enter, &.bubbleverse-arrange {
    opacity: 1;
    pointer-events: all;
    transition: none;
  }
  &.bubbleverse-willExit, &.bubbleverse-exit {
    opacity: 1;
  }
`

export const BubbleEditingButtonsRoot = AbsoluteFlex.extend`
  bottom: 20px;
  right: 20px;
  flex-direction: column;
`

export const CloseButton = aCloseButton.extend`
  position: absolute;
  right: 15px;
  top: 15px;
  transform: scale(0);
  opacity: 0;
  z-index: 4;

  .bubbleverse-show &, .bubbleverse-enter & {
    opacity: 1;
    transform: none;
  }
`

export const Background = ExpandingBackground.extend`
  .bubbleverse-show &, .bubbleverse-enter & {
    transform: scale(2);
    transition-duration: 2s;
  }
  .bubbleverse-exit &, .bubbleverse-willExit & {
    opacity: 0;
  }
`
