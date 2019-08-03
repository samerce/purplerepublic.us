import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent,
} from '../../global/styled'

export const Root = Flex.extend`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #4771a3 0%, #77779d 40%, #b998b3 65%, #e7a8b1 85%, #fdefb0 100%);

  & > * {
    flex: 0 0 50%;
    height: 30%;

    &.spot-top {
      flex: 0 0 100%;
    }
    &.spot-center {
      flex: 0 0 100%;
      height: 40%;
    }
  }

  @keyframes hueShift {
    50% {
      filter: saturate(400%) hue-rotate(720deg);
    }
  }

  .anim {
    width: 1280px;
    padding: 20px;
    animation: hueShift 2s alternate infinite;
  }
`
