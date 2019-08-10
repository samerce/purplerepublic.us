import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex,
} from '../../global/styled'

export const MaskWidth = 1523
export const MaskHeight = 854

export const Root = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
  canvas {
    width: 100%;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: ${MaskWidth}px;
    height: ${MaskHeight}px;
    pointer-events: none;
  }
`
