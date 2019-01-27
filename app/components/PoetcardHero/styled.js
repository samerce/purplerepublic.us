import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex,
} from '../../global/styled'

export const Root = Flex.extend`
  flex-wrap: wrap;
  width: 100%;
  height: 40px;
  justify-content: center;
`

export const HeroSection = Boto.extend`
  flex: 0 0 100%;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
  background: ${p => p.theme.slightlyDark};
  box-shadow: ${p => p.theme.shadowMedium};
  opacity: .8;

  &:hover {
    opacity: 1;
  }

  i {
    font-size: 20px;
    margin: 0 10px;
  }
`

export const Growth = AbsoluteFlex.extend`
  right: 0;
  bottom: 100%;
  background: inherit;
  border: inherit;
  border-radius: inherit;
  height: 40px;
  width: 50px;
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &.tom {
    transform: translate(0, 10px);
    width: 30px;
    height: 15px;
  }
`
