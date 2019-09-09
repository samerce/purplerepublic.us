import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlexFillParent, AbsoluteFlex, screen,
} from '../../global/styled'
import {TransitionDuration} from './constants'
import {SRC_URL} from '../../global/constants'
import theme from '../../global/theme'

export const Root = Flex.extend`
  width: 100%;
  height: 100%;
  flex: 1 0 auto;
  background: ${theme.gradientSunset};

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
    0% {
      filter: saturate(400%) hue-rotate(-25deg);
      transform: scale(.9) translate(0, 5px);
    }
    100% {
      filter: saturate(100%) hue-rotate(-15deg);
      transform: scale(.89) translate(0, 5px);
    }
  }
`

export const Backdrop = AbsoluteFlexFillParent.extend`
  background: url("${SRC_URL + 'commons/constellation.jpg'}");
  opacity: 0;
  z-index: 30;
  pointer-events: none;
  visibility: hidden;
  transform: scale(.7);
  transition: all 1s ${EASE_OUT};
  border-radius: 100%;

  .mode-inTheDeep &, .mode-willDive & {
    visibility: visible;
  }
  .mode-inTheDeep & {
    transform: none;
    opacity: .03;
    border-radius: 0;
  }
`

export const BordersRoot = Flex.extend`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform .5s ${EASE_OUT};
  pointer-events: none;
  z-index: 20;
  transform: translate(0, ${p => p.top}px);

  &.quark {
    transform: scale(0);
  }
  &.triangle {
    transition-delay: .5s;
  }

  .border {
    position: absolute;
    img {
      animation-name: hueShift;
      animation-duration: .7s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    width: 10px;
    height: 710px;
    box-shadow: 0 0 10px #FFE460, 0 0 20px #e7a8b1, 0 0 30px #b998b3,
                0 0 40px #77779d, 0 0 50px #4771a3;
    background: radial-gradient(circle at center, #FF7519 0%, #FFE460 40%, #fbf3ce 85%);

    @keyframes ooze {
      50% {
        filter: saturate(400%) hue-rotate(360deg);
        box-shadow: 0 0 20px #FFE460, 0 0 30px #e7a8b1, 0 0 40px #b998b3,
                    0 0 50px #77779d, 0 0 60px #4771a3;
      }
    }

    animation-name: ooze;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .borderBottom {
    height: 50%;
    bottom: -1px;
    left: 50%;
    transform: translate(-50%, 0);

    ${screen.medsmall`
      bottom: 40px;
    `}
    ${screen.small`
      bottom: 216px;
    `}
  }
  .borderLeft, .borderRight {
    display: initial;
    position: absolute;
    bottom: 0;
    z-index: 2;
    img {
      animation-delay: .05s;
    }
  }
  .borderLeft {
    left: 0;
    transform-origin: left top;
    transform: rotate(-45deg) translate(150px, -180px);

    ${screen.medsmall`
      transform: rotate(-45deg) translate(-50px, -440px);
    `}
  }
  .borderRight {
    right: 0;
    transform-origin: right top;
    transform: rotate(45deg) translate(-150px, -180px);

    ${screen.medsmall`
      transform: rotate(45deg) translate(50px, -440px);
    `}
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
      transition-duration: ${TransitionDuration * (3/4)}ms;
    }
    .mode-willSeduce & {
      transition-delay: .2s;
    }
  }

`
