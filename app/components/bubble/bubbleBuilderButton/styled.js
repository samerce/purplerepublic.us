import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_M,
} from '../../../global/constants'

import {
  Icon as aIcon,
  BubbleButton,
} from '../../../global/styled'

export const BubbleBuilderButton = BubbleButton.extend.attrs({
  size: 80,
})`
  z-index: 30;
  margin: 0 10px;

  &.bubbleArrangeActive {
    background: ${p => p.theme.veryDark};
    transform: scale(1.1);

    &:hover {
      transform: scale(1);
    }
  }
`

export const Icon = aIcon.extend`
  font-size: 40px;
  margin-top: 3px;
  margin-left: 3px;

  .bubbleArrangeActive & {
    margin-top: -3px;
    margin-left: 2px;
  }
`
