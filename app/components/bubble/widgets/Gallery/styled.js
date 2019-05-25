import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
} from '../../../../global/constants'
import {
  BubbleComponentRoot,
} from '../../content/styled'
import {
  screen, Flex, FlexColumn, Boto, TextInput, AbsoluteFlex, CloseButton,
} from '../../../../global/styled'
import theme from '../../../../global/theme'

export const Root = BubbleComponentRoot.extend`
  width: 100%;
  
  #lightboxBackdrop button span {
      color: white;
  }
  #ReactGridGallery {
    height: 100%;
    width: 100%;
  }
  .gallerySelectPill.gallerySelectPill {
    position: relative;
    transform: none;
    top: 0;
    left: 0;
  }
`

export const EditPhotosRoot = FlexColumn.extend`
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 90px;
  right: 10px;

  .gallerySelectPill {
    height: 50px;

    .selectOption {
      font-size: 20px;
    }
  }
`

export const GalleryPositionRoot = FlexColumn.extend`
  align-items: center;
  margin: 10px 0;

  .selectOption {
    font-size: 18px;
  }
`

export const GalleryPositionTitle = Flex.extend`
  font-size: 14px;
  text-transform: uppercase;
  font-family: playfair Display;
  color: ${p => p.theme.veryLight};
  margin: 0 0 10px;
`

export const Button = Boto.extend`
  font-size: 22px;
  padding: 15px 20px 10px;
  transform: translate(0, -10px);
`

export const BuilderButton = Boto.extend`
  margin: 10px 0;
`

export const DeleteButton = Button.extend`
  opacity: ${p => p.disabled? .5 : 1};
  pointer-events: ${p => p.disabled? 'none' : 'all'};
`

export const Hint = Button.extend`
  font-size: 18px;
  color: ${p => p.theme.veryLight};
  background: ${p => p.theme.veryDark};
  border: 1px solid ${p => p.theme.veryLight};
  pointer-events: none;
`

export const CaptionInput = TextInput.extend`
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 6;
  height: 40px;
  width: 80%;
  text-align: left;
  padding: 5px 10px 5px 20px;
  font-size: 20px;
  background: rgba(0,0,0,.5);
`
