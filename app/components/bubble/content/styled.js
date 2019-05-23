import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
} from '../../../global/constants'
import {
  screen, FlexColumn,
} from '../../../global/styled'
import theme from '../../../global/theme'

export const BubbleComponentRoot = FlexColumn.extend`
  height: 100%;
  position: relative;
  flex: 0 0 100%;
  align-items: center;
  padding: 20px 0;
`
