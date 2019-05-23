import React from 'react'
import {injectGlobal} from 'styled-components'
import autobind from 'autobind-decorator'

export default class PayPalLink extends React.Component {

  @autobind
  click() {
    this.link.click()
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className='paypal-link'>
        <input type="hidden" name="cmd" value="_donations" />
        <input type="hidden" name="business" value="FCJ9J82PKPDVY" />
        <input type="hidden" name="lc" value="US" />
        <input type="hidden" name="item_name" value="purple republic" />
        <input type="hidden" name="item_number" value="love, art, revolution" />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_SM.gif:NonHostedGuest" />
        <input type="image" ref={r => this.link = r} src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" id='payPalLink' />
      </form>
    )
  }
}

injectGlobal`
  .paypal-link {
    display: none;
  }
`
