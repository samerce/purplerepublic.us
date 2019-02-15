import React from 'react'

import {
  Root, IconGroup, Blurb, MailingListRoot, ContentRoot, Header,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

export default class BookHero extends React.PureComponent {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>upcoming book release</div>
        </SectionHeader>
        <ContentRoot>
          <IconGroup>
            <i className='fa fa-book' />
            <i className='fa fa-heart med a' />
            <i className='fa fa-magic med b' />
            <i className='fa fa-quote-right small c' />
            <i className='fa fa-eye small d' />
          </IconGroup>
          <Blurb>
            <strong>i pray to all the gods</strong>
            <i>release: february 2019, everywhere books are sold</i>
            <span>a story about a schizophrenic drag queen attempting to get famous by becoming a pop star president addicted to poker and marijuana. a radiant ride through a world  without boundary. get on the magic carpet, bish. fear is a mind state. liberation depends on where you focus.</span>
          </Blurb>
          <MailingListRoot>
            <Header>join the mailing list to get updates & sneak previews!</Header>
            {this.renderMailChimpForm()}
          </MailingListRoot>
        </ContentRoot>
      </Root>
    )
  }

  renderMailChimpForm() {
    return (
      <div id="mc_embed_signup">
        <form action="https://purplerepublic.us16.list-manage.com/subscribe/post?u=1845fafc4ec12fea1325f3444&amp;id=13479fec2a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
          <div id="mc_embed_signup_scroll">
            <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
            <div aria-hidden="true" className='hiddenInput'><input type="text" name="b_1845fafc4ec12fea1325f3444_13479fec2a" tabIndex="-1" value="" /></div>
            <div className="clear"><input type="submit" value="subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
          </div>
        </form>
      </div>
    )
  }

}
