import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {
  EASE_OUT, EASE_IN, EASE,
} from '../../../../global/constants'
import {
  BubbleComponentRoot,
} from '../styled'
import {
  screen, ArticleText,
} from '../../../../global/styled'
import theme from '../../../../global/theme'

export const Root = BubbleComponentRoot.extend`
  overflow: hidden;
  justify-content: flex-start;

  &.galleryFirst {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
  &:not(.editing) {
    .rdw-link-decorator-icon {
      display: none;
    }
  }
  &.gallery {
    width: 100%;
    flex: 0 0 auto;
    height: initial;
  }

  .words-editor-toolbar {
    color: ${theme.slightlyDark};
    border: 1px solid ${theme.veryLight};
    background: ${theme.main};
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 30px;
    left: 10px;
    width: 140px;
    top: 200px;
    justify-content: center;
    border-radius: 10px;
    position: fixed;
    opacity: 0;
    pointer-events: none;
    transition: all .5s ${EASE_OUT};

    &.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
  .words-editor-textarea {
    color: white;
    min-width: 360px;
  }
  .rdw-option-wrapper, .rdw-dropdown-wrapper {
    border: 1px solid ${theme.slightlyDark};
    color: black;
    border-radius: 5px;
  }
  .rdw-dropdown-selectedtext {
    color: black;
  }
  .rdw-text-align-dropdown {
    margin-bottom: 5px;
  }
`

export const Description = ArticleText.extend`
  font-size: 21px;
  max-width: 780px;

  ${screen.medium`
    padding: 0;
    font-size: 18px;
  `}
`
