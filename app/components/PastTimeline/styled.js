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
`

export const IntroBlurb = Flex.extend`
  max-width: 740px;
  color: ${p => p.theme.veryLight};
  font-size: 22px;
  background: ${p => alpha(.5, p.theme.veryDark)};
  box-shadow: ${p => p.theme.shadowMedium};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  padding: 20px;
  margin: 0 0 50px;
`
