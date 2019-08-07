import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent, AbsoluteFlex,
} from '../../global/styled'
import {DiveDuration} from './constants'

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
      z-index: 10;

      & > * {
        transform: rotate(45deg);
      }
    }
    &.spot-center {
      position: absolute;
      z-index: 30;
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

export const BordersRoot = Flex.extend`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform .5s ${EASE_OUT};
  pointer-events: none;
  z-index: 20;

  .border {
    position: absolute;
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
    transform: rotate(-45deg) translate(80px, -180px);
  }
  .borderRight {
    right: 0;
    transform-origin: right top;
    transform: rotate(45deg) translate(-80px, -180px);
  }
`

export const Orb = AbsoluteFlexFillParent.extend`
  justify-content: center;
  align-items: center;
  z-index: 25;
  pointer-events: none;

  &:after {
    content: ' ';
    height: ${p => p.size}px;
    width: ${p => p.size}px;
    background: radial-gradient(circle at center, #4771a3 0%, #77779d 30%, #b998b3 55%, #e7a8b1 75%, #fdefb0 85%, transparent 100%);
    transform: scale(0);
    transition: transform .5s ${EASE_OUT};
    border-radius: 100%;

    .mode-willDive &, .mode-inTheDeep & {
      transform: scale(2);
      transition-duration: ${DiveDuration}ms;
    }
    .mode-willSeduce & {
      transition-delay: .2s;
    }
  }

`
