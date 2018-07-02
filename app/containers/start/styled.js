import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha} from 'polished'
import {
  EASE_IN_SINE, EASE_OUT, EASE_IN, EASE,
  SCREEN_WIDTH_S_PX,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_L_PX,
  SCREEN_WIDTH_XL_PX,
  SRC_URL,
} from '../../global/constants'

const aColor = '#956C95'

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: hidden;
`
