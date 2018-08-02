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
  size: 60,
})`
  z-index: 100;
  flex: 0 0 60px;
  margin: 5px 0 0;

  &.bubbleArrangeActive {
    background: ${p => p.theme.veryDark};
    transform: scale(1.1);

    &:hover {
      transform: scale(1);
    }
  }
`

export const Icon = aIcon.extend`
  font-size: 30px;
  margin-top: 3px;
  margin-left: 3px;

  .bubbleArrangeActive & {
    margin-top: -3px;
    margin-left: 2px;
  }
`
