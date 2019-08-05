import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent,
} from '../../global/styled'

export const Root = Flex.extend`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #4771a3 0%, #77779d 40%, #b998b3 65%, #e7a8b1 85%, #fdefb0 100%);

  & > * {
    height: 100%;

    &.spot-top {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      & > * {
        transform: rotate(45deg);
      }
    }
    &.spot-center {
      position: absolute;
      z-index: 3;
    }
  }

  .border {
    position: absolute;
    z-index: 2;
    animation: hueShift 5s alternate infinite;
  }
  .borderBottom {
    height: 50%;
    bottom: -1px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .borderLeft, .borderRight {
    display: initial;
    position: absolute;
    bottom: 0;
    z-index: 2;
  }
  .borderLeft {
    left: 0;
    transform-origin: left top;
    transform: rotate(-45deg) translate(-90px, -150px);
  }
  .borderRight {
    right: 0;
    transform-origin: right top;
    transform: rotate(45deg) translate(90px, -150px);
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
