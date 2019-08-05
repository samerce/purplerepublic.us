import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, H1, H2, FlexColumn, Boto, screen,
} from '../../global/styled'
import theme from '../../global/theme'

const GifWidth = 960
const GifHeight = 540
const GifScaleCenter = .4

export const Root = Flex.extend`
  overflow: hidden;
  position: relative;

  &.spot-center {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }
  &.spot-top {
    justify-content: center;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }
`

export const GifRoot = Flex.extend`
  position: relative;

  .spot-top & {
    position: absolute;
    left: 0;
    top: ${p => p.top}px;
    transform: rotate(-45deg);
    height: ${p => p.height}px;
    width: 100%;
    overflow: hidden;
    justify-content: center;

    .gif {
      transform: rotate(-45deg) translate(50%, -${p => p.yOffset}px);
      transform-origin: right bottom;

      ${screen.large`
        transform: rotate(-45deg) translate(50%, 0);
      `}

      img {
        position: relative;
        transform: translate(-50%, 0);
        left: 50%;
      }
    }
  }
  .spot-center & .gif {
    width: ${p => p.width}px;
    max-width: ${GifWidth}px;
  }
  .spot-bottomLeft & .gif, .spot-bottomRight & .gif {
    height: 100%;

    img {
      width: unset;
    }
  }
  .spot-bottomRight & .gif {
    transform: translate(-50%, 0);
  }
`

export const DiveInButton = Boto.extend`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: none;
  .mode-seduction .spot-center & {
    display: flex;
    font-size: 42px;
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
    ${'' /* display: flex; */}
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
