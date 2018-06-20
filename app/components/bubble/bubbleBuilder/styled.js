import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
  EASE_SINE,
  SCREEN_WIDTH_M_PX,
  SCREEN_WIDTH_S_PX,
} from '../../../global/constants'

const aColor = '#956C95'

export const Root = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  transition: all .7s ${EASE_OUT};
  width: 100%;
  height: 100%;

`

export const BubbleButtonRoot = styled.div`
  margin-left: 80px;
  cursor: pointer;
  z-index: 40;
  overflow: hidden;
  width: 108px;
  height: 108px;
  border-radius: 100%;
  border: 1px solid white;
  text-align: center;
  position: relative;
  align-self: flex-start;
  margin-top: 290px;

  i {
    font-size: 30px;
    color: white;
    line-height: 108px;
    height: 100%;
  }

  .buttonContent {
    height: 100%;
  }
`
