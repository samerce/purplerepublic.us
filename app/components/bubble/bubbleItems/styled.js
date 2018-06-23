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

export const VideoRoot = styled.div`
  text-align: center;
  width: 100%;
`

export const LinkRoot = styled.div`
  padding: 10px;
`

export const LinkInput = styled.input`
  height: 40px;
  width: 100%;
  background: ${alpha(.9, 'white')};
  border: 1px solid white;
  border-radius: 30px;
  padding: 25px;
  outline: none;
  transition: all .3s ${EASE_OUT};
  font-family: quattrocento;

  &:active, &:focus {
    background: white;
    color: ${aColor};
  }
`

export const Description = styled.div`
  font-size: 18px;
  color: white;
  margin: 10px 20px 20px;
  padding-top: 10px;
  cursor: text;
`
