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
  pointer-events: none;
  transition: opacity .5s, transform .7s;
  transition-timing-function: ${EASE_OUT};
  z-index: 3;
  width: 100%;
  flex: 0 0 70%;
  justify-content: center;
  overflow-y: scroll;
  padding: 0 50px;

  ${p => p.editing && `
    transform: none;
  `}

  ${p => (p.visible || p.editing) && `
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all ${RevealDuration}s ${EASE_OUT} .2s;
  `}
`
const HeaderTop = 25;
export const ContentRoot = Flex.extend`
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  flex: 1;
  height: 100%;
  flex-direction: column;
  position: relative;
  z-index: 70;

  ${p => p.editing && `
    margin: 100px 0;
  `}
`

export const Header = Flex.extend`
  width: 100%;
  flex-direction: column;
  padding: 0 0 20px 0;
  flex: 0 0 auto;
`

export const Footer = Flex.extend`
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  margin: 20px 0 20px;
`

export const Title = styled.input`
  font-size: 30px;
  font-family: life savers;
  color: white;
  text-align: center;
  font-weight: bold;
  pointer-events: none;
  width: 100%;

  ${screen.medium`
    font-size: 24px;
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

  ${screen.medium`
    font-size: 14px;
  `}
`

export const ActionsRoot = Flex.extend`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 80%;
  font-family: annie use your telescope;
  background: ${p => p.theme.slightlyDark};
  border-radius: ${p => p.theme.borderRadiusBoto}px;
`

export const VariableActionsRoot = ActionsRoot.extend`
  height: 60px;
  position: relative;
`

export const Action = Boto.extend`
  flex: 1 0 30px;
  height: 100%;
  border-radius: 0;
  position: relative;
  border: 2px solid ${p => p.theme.veryLight};
  border-radius: ${p => p.theme.borderRadiusBoto}px;

  &:not(:first-child) {
    border-left: 1px solid ${p => p.theme.veryLight};
  }

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
    font-size: 26px;

    div {
      line-height: 17px;
    }
  `}
`

export const BubbleOptions = Flex.extend`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 300px;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  box-shadow: ${p => p.theme.boxShadowHeavy};
  flex-wrap: wrap;
  justify-content: flex-end;
  z-index: 1;

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

  ${p => p.visible && `
    transform: none;
    opacity: 1;
  `}
`

export const BubbleNameButton = BubbleToolButton.extend`
  position: relative;
  transition-delay: ${p => p.visible? 0 : .2}s;

  &:hover {
    transition-delay: 0;
  }

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
  transition-delay: .1s;
  &:hover {
    transition-delay: 0;
  }
`

export const BubbleDeleteButton = BubbleToolButton.extend`
  background: red;
  right: 0;
  position: relative;
  transition-delay: ${p => p.visible? .2 : 0}s;

  &:hover {
    color: red;
    transition-delay: 0;
  }
`

export const ComponentRoot = Flex.extend`
  flex: 0 0 auto;
`

export const NavButton = Flex.extend`
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  padding: 0 20px;
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
  i {
    font-size: 30px;
  }
`
