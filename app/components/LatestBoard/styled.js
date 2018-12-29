import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 0 0 100%;
  margin: 60px 0 0;
  flex-wrap: wrap;
`
