import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'
import {
  Icon as aIcon, BubbleButton, InlineBlock, screen, AbsoluteFlex,
} from '../../../global/styled'

export const Root = InlineBlock.extend`
  transition: transform .7s ${EASE_OUT};
  z-index: 8;
  pointer-events: ${p => p.disabled? 'none' : 'all'};
  cursor: pointer;
  position: relative;

  &.bubble-focused {
    transition-duration: .8s;
    pointer-events: none;
  }

  &.bubble-editing {
    position: absolute;
    pointer-events: none;
    transform: scale(.5);
  }

  &.bubble-willFocus, &.bubble-willDefocus {
  }

  &.bubble-willEnter {
    transition: none;
    transform: scale(0);
  }

  &.bubble-enter {
    transition: all 1s ${EASE_OUT};
  }
`

export const ImageBubbleButton = BubbleButton.extend`
  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border-width: 2px;
  width: ${p => p.size}px;
  height: ${p => p.size}px;

  .active & {
    border: 1px solid ${p => p.theme.slightlyDark};
    box-shadow:
      inset 2px 2px 20px ${p => alpha(.5, p.theme.veryDark)},
      inset -2px -2px 20px ${p => alpha(.5, p.theme.veryDark)};
    cursor: default;
    pointer-events: none;
  }

  &:hover, &:active {
    transform: none;
    box-shadow: none;
  }

  ${Root}:hover & {
    transform: scale(1.1);
    box-shadow: ${p => p.theme.shadowHeavy};
  }
  ${Root}:active & {
    transform: scale(.9);
    box-shadow: ${p => p.theme.shadowLight};
  }
`

export const Icon = aIcon.extend`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translate(-50%, 0);
  pointer-events: none;
  transition-duration: .5s;
  background: ${p => p.theme.veryLight};
  width: 35px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 18px;
  color: ${p => p.theme.slightlyDark};

  .bubble-focused &, .bubble-editing & {
    opacity: 0;
    transition-duration: .3s;
  }

  ${screen.medium`
    font-size: 12px;
    width: 25px;
    height: 25px;
    line-height: 25px;
  `}
`

export const Title = AbsoluteFlex.extend`
  justify-content: center;
  align-items: center;
  pointer-events: none;
  font-size: 20px;
  background: ${p => alpha(.5, p.theme.veryDark)};
  border-top: 2px solid ${p => p.theme.veryLight};
  border-bottom: 2px solid ${p => p.theme.veryLight};
  width: 100%;
  text-align: center;
  padding: 15px 5px;
  font-family: annie use your telescope;
  transition-property: opacity, transform;
  transition-duration: .2s;
  transition-timing-function: ${EASE_OUT};
  transform: scale(1.05);
  opacity: 0;
  user-select: none;
  line-height: 20px;

  ${Root}:hover & {
    opacity: 1;
    transform: none;
  }

  .bubble-focused &, .bubble-editing & {
    visibility: hidden;
  }

  ${screen.medium`
    display: none;
  `}

`
