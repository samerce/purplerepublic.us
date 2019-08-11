import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, AbsoluteFlex,
} from '../../global/styled'
import theme from '../../global/theme'

export const WordRollDuration = 500

export const Root = Flex.extend`
  position: relative;
  width: 150px;
  height: 30px;
  overflow: hidden;
`

export const Word = AbsoluteFlex.extend`
  left: 0;
  opacity: 0;
  transition: all ${WordRollDuration}ms ${EASE_OUT};

  &#present {
    top: 0;
    opacity: 1;
  }
  &#past {
    top: -100%;
  }
  &#future {
    top: 100%;
  }
`
