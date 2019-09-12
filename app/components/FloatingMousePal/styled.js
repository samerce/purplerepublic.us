import styled from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlex,
} from '../../global/styled'
import theme from '../../global/theme'

export const Root = styled(Flex)`
  position: fixed;
  font-size: 32px;
  transform-origin: left center;
  transform: scale(0);
  z-index: 1000;

  @keyframes comein {
    100% {
      transform: none;
    }
  }

  animation-name: comein;
  animation-duration: 1s;
  animation-timing-function: ${EASE_OUT};
  animation-iteration-count: 1;
  animation-fill-mode: both;
`
