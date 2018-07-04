import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../../global/constants'
import {
  ArticleText, Flex, FlexColumn, Boto,
} from '../../../global/styled'

injectGlobal`
  .gallerySelectPill {
    position: initial;
    transform: none;
  }
  #lightboxBackdrop button span {
      color: white;
  }
`

export const VideoRoot = styled.div`
  text-align: center;
  width: 100%;
`

export const Description = ArticleText.extend`
  margin: 10px 20px 20px;
  padding-top: 10px;
`

export const EditPhotosRoot = FlexColumn.extend`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: fixed;
  top: 10px;
  right: 100px;
`

export const Hint = styled.div`
  font-family: quattrocento;
  font-size: 18px;
  margin: 15px;
  color: ${p => p.theme.veryLight};
`

export const Button = Boto.extend`
  margin: 20px;
  font-size: 24px;
`

export const DeleteButton = Button.extend`
  opacity: ${p => p.disabled? .5 : 1};
  pointer-events: ${p => p.disabled? 'none' : 'all'};
`
