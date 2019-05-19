import React from 'react'

import {
  Root,
} from './styled'
import {TextInput} from '../../global/styled'

export default class MailingListForm extends React.PureComponent {

  render() {
    return (
      <Root id="mc_embed_signup">
        <form action="https://purplerepublic.us16.list-manage.com/subscribe/post?u=1845fafc4ec12fea1325f3444&amp;id=13479fec2a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <div id="mc_embed_signup_scroll">
            <TextInput type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
            <div aria-hidden="true" className='hiddenInput'><input type="text" name="b_1845fafc4ec12fea1325f3444_13479fec2a" tabIndex="-1" value="" /></div>
            <div className="clear"><input type="submit" value="subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
          </div>
        </form>
      </Root>
    )
  }

}
