import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../../global/constants'
import {
  screen,
  ArticleText,
  Flex,
  Boto,
  AbsoluteFlex, MaskAbsoluteFillParent,
} from '../../../global/styled'

const RevealDuration = .7
const RootMarginTop = 40

export const Mask = MaskAbsoluteFillParent.extend`
  position: fixed;
  transition-duration: ${p => p.show? 2 : 0}s;
  transition-delay: ${p => p.show? RevealDuration : 0}s;
  z-index: 59;
`

export const Root = Flex.extend`
  z-index: 3;
  width: 100%;
  flex: 1;
  justify-content: center;
  padding: 0 50px;

  opacity: 0;
  transform: scale(.99);
  pointer-events: none;
  transition: all .5s ${EASE_OUT};
  .bubbleverse-show &, .bubbleverse-enter & {
    transform: none;
    opacity: 1;
    pointer-events: all;
    transition-duration: 1s;
    transition-delay: .2s;
  }
`
export const ContentRoot = Flex.extend`
  flex: 1;
  height: 100%;
  width: 100%;
  flex-direction: column;
  position: relative;
  z-index: 70;
  overflow-y: scroll;
`

export const Footer = Flex.extend`
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  margin: 20px 0 20px;
`

export const ActionsRoot = Flex.extend`
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 80%;
  max-width: 340px;
  font-family: annie use your telescope;
  background: ${p => p.theme.slightlyDark};
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  position: relative;

  ${screen.medium`
    height: 50px;
    width: 100%;
  `}
`

export const Action = Boto.extend`
  flex: 1 0 30px;
  height: 100%;
  position: relative;
  font-size: 26px;

  i {
    width: 30px;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }

  ${screen.medium`
    font-size: 22px;
  `}
`

export const BubbleOptions = Flex.extend`
  position: absolute;
  top: 10px;
  right: 0;
  width: 300px;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  flex-wrap: wrap;
  justify-content: flex-end;
  z-index: 5;
  pointer-events: none;

  &.visible {
    pointer-events: all;
  }

  .bubbleEditButton {
    font-size: 20px;
    border-radius: 100%;
    border: 1px solid ${p => p.theme.veryLight};
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: white;
    transition: all .3s ${EASE_OUT};
    cursor: pointer;
    margin-bottom: 5px;
    background: ${p => p.theme.slightlyDark};
    pointer-events: all;
    box-shadow: ${p => p.theme.boxShadowHeavy};

    &:hover {
      background: white;
      color: ${p => p.theme.slightlyDark};
    }
  }
`

export const BubbleToolButton = Boto.extend`
  font-size: 24px;
  flex: 1 0 auto;
  transition: all .2s ${EASE_OUT};
  transform: scaleY(0);
  opacity: 0;
  border: 1px solid ${p => p.theme.veryLight};
  flex: 0 0 100%;
  margin: 5px 0;
  box-shadow: ${p => p.theme.shadowMedium};

  .visible & {
    transform: none;
    opacity: 1;
  }
`

export const BubbleNameButton = BubbleToolButton.extend`
  position: relative;

  button {
    opacity: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .copiedMsg {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    transform: translate(0, 10px);
    opacity: 0;
    transition: all .3s ${EASE_OUT};
    pointer-events: none;

    &.show {
      transform: none;
      opacity: 1;
    }
  }
`

export const BubbleEditButton = BubbleToolButton.extend`
`

export const BubbleDeleteButton = BubbleToolButton.extend`
  background: red;
  right: 0;
  position: relative;

  &:hover {
    color: red;
  }
`

export const ComponentRoot = Flex.extend`
  flex: 1 0 auto;
  align-items: center;
`

export const NavButton = Flex.extend`
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 90px 20px 187px;
  cursor: pointer;
  color: white;
  transition: all .5s ${EASE_OUT};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  &.right {
    left: initial;
    right: 0;
  }

  &:hover {
    color: ${p => p.theme.veryLight};
  }

  .editing & {
    opacity: 0;
    pointer-events: none;
  }

  ${screen.medium`
    padding: 110px 10px 147px;
  `}

  i {
    font-size: 30px;

    ${screen.medium`
      font-size: 26px;
    `}
  }
`
