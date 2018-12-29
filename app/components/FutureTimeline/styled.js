import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex
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

  &.futureTimeline-willEnter {
    display: flex;
  }
  &.futureTimeline-enter, &.futureTimeline-show {
    display: flex;
    opacity: 1;
    transform: none;
    transition-delay: .2s;
  }
  &.futureTimeline-willExit, &.futureTimeline-exit {
    display: flex;
    opacity: 0;
    transform: translate(0, -10px);
    transition: all .3s ${EASE_OUT};
  }
`
