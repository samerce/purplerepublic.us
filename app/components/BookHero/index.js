import React from 'react'

import {
  Root, IconGroup, Blurb, MailingListRoot, ContentRoot,
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
            join the mailing list to get updates & sneak previews!
          </MailingListRoot>
        </ContentRoot>
      </Root>
    )
  }

}
