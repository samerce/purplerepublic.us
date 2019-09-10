import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, FlexColumn, AbsoluteFlexFillParent, screen,
} from '../../global/styled'
import theme from '../../global/theme'

export const HideDuration = 2000

export const Root = Flex.extend`
  position: fixed;
  height: 100%;
  width: 100%;
  background: WHITE;
  justify-content: center;
  align-items: center;
  z-index: 500;
  font-size: 108px;
  color: black;

  ${screen.medsmall`
    font-size: 54px;
  `}

  @keyframes reveal {
    100% {
      transform: none;
      opacity: 1;
      filter: none;
    }
  }

  &.hiding {
    transform: scale(3);
    border-radius: 100%;
    filter: blur(20px);
    opacity: 0;
    transition: all ${HideDuration}ms ${EASE_OUT};
  }
  &.hidden {
    display: none;
  }
`

const Parent = AbsoluteFlexFillParent.extend`
  text-align: center;
  align-items: center;
  justify-content: center;
`

export const Loading = Parent.extend`
  z-index: 100;
  background: white;
  visibility: hidden;

  .scene-0 & {
    visibility: visible;
  }

  i {
    @keyframes spin {
      100% {
        transform: rotate(720deg) scale(2);
        filter: hue-rotate(10deg);
      }
    }

    font-size: 42px;
    color: ${theme.hopi};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-name: spin;
    animation-timing-function: ${EASE_OUT};
  }
`

export const Fuck = Parent.extend`
  visibility: hidden;
  .scene-1 & {
    visibility: visible;
  }
`

export const Patriarchy = Parent.extend`
  visibility: hidden;
  .scene-2 & {
    visibility: visible;
  }
`

export const ContinueRoot = Parent.extend`
  visibility: hidden;
  flex-direction: column;

  .scene-5 & {
    visibility: visible;
  }
`

const ManginaColor = '#3E4C50'
export const Mangina = Parent.extend`
  height: 100%;
  width: 100%;
  justify-content: center;
  background: ${ManginaColor};
  visibility: hidden;
  z-index: 200;

  .scene-3 & {
    visibility: visible;
  }

  img {
    height: 100%;
    border: 1px solid ${lighten(.3, ManginaColor)};
    border-top: none;
    border-bottom: none;
    box-shadow: ${theme.shadowVeryHeavy};
  }
`

const QueerColor = '#DFA948'
export const Queer = Parent.extend`
  width: 100%;
  height: 100%;
  background: ${QueerColor};
  align-items: center;
  visibility: hidden;
  z-index: 300;

  .scene-4 & {
    visibility: visible;
  }

  img {
    width: 100%;
    border: 1px solid ${lighten(.3, QueerColor)};
    border-left: none;
    border-right: none;
    box-shadow: ${theme.shadowVeryHeavy};
  }
`

export const AwareRoot = Flex.extend`
  transform: scale(0);
  opacity: 0;
  filter: blur(10px);
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_OUT};

  .scene-5 & {
    animation-name: reveal;
  }

  span {
    transform: scale(0);
    opacity: 0;
    filter: blur(10px);
    animation-duration: 3s;
    animation-fill-mode: both;
    animation-timing-function: ${EASE_OUT};
    animation-delay: 1s;

    .scene-5 & {
      animation-name: reveal;
    }
  }
`

export const StillHereRoot = Flex.extend`
  flex-direction: column;
  transform: scale(.9) translate(0, 50px);
  opacity: 0;
  filter: blur(10px);

  .scene-5 & {
    animation-name: reveal;
  }
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_OUT};
  animation-delay: 3s;
`

export const Button = Boto.extend`
  margin-top: 20px;
`
