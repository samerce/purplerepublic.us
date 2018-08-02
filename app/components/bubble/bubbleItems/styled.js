import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT,
  EASE_IN,
  EASE,
} from '../../../global/constants'
import {
  screen,
  ArticleText, Flex, FlexColumn, Boto, TextInput,
} from '../../../global/styled'
import theme from '../../../global/theme'

injectGlobal`
  .gallerySelectPill.gallerySelectPill {
    position: relative;
    transform: none;
    top: 0;
    left: 0;
  }
  #lightboxBackdrop button span {
      color: white;
  }
  .bubbleShopText {
    transition: all .01s linear .2s;
    pointer-events: none;
    font-family: annie use your telescope;
    font-size: 62px;
    text-align: center;
    position: absolute;
    width: 100%;
    color: white;
    top: 0;
    user-select: none;
    text-shadow: 1px 1px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    .focused & {
      transition-delay: 0s;
      opacity: 0;
    }

    span {
      font-size: 22px;
    }

    .shopText {
      line-height: 40px;
    }
    .bubble-willFocus &, .bubble-focused &, .bubble-willDefocus & {
      opacity: 0;
      transition: none;
    }
    ${screen.medium`
      font-size: 36px;
      .shopText {
        line-height: 30px;
      }
      span {
        font-size: 16px;
      }
    `}
  }
  .image-gallery {
    width: 100%;
    height: 100%;
  }
  .image-gallery-content, .image-gallery-slide-wrapper,
  .image-gallery-swipe, .image-gallery-slides, .image-gallery-image {
    height: 100%;
  }
  .image-gallery-slide {
    text-align: center;
  }
  .fullscreen .image-gallery-slide.image-gallery-slide {
    height: 100%;

    img {
      width: auto;
      height: 100%;
    }

    ${screen.medium`
      .image-gallery-image {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
        height: auto;
      }
    `}
  }
  .image-gallery-left-nav, .image-gallery-right-nav {
    height: 100%;
  }
  button.image-gallery-fullscreen-button {
    z-index: 5;
  }
  .image-gallery-description {
    font-family: annie use your telescope;
    font-size: 20px;

    ${screen.medium`
      font-size: 22px !important;
      transition: all .3s ${EASE_OUT};

      .fullscreen & {
        font-size: 24px !important;
      }
    `}
  }
  button.image-gallery-fullscreen-button::before {
    font-size: 1.7em;
    padding: 10px;
  }
  div.image-gallery-index {
    padding: 5px 10px;
    font-size: 12px;
  }

  .medium-editor-toolbar.medium-editor-toolbar.medium-editor-toolbar-active {
    background-color: ${theme.veryLight};

    &:after {
      display: none;
    }
  }
  .medium-editor-action {
    border-color: white!important;
    &:hover {
      background-color: ${theme.slightlyDark} !important;
    }
  }
  .medium-editor-button-active {
    background-color: ${theme.veryDark} !important;
  }
`

export const VideoRoot = styled.div`
  text-align: center;
  width: 100%;
`

export const Description = ArticleText.extend`
  margin: 10px 20px 20px;
  font-size: 21px;
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
