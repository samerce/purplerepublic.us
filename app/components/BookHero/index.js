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
          <div>publishing soon</div>
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
            <span>take a radiant ride through the mind of a modern genius. explore what the world is like without boundaries, without fear, without duality. get on the magic carpet, bitch, let's see what this world has to offer...</span>
          </Blurb>
          <MailingListRoot>
            join the mailing list to get updates & sneak previews!
          </MailingListRoot>
        </ContentRoot>
      </Root>
    )
  }

}
