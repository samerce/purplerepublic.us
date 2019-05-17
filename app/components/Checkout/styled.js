import styled, {injectGlobal} from 'styled-components'
import {transparentize as alpha, darken, lighten} from 'polished'
import {EASE_OUT, EASE_IN, EASE} from '../../global/constants'
import {
  Flex, Boto, FlexColumn, TextInput,
} from '../../global/styled'

export const Root = FlexColumn.extend`
  width: 100%;

  .slackInput {
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
    height: 0;
    margin: 0;
    padding: 0;
  }
`

export const ShippingRoot = FlexColumn.extend`

`

export const ShippingInput = TextInput.extend`

`

export const PayPalButtons = Flex.extend`
  margin: 15px 0 0;

  .paypal-button-container {
    display: flex;
    flex-direction: column-reverse;
  }
  .paypal-button-number-1 {
    margin-bottom: 5px;
  }
`
