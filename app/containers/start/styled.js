import styled from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'
import {
  AbsoluteFlexFillParent,
} from '../../global/styled'

export const Root = styled(AbsoluteFlexFillParent)`
  position: fixed;
`

export const ScrollContainer = styled(AbsoluteFlexFillParent)`
  overflow-y: scroll;
  overflow-x: hidden;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 0 80px;
`
