import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex
} from '../../global/styled'

injectGlobal`
  .latest-instagram, .latest-patreon {
    flex: 1 0 auto;
  }
`

export const Root = Flex.extend`
  flex: 0 0 100%;
  margin: 40px 0 0;
  padding: 20px 0 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.gradientVeryDark};
  box-shadow: ${p => p.theme.shadowHeavy};
  background-attachment: fixed;
`
