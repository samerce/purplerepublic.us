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

injectGlobal`
  .gallerySelectPill {
    position: initial;
    transform: none;
  }
`

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

export const EditPhotosRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: fixed;
  top: 10px;
  right: 100px;
`

export const GalleryRoot = styled.div`
  display: flex;
  flex-direction: column;
`

export const Hint = styled.div`
  font-family: quattrocento;
  font-size: 18px;
  margin: 15px;
  color: ${lighten(.3, aColor)};
`

const buttonColor = darken(.05, aColor)
export const Button = styled.div`
  background: ${buttonColor};
  color: white;
  transition: all .3s ${EASE_OUT};
  border-radius: 20px;
  padding: 5px 20px;
  margin: 20px;
  font-family: annie use your telescope;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background: white;
    color: ${buttonColor};
  }
`

export const DeleteButton = styled(Button)`
  opacity: ${p => p.disabled? .5 : 1};
  pointer-events: ${p => p.disabled? 'none' : 'all'};
`
