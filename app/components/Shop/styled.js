import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  AbsoluteFlexFillParent, AbsoluteFlex, Flex, CloseButton as aCloseButton, ExpandingBackground, BlurbBubble, BlurbContent, BlurbButton, BlurbText, screen, CornerEntryButton, CornerEntryButtonActiveStyles, CornerWorldRoot, CornerWorldRootActiveStyles, CloseButtonActiveStyles, CornerWorldContentRoot,
  ExpandingBackgroundRightActiveStyles,
} from '../../global/styled'

export const Root = CornerWorldRoot.extend`
  z-index: 1;
  &.shop-show, &.shop-enter, &.shop-willExit, &.shop-exit {
    ${CornerWorldRootActiveStyles}
  }
`

export const ContentRoot = CornerWorldContentRoot.extend`
  .shop-show & {
    pointer-events: all;
  }
  ${screen.large`
    padding-top: 150px;
  `}
  ${screen.medsmall`
    padding-top: 270px;
  `}
`

export const ShopRow = Flex.extend`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`

const RowShowDelay = .1

export const IconBubble = BlurbBubble.extend`
  border-color: ${p => p.theme[p.color + 'Light']};
  i {
    color: ${p => p.theme[p.color + 'Light']};
  }

  .shop-enter & {
    transform: none;
    opacity: 1;
    transition-delay: ${p => p.i * .1 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }

  ${screen.medium`
    flex: 0 0 100px;
    height: 100px;
  `}
`

export const WordsRoot = BlurbContent.extend`
  margin: 60px 0 0 -20px;

  ${screen.medium`
    margin-top: 20px;
  `}
`

export const ShopButton = BlurbButton.extend`
  font-size: 30px;
  background: ${p => p.theme[p.color]};
  border-color: ${p => p.theme[p.color + 'Light']};

  .shop-enter & {
    transform: none;
    opacity: 1;
    transition-delay: ${p => (p.i * .1) + .1 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }

  ${screen.medium`
    flex: 0 0 60px;
    font-size: 28px;
  `}
  ${screen.medsmall`
    font-size: 18px;
  `}
`

export const ShopText = BlurbText.extend`
  .shop-enter & {
    opacity: 1;
    transform: none;
    transition-delay: ${p => p.i * .1 + .2 + RowShowDelay}s;
  }
  .shop-show & {
    transform: none;
    opacity: 1;
    transition-delay: 0s;
  }
  ${screen.medium`
    font-size: 20px;
    padding: 20px 10px 10px;
  `}
  ${screen.medsmall`
    font-size: 16px;
  `}
`
