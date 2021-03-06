import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, screen,
} from '../../global/styled'

export const Root = Flex.extend`
  position: absolute;
  z-index: 7;
  margin: 250px 0 0;
  align-items: center;
  flex-direction: column;
  width: 100%;
  display: none;
  opacity: 0;
  transform: translate(0, -10px);
  transition: all .5s ${EASE_OUT};

  &.pastTimeline-willEnter {
    display: flex;
  }
  &.pastTimeline-enter, &.pastTimeline-show {
    display: flex;
    opacity: 1;
    transform: none;
    transition-delay: .2s;
  }
  &.pastTimeline-willExit, &.pastTimeline-exit {
    display: flex;
    opacity: 0;
    transform: translate(0, -10px);
    transition: all .3s ${EASE_OUT};
  }

  ${screen.large`
    margin: 140px 0 0;
  `}
  ${screen.medsmall`
    margin: 250px 0 0;
  `}
`
