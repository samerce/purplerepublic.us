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
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  border: 5px solid white;
  padding: 0;
  margin: 0 auto;
  max-width: 1024px;

  & > * {
    flex: 50%;

    ${screen.medsmall`
      flex: 100%;
    `}
  }
  img {
    width: 100%;
    border: 5px solid white;
  }

  .image-gallery {
    display: none;
  }
`
