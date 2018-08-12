import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../../global/constants'
import {
  AbsoluteFlexFillParent, Flex,
} from '../../../global/styled'

injectGlobal`
  .bubbleBuilderToolbar {
    position: fixed;
    z-index: 50;
    pointer-events: all;
  }
`

export const Root = AbsoluteFlexFillParent.extend`
  z-index: 20;
  transition: all .7s ${EASE_OUT};
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 90px;
  overflow: scroll;
  pointer-events: all;
`

export const BubbleButtonRoot = Flex.extend`
  flex: 1 0 auto;
  padding: 250px 0 0;
  justify-content: flex-start;
  z-index: 50;
`

export const BubbleButtonContent = Flex.extend`
  cursor: pointer;
  z-index: 40;
  overflow: hidden;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 1px solid white;
  text-align: center;
  position: relative;
  align-self: flex-start;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: white;
  }

  .buttonContent {
    height: 100%;
  }
`

export const BubbleBuilderToolsRoot = Flex.extend`
  flex-direction: column;
  padding: 15px;
  margin-bottom: 90px;
  flex: 1 0 auto;
  position: relative;
  z-index: 50;
`

export const BubbleButtonSizeSlider = styled.input.attrs({
  type: 'range',
  min: 150,
  max: 300,
  step: 6,
})`
  padding: 15px;
  flex: 0 0 auto;
  width: 150px;
  transform: rotate(-90deg);
  align-self: flex-start;
  transform-origin: right bottom;
  margin-left: -90px;
  margin-right: 20px;
  -webkit-appearance: none;
  height: 10px;
  border-radius: 20px;
  background: ${p => p.theme.main};
  outline: none;
`
