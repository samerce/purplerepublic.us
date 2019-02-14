import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, FlexColumn, Boto,
} from '../../global/styled'

export const Root = Flex.extend`
  padding: 20px 0 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
`

export const ContentRoot = FlexColumn.extend`
  padding: 0 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Blurb = styled.div`
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  padding: 0 20px;
  color: ${p => p.theme.veryLight};
  font-size: 20px;
  flex: 0 0 auto;
  max-width: 780px;
`

export const ButtonRoot = Flex.extend`
  flex-wrap: wrap;
  flex: 0 0 auto;
  justify-content: center;
  margin: 20px 0 0;
  width: 100%;
`

export const Button = Boto.extend`
  flex: 0 0 100%;
  max-width: 250px;
  font-size: 24px;
  margin: 20px 10px 0;
  background: ${p => p.theme[p.color]};
  border-color: ${p => lighten(.3, p.theme[p.color])};

  i {
    font-size: 30px;
    margin: 0 15px;
  }
`
