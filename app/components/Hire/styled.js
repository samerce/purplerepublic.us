import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, CloseButton as aCloseButton, ExpandingBackground, BlurbBubble, BlurbContent, BlurbButton, BlurbText, screen, CornerEntryButton, CornerEntryButtonActiveStyles, CornerWorldRoot, CornerWorldRootActiveStyles, CloseButtonActiveStyles, CornerWorldContentRoot, ExpandingBackgroundLeftActiveStyles
} from '../../global/styled'


export const Root = CornerWorldRoot.extend`
  &.hire-show, &.hire-enter, &.hire-willExit, &.hire-exit {
    ${CornerWorldRootActiveStyles}
  }
`

export const EntryButton = CornerEntryButton.extend`
  .hire-show &, .hire-enter & {
    ${CornerEntryButtonActiveStyles}
  }
`

export const Background = ExpandingBackground.extend`
  .hire-willEnter &, .hire-willExit &, .hire-exit & {
    position: fixed;
  }
  .hire-show &, .hire-enter & {
    position: fixed;
    ${ExpandingBackgroundLeftActiveStyles}
  }
`

export const CloseButton = aCloseButton.extend`
  .hire-enter & {
    transition-delay: .3s;
  }
  .hire-show &, .hire-enter & {
    ${CloseButtonActiveStyles}
  }
`

export const ContentRoot = CornerWorldContentRoot.extend`
  .hire-show & {
    pointer-events: all;
  }
`
