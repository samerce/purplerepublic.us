import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, FlexColumn, Boto, AbsoluteFlex,
} from '../../global/styled'

export const Root = Flex.extend`
  padding: 40px 0 40px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  background: ${p => p.theme.veryDarkTransparent};
`

export const ContentRoot = Flex.extend`
  flex-wrap: wrap;
  padding: 0 15px;
  width: 100%;
`

export const IconGroup = Flex.extend`
  flex: 0 0 40%;
  position: relative;

  i {
    position: absolute;
    font-size: 160px;
    margin: 0 10px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    color: white;

    &.a {
      transform: translate(50%,-50%) rotate(-14deg);
      top: 0;
      right: 190px;
    }
    &.b {
      right: 380px;
      top: 180px;
      transform: translate(50%,-50%) rotate(12deg);
    }
    &.c {
      top: 100px;
      right: 120px;
      transform: translate(50%, -50%) rotate(-5deg);
    }
    &.d {
      top: 10px;
      right: 320px;
      transform: translate(50%, -50%) rotate(9deg);
    }

    &.med {
      color: ${p => p.theme.veryLight};
      font-size: 90px;
    }
    &.small {
      color: ${p => p.theme.veryLight};
      font-size: 60px;
    }
  }
`

export const Blurb = FlexColumn.extend`
  flex: 0 0 60%;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  border: 1px solid ${p => p.theme.veryLight};
  background ${p => p.theme.veryDark};
  font-size: 26px;
  padding: 20px;
  justify-content: flex-start;
  color: white;
  max-width: 780px;

  strong {
    text-transform: uppercase;
    font-size: 30px;
    font-family: playfair display;
  }
  span {
    margin: 15px 0 0;
    font-size: 20px;
    color: ${p => p.theme.veryLight};
  }
  i {
    font-style: italic;
  }
`

export const MailingListRoot = Boto.extend`
  flex: 0 0 100%;
  margin: 40px auto 0;
  max-width: 740px;
  font-size: 24px;

`
