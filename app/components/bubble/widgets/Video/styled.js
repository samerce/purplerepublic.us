import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
} from '../../../../global/constants'
import {
  BubbleComponentRoot,
} from '../../content/styled'
import {
  screen, Flex, FlexColumn, CloseButton,
} from '../../../../global/styled'
import theme from '../../../../global/theme'

export const Root = FlexColumn.extend`
  text-align: center;
  align-items: center;
`

export const VideoWrapper = Flex.extend`
  border: 1px solid ${p => p.theme.veryLight};
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`

export const RemoveButton = CloseButton.extend`
  position: absolute;
  transform: none;
  opacity: 1;
  pointer-events: all;
`
