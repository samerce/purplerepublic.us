import React from 'react'
import SlackInput from '../../containers/Politics/SlackInput'

import {
  Root, ShippingRoot, ShippingInput, PayPalButtons,
} from './styled'

import autobind from 'autobind-decorator'

const ShippingFields = [
  'name', 'address1', 'address2', 'city', 'state', 'postcode',
]

/* expects:
order: {
  total: int,
  subtotal: int,
  tax: int, [optional]
  description: string, [optional]
  items: [
    {
      name: string,
      description: string,
      price: int,
      tax: int,
      quantity: int,
      sku: string,
    }
  ],
  shipping: {
    total: int, [optional]
    name: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    postcode: string,
    country: string, [optional]
  }
} */
export default class Checkout extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      shipping: {},
    }
  }

  componentDidMount(prevProps) {
    window.paypal.Buttons({
      style: {
        shape: 'pill',
      },
      createOrder: this.createOrder,
      onApprove: this.onApprove,
      onError: this.onError,
    }).render('#paypalButtons')
  }

  render() {
    return (
      <Root>
        <ShippingRoot>
          {ShippingFields.map(this.renderShippingInput)}
        </ShippingRoot>

        <PayPalButtons id='paypalButtons' />

        <SlackInput
          channel='orders'
          className='slackInput'
          ref={r => this.slackInput = r}
        />
      </Root>
    )
  }

  @autobind
  renderShippingInput(id) {
    return (
      <ShippingInput
        onChange={e => this.onChangeInput(id, e)}
        value={this.state.shipping[id]}
        placeholder={id}
        key={id}
      />
    )
  }

  @autobind
  onChangeInput(id, {target}) {
    this.setState({
      shipping: {
        ...this.state.shipping,
        [id]: target.value,
      }
    })
  }

  @autobind
  createOrder(data, actions) {
    return actions.order.create(getOrderDetails(this.props.order, this.state.shipping))
  }

  @autobind
  onApprove(data, actions) {
    return actions.order.capture().then(details => {
      this.props.onSuccess()
      // https://developer.paypal.com/docs/api/orders/v2/#orders_get
      this.slackInput.post(
        JSON.stringify(details, null, 2) +
        '\n🎉——————————————🤩———————————————🎉'
      )
    })
  }

  @autobind
  onError(err) {
    this.props.onError()
  }

}

function getOrderDetails(order, shipping) {
  return {
    intent: 'CAPTURE',
    application_context: {
      brand_name: 'express your mess',
      user_action: 'PAY_NOW',
    },
    purchase_units: [{
      amount: {
        ...getPrice(order.total),
        breakdown: {
          item_total: getPrice(order.subtotal),
          tax_total: getPrice(order.tax || 0),
          shipping: getPrice(order.shippingTotal || 0),
        },
      },
      payee: {
        email_address: 'rise@purplerepublic.us',
      },
      description: order.description, // max 127 chars
      items: order.items.map(item => ({
        ...item,
        category: 'PHYSICAL_GOODS',
        unit_amount: getPrice(item.price),
        tax: getPrice(item.tax || 0),
      })),
      shipping: {
        name: {
          full_name: shipping.name,
        },
        address: {
          address_line_1: shipping.address1,
          address_line_2: shipping.address2,
          admin_area_2: shipping.city,
          admin_area_1: shipping.state,
          postal_code: shipping.postcode,
          country_code: shipping.country || 'US',
        },
      },
      note_to_payer: 'thanks for supporting the love revolution!',
      custom_id: Date.now(),
      soft_descriptor: 'expressyourmess', // appears on credit card statements
      //invoice_id: '12345',
    }],
  }
}

function getPrice(intPrice) {
  return {
    value: intPrice.toString(),
    currency_code: 'USD',
  }
}
