import styled, {injectGlobal, keyframes} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_SINE, EASE_OUT, EASE_IN, EASE,
} from '../../global/constants'
import {
  screen, AbsoluteFlexFillParent, AbsoluteFlex, Icon, Flex, Boto,
  CloseButton as aCloseButton, ExpandingBackground, ExpandingBackgroundSize,
  CloseButtonActiveStyles
} from '../../global/styled'

export const Root = Flex.extend`
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 3;
  flex-direction: column;
  position: relative;

  &.bubbleverse-show, &.bubbleverse-enter, &.bubbleverse-arrange {
    pointer-events: all;
  }
  &.bubbleverse-hide {
    ${'' /* visibility: hidden; */}
  }
`

export const BubbleEditingButtonsRoot = AbsoluteFlex.extend`
  bottom: 20px;
  right: 20px;
  flex-direction: column;
`

export const CloseButton = aCloseButton.extend`
  z-index: 6;

  &&.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .bubbleverse-show &, .bubbleverse-enter & {
    ${CloseButtonActiveStyles}
  }

  ${screen.medsmall`
    top: 10px;
  `}
`

export const Background = ExpandingBackground.extend`
  left: 0;

  .bubbleverse-show &, .bubbleverse-enter & {
    opacity: 1;
    transform: scale(2);
    transition-duration: 2s;
    transition-property: transform, opacity;
  }
  .bubbleverse-exit &, .bubbleverse-willExit & {
    transition-delay: .1s;
  }
`

export const Header = Flex.extend`
  flex: 0 0 82px;
  color: ${p => p.theme.veryLight};
  z-index: 5;
  font-family: playfair display;
  text-transform: uppercase;
  font-size: 36px;
  position: relative;
  align-items: center;
  border-bottom: 1px solid ${p => p.theme.veryLight};
  box-shadow: ${p => p.theme.shadowVeryHeavy};

  &, &&.hidden {
    opacity: 0;
    transform: translate(0, -5px);
    transition: all .5s ${EASE_OUT};
  }
  .bubbleverse-show &, .bubbleverse-enter & {
    opacity: 1;
    transform: none;
    transition-delay: .3s;
    transition-duration: 1s;
  }
  .bubbleverse-exit &, .bubbleverse-willExit & {
    transform: translate(0, 5px);
  }
  .bubbleverse-hide & {
    ${'' /* visibility: hidden; */}
  }

  ${screen.medsmall`
    flex-direction: column;
    padding: 5px 0;
    flex: 0 0 83px;
    height: 83px;
  `}
`

export const BubbleHeader = AbsoluteFlex.extend`
  width: 100%;
  flex-direction: column;
  pointer-events: none;

  ${screen.medsmall`
    position: relative;
    transform: translate(0, -36px);
  `}
`

export const Title = styled.input`
  font-size: 30px;
  font-family: im fell dw pica;
  color: white;
  text-align: center;
  font-weight: bold;
  pointer-events: none;
  width: 100%;

  ${screen.medsmall`
    font-size: 24px;
    padding-top: 15px;
  `}

  ${p => p.editing && `
    pointer-events: all;
  `}
`

export const Subtitle = Title.extend`
  font-size: 16px;
  opacity: .8;
  text-transform: uppercase;
  color: ${p => p.theme.veryLight};

  ${screen.medsmall`
    font-size: 14px;
    padding: 5px 0 0;
  `}
`

export const Dimension = Flex.extend`
  padding: 0 0 0 30px;
  position: relative;
  z-index: 3;

  ${screen.medium`
    font-size: 22px;
    padding: 0 0 0 20px;
  `}

  ${screen.medsmall`
    padding: 0 15px 5px;
    font-size: 16px;
    border-bottom: 1px solid;
    margin: 0 0 5px;
    width: 100%;
    align-self: flex-start;
  `}
`

export const DimensionPicker = AbsoluteFlex.extend`
  top: 100%;
  left: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
  transition: all .5s ${EASE_OUT};
  &.open {
    opacity: 1;
    pointer-events: all;
  }
`

export const DimensionChoice = Boto.extend`
  flex: 0 0 50px;
  margin: 5px 10px;
  line-height: 50px;
`
