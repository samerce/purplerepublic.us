import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto,
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 1 0 auto;
  z-index: 2;
  align-items: center;
  height: 230px;
  justify-content: center;
`

const ButtonHeight = 80

export const Button = Boto.extend`
  background: ${p => p.theme.main};
  border: 2px solid ${p => p.theme.veryLight};
  height: ${ButtonHeight}px;
  flex: 1 0 auto;
  max-width: 330px;
  font-size: 36px;
  position: relative;
  line-height: ${ButtonHeight - 5}px;
  box-shadow: ${p => p.theme.shadowMedium};
  padding: 0;
  font-size: 28px;

  &.right {
    margin-left: 85px;
    text-align: right;
  }

  &.left {
    margin-right: 85px;
    text-align: left;
  }

  span {
    flex: 1 0 auto;
    padding: 0 5px;
  }

  i {
    height: ${ButtonHeight}px;
    font-size: 32px;
    line-height: 80px;
    padding: 0 15px;
    vertical-align: middle;
  }
`
