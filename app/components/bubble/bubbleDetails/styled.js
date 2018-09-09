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

export const Root = styled.div`
  ${'' /* opacity: 0; */}
  pointer-events: none;
  transform: translate(0, ${window.innerHeight}px);
  transform-origin: center top;
  transition: opacity .5s, transform .7s;
  transition-timing-function: ${EASE_OUT};
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;

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
export const ContentRoot = styled.div`
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  background: ${p => p.theme.main};
  box-shadow: ${p => p.theme.shadowHeavy};
  width: 100%;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: ${77 + HeaderTop}px;
  padding-bottom: ${RootMarginTop + 80}px;
  margin-top: 35px;
  z-index: 70;

  hr {
    width: 100%;
    border-width: 1px;
    border-color: ${p => p.theme.veryLight};
    border-top: 0;
    margin: 15px 0 0;
  }

  ${screen.medium`
    padding-top: 92px;
  `}

  ${p => p.editing && `
    margin: 100px 0;
  `}
`

export const Header = AbsoluteFlex.extend`
  width: 100%;
  top: ${HeaderTop}px;
  flex-direction: column;
`

export const Footer = AbsoluteFlex.extend`
  width: 100%;
  bottom: 0px;
  flex-direction: column;
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
  width: 100%;
  border-top: 1px solid ${p => p.theme.veryLight};
  font-family: annie use your telescope;
  background: ${p => p.theme.slightlyDark};
  border-bottom-left-radius: ${p => p.theme.borderRadiusBoto}px;
  border-bottom-right-radius: ${p => p.theme.borderRadiusBoto}px;
`

export const Action = Boto.extend`
  flex: 1 0 30px;
  height: 100%;
  border-radius: 0;

  &:first-child {
    border-bottom-left-radius: ${p => p.theme.borderRadiusBoto}px;
  }
  &:not(:first-child) {
    border-left: 1px solid ${p => p.theme.veryLight};
  }
  &:last-child {
    border-bottom-right-radius: ${p => p.theme.borderRadiusBoto}px;
  }

  ${screen.medium`
    font-size: 26px;

    div {
      line-height: 17px;
    }
  `}
`

export const JourneyButtonRoot = Boto.extend`
  height: 60px;
  width: 100%;
  position: relative;
  border-radius: 0;
  border-top: 1px solid ${p => p.theme.veryLight};

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
