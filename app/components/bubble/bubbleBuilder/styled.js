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
  AbsoluteFlexFillParent, Flex, FlexColumn, MaskAbsoluteFillParent, TextInput,
} from '../../../global/styled'

export const PublishingMask = MaskAbsoluteFillParent.extend`
  position: fixed;
  z-index: 100;
`

export const Root = AbsoluteFlexFillParent.extend`
  z-index: 2;
  transition: all .7s ${EASE_OUT};
  align-items: flex-start;
  margin-bottom: 90px;
  overflow: scroll;
  pointer-events: all;
  transform: translate(0, 200px);
  opacity: 0;
  padding: 0 0 0 200px;

  &.bubbleBuilder-hide {
    display: none;
  }
  &.bubbleBuilder-willEnter {
    display: flex;
    transition: none;
  }
  &.bubbleBuilder-show, &.bubbleBuilder-enter {
    opacity: 1;
    transform: none;
  }

  .bubbleBuilderToolbar {
    position: fixed;
    z-index: 50;
    pointer-events: all;
    & > * {
      padding: 10px;
      font-size: 26px;
    }
  }
`

export const PropertiesRoot = Flex.extend`
  flex-direction: column;
  align-items: center;
`

export const PreviewRoot = Flex.extend`
  margin-top: 200px;
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
  border: 4px solid ${p => p.theme.veryLight};
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

export const PropertiesSection = FlexColumn.extend`
  flex: 1 0 auto;
  border-left: 1px solid ${p => p.theme.veryLight};
  padding: 10px;
  height: 300px;
  justify-content: flex-start;
  text-align: center;
`

export const PropertiesSectionTitle = Flex.extend`
  flex: 0 0 auto;
  font-size: 14px;
  text-transform: uppercase;
  font-family: playfair display;
  color: ${p => p.theme.veryLight};
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 0 5px;
`

export const PropertyInput = TextInput.extend`
  flex: 0 0 41px;
  font-size: 18px;
`
