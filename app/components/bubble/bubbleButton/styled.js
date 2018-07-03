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
  Icon as aIcon, BubbleButton,
} from '../../../global/styled'

let CircleSizeFocused = 60

export const Root = styled.div`
  transition: all .5s ${EASE_OUT};
  display: inline-block;
  z-index: 8;
  pointer-events: ${p => p.disabled? 'none' : 'all'};

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

  ${'' /* .bubble-focused &&:hover {
    transform: none;
  } */}

  .bubble-focused &, .bubble-editing & {
    width: ${CircleSizeFocused}px;
    height: ${CircleSizeFocused}px;
    box-shadow: none;
    transform: translateY(10px);
    cursor: default;
    transition: all .7s ${EASE_OUT};
  }
`

export const Icon = aIcon.extend.attrs({
  size: 32,
})`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: -48px;
  pointer-events: none;
  transition-duration: .5s;
  opacity: .5;

  .bubble-focused &, .bubble-editing & {
    opacity: 0;
    transition-duration: .3s;
  }
`
