import React from 'react'
import MailingListForm from '../MailingListForm'

import {
  Root, IconGroup, Blurb, MailingListRoot, ContentRoot, Header,
} from './styled'
import {
  SectionHeader,
} from '../../global/styled'

import {connect} from 'react-redux'

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class BookHero extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader>
          <hr />
          <div>upcoming book release</div>
        </SectionHeader>
        <ContentRoot>
          <IconGroup>
            <i className='fa fa-book' />
            <i className='fa fa-heart med a' />
            <i className='fa fa-quote-right small c' />
            <i className='fa fa-eye small d' />
          </IconGroup>
          <Blurb>
            <strong>perpetually unfinished</strong>
            <i>release: late 2019, everywhere books are sold</i>
            <span>a story about a schizophrenic drag queen attempting to get famous by becoming a pop star president addicted to poker and marijuana. a radiant ride through a world  without boundary. get on the magic carpet, bish. fear is a mind state. liberation depends on where you focus.</span>
          </Blurb>
          <MailingListRoot>
            <Header>join the mailing list to get updates & sneak previews!</Header>
            <MailingListForm />
          </MailingListRoot>
        </ContentRoot>
      </Root>
    )
  }

}
