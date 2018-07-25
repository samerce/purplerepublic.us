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

let CircleSizeFocused = 60

export const Root = InlineBlock.extend`
  transition: all .5s ${EASE_OUT};
  z-index: 8;
  pointer-events: ${p => p.disabled? 'none' : 'all'};
  cursor: pointer;

  .bubble-willEnter & {
    transition: none;
  }

  .bubble-enter & {
    transition: all 1s ${EASE_OUT} ${p => p.delay}s;
  }
`

export const ImageBubbleButton = BubbleButton.extend`
  background-image: url('${p => p.src}');
  background-position: center;
  background-size: cover;
  overflow: hidden;

  .bubble-focused &, .bubble-editing & {
    width: ${CircleSizeFocused}px;
    height: ${CircleSizeFocused}px;
    box-shadow: none;
    transform: translate3d(0, 10px, 0);
    cursor: default;
    transition: all .7s ${EASE_OUT};
  }
`

export const Icon = aIcon.extend`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  margin-top: -25%;
  pointer-events: none;
  transition-duration: .5s;
  opacity: .5;

  .bubble-focused &, .bubble-editing & {
    opacity: 0;
    transition-duration: .3s;
  }

  ${screen.medium`
    font-size: 20px;
  `}
`

export const Title = AbsoluteFlex.extend`
  justify-content: center;
  align-items: center;
  pointer-events: none;
  font-size: 20px;
  background: ${p => alpha(.3, p.theme.veryDark)};
  width: 100%;
  text-align: center;
  padding: 5px;
  font-family: annie use your telescope;
  transition: all .2s ${EASE_OUT};
  transform: scale(1.05);
  opacity: 0;

  ${Root}:hover & {
    opacity: 1;
    transform: none;
  }

`
