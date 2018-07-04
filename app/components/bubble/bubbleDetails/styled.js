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
  AbsoluteFlex,
} from '../../../global/styled'

export const Root = styled.div`
  opacity: 0;
  pointer-events: none;
  transform: scale(0);
  transform-origin: center top;
  transition: opacity .4s, transform .5s;
  transition-timing-function: ${EASE_OUT};
  z-index: 7;
  position: relative;

  &.focused, &.expanded, &.editing {
    opacity: 1;
    transform: none;
    pointer-events: all;
    transition: all .7s ${EASE_OUT} .05s;
  }
`

export const ContentRoot = styled.div`
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  max-width: 700px;
  background: ${p => p.theme.main};
  box-shadow: ${p => p.theme.shadowHeavy};
  padding-top: 20px;
  width: ${window.innerWidth}px;

  hr {
    width: 150px;
  }
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
    font-size: 28px;
  `}

  .editing & {
    pointer-events: all;
  }
`

export const Subtitle = Title.extend`
  font-size: 16px;
  opacity: .8;
  text-transform: uppercase;

  ${screen.medium`
    font-size: 14px;
  `}
`

export const Description = ArticleText.extend`
  margin: 10px 20px 20px;
  padding-top: 10px;
`

export const ActionsRoot = Flex.extend`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-top: 1px solid white;
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
    border-left: 1px solid white;
  }
  &:last-child {
    border-bottom-right-radius: ${p => p.theme.borderRadiusBoto}px;
  }
`

export const JourneyButtonRoot = Boto.extend`
  position: absolute;
  top: 100%;
  margin-top: 20px;
  z-index: 50;
  height: 60px;
  width: 100%;
  box-shadow: ${p => p.theme.shadowHeavy};

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
export const BubbleOptions = AbsoluteFlex.extend`
  top: 100%;
  margin-top: 20px;
  width: 100%;
  border-radius: ${p => p.theme.borderRadiusBoto}px;
  box-shadow: ${p => p.theme.boxShadowHeavy};
`

export const BubbleToolButton = Boto.extend`
  height: 40px;
  font-size: 24px;
  flex: 1 0 auto;
  border-radius: 0;
`

export const BubbleNameButton = BubbleToolButton.extend`
  border-top-left-radius: ${p => p.theme.borderRadiusBoto}px;
  border-bottom-left-radius: ${p => p.theme.borderRadiusBoto}px;
`

export const BubbleEditButton = BubbleToolButton.extend`
  border-left: 1px solid white;
`

export const BubbleDeleteButton = BubbleToolButton.extend`
  background: red;
  right: 0;
  position: relative;
  border-left: 1px solid white;
  border-top-right-radius: ${p => p.theme.borderRadiusBoto}px;
  border-bottom-right-radius: ${p => p.theme.borderRadiusBoto}px;

  &:hover {
    color: red;
  }
`
