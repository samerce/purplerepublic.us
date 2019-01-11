import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  AbsoluteFlexFillParent, AbsoluteFlex, Flex, CloseButton as aCloseButton, ExpandingBackground, BlurbBubble, BlurbContent, BlurbButton, BlurbText, screen, CornerEntryButton, CornerEntryButtonActiveStyles, CornerWorldRoot, CornerWorldRootActiveStyles, CloseButtonActiveStyles, CornerWorldContentRoot,
  ExpandingBackgroundRightActiveStyles,
} from '../../global/styled'

export const Root = CornerWorldRoot.extend`
  &.shop-show, &.shop-enter, &.shop-willExit, &.shop-exit {
    ${CornerWorldRootActiveStyles}
  }
`


export const EntryButton = CornerEntryButton.extend`
  .shop-show &, .shop-enter & {
    ${CornerEntryButtonActiveStyles}
  }
`

export const Background = ExpandingBackground.extend`
  .shop-willEnter &, .shop-willExit &, .shop-exit & {
    position: fixed;
  }
  .shop-show &, .shop-enter & {
    position: fixed;
    ${ExpandingBackgroundRightActiveStyles}
  }
`

export const CloseButton = aCloseButton.extend`
  .shop-enter & {
    transition-delay: .3s;
  }
  .shop-show &, .shop-enter & {
    ${CloseButtonActiveStyles}
  }
`

export const ContentRoot = CornerWorldContentRoot.extend`
  .shop-show & {
    pointer-events: all;
  }
`

export const ShopRow = Flex.extend`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`

const RowShowDelay = .1

export const IconBubble = BlurbBubble.extend`
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
  margin: 60px 0 0 -15px;

  ${screen.medium`
    margin: 20px 0 0 -15px;
  `}
`

export const ShopButton = BlurbButton.extend`
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
