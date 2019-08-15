import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto,
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

export const Text = Flex.extend`
  font-size: 108px;
  color: black;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const ManginaColor = '#3E4C50'
export const Mangina = Flex.extend`
  height: 100%;
  width: 100%;
  justify-content: center;
  background: ${ManginaColor};

  img {
    height: 100%;
    border: 1px solid ${lighten(.3, ManginaColor)};
    border-top: none;
    border-bottom: none;
    box-shadow: ${theme.shadowVeryHeavy};
  }
`

const QueerColor = '#DFA948'
export const Queer = Flex.extend`
  width: 100%;
  height: 100%;
  background: ${QueerColor};
  align-items: center;

  img {
    width: 100%;
    border: 1px solid ${lighten(.3, QueerColor)};
    border-left: none;
    border-right: none;
    box-shadow: ${theme.shadowVeryHeavy};
  }
`

export const AwareRoot = Text.extend`
  transform: scale(0);
  opacity: 0;
  filter: blur(10px);
  animation-name: reveal;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_OUT};

  span {
    transform: scale(0);
    opacity: 0;
    filter: blur(10px);
    animation-name: reveal;
    animation-duration: 3s;
    animation-fill-mode: both;
    animation-timing-function: ${EASE_OUT};
    animation-delay: 1s;
  }
`

export const StillHereRoot = Text.extend`
  flex-direction: column;
  transform: scale(.9) translate(0, 50px);
  opacity: 0;
  filter: blur(10px);

  animation-name: reveal;
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-timing-function: ${EASE_OUT};
  animation-delay: 3s;
`

export const Button = Boto.extend`

`
