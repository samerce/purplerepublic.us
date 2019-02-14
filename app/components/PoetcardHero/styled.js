import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, AbsoluteFlex, FlexColumn, screen,
} from '../../global/styled'

export const Root = Flex.extend`
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
  padding: 0 0 60px 0;
`

export const HeroSection = Flex.extend`
  flex: 0 0 100%;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 10px;
`

export const ContentRoot = FlexColumn.extend`
  flex: 0 0 48%;
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  padding: 0 20px 20px;
  max-width: 540px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${p => p.theme.veryLight};
  text-align: center;

  ${screen.medium`
    margin: 10px 0;
    flex: 0 0 100%;
    font-size: 22px;
  `}
`

export const Button = Boto.extend`
  font-size: 20px;
  background: ${p => p.theme.shelly};
  border-color: ${p => p.theme.shellyLight};
`
