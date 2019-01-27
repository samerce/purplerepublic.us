import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex
} from '../../global/styled'

export const Root = Flex.extend`
  flex: 0 0 auto;
  width: 100%;
  padding: 40px 0 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.veryDarkTransparent};
  ${'' /* box-shadow: ${p => p.theme.shadowHeavy}; */}
  background-attachment: fixed;
  overflow: hidden;
`
