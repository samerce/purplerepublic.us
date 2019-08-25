import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlex,
} from '../../global/styled'
import theme from '../../global/theme'

export const Root = Flex.extend`
  margin: 0 0 0 5px;
`

export const WordBubble = Flex.extend`
  padding: 15px;
  background: ${theme.hopi};
  color: ${theme.hopiDark};
  border-radius: 60px;
  box-shadow: ${theme.shadowHeavy};
  text-shadow: 0 0 10px ${theme.hopiLight}, 1px 1px ${alpha(.5, theme.hopiLight)};
  pointer-events: none;
  margin: 0 -5px;

  @keyframes show {
    100% {
      transform: none;
      opacity: 1;
    }
  }
  @keyframes hide {
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  opacity: 0;
  transform: scale(0);
  transform-origin: left center;

  .view-show & {
    animation-name: show;
    animation-duration: .6s;
    animation-fill-mode: both;
    animation-timing-function: ${EASE_OUT};
    animation-iteration-count: 1;
    animation-delay: ${p => (p.index * .5) + p.delay}s;
  }
  .view-hide & {
    opacity: 1;
    transform: none;
    transform-origin: center center;
    animation-name: hide;
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-timing-function: ${EASE_IN};
    animation-iteration-count: 1;
  }
`
