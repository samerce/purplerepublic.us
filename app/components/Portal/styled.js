import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, H1, H2, FlexColumn, Boto,
} from '../../global/styled'
import theme from '../../global/theme'

const GifWidth = 960
const GifHeight = 540
const GifScaleCenter = .3

export const Root = Flex.extend`
  &.spot-center {
    height: 100%;
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }
  &.spot-top {
    align-items: flex-start;
    justify-content: center;
  }

  &.spot-top {
    .gif {
      transform: translate(0, -${GifHeight / 2}px);
    }
  }

  &.spot-bottomLeft {
    .gif {
      transform: translate(-40px, 0);
    }
  }

  &.spot-bottomRight {
    .gif {
      transform: translate(110px, 40px);
    }
  }
`

export const GifRoot = Flex.extend`
  max-width: ${GifWidth}px;
  max-height: ${GifHeight}px;
  position: relative;

  .spot-center & {
    max-width: ${GifWidth * GifScaleCenter}px;
    max-height: ${GifHeight * GifScaleCenter}px;
  }
`

export const DiveInButton = Boto.extend`
  position: absolute;
  top: ${(GifHeight / 2) * GifScaleCenter}px;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: .5;

  display: none;
  .mode-seduction .spot-center & {
    display: flex;
  }

  &:hover {
    opacity: 1;
  }
`

export const CloseButton = Boto.extend`
  display: none;
  .mode-inTheDeep .spot-center & {
    display: flex;
  }
`

export const TemptationRoot = FlexColumn.extend`
  align-self: center;
  text-align: center;
  width: 100%;
  align-items: center;

  display: none;
  .spot-center & {
    display: flex;
  }
`

export const Title = H1.extend`
  font-size: 108px;
  width: 100%;
`

export const InTheDeepRoot = Flex.extend`
  display: none;
  .mode-inTheDeep .spot-center & {
    display: flex;
  }
`
