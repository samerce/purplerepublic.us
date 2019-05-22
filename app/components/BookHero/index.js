import React from 'react'
import MailingListForm from '../MailingListForm'
import {SectionHeader} from '../tinySpells'

import {
  Root, MailingListRoot,
} from './styled'
import {
  Body, H1, H2,
} from '../../global/styled'

import {connect} from 'react-redux'

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class BookHero extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader text='upcoming book release' />
        <H1>perpetually unfinished</H1>
        <H2>look out for it in late 2019, everywhere books are sold!</H2>

        <Body className='body'>
          <i className='fa fa-book' />
          <p>
            a story about a schizophrenic drag queen attempting to get famous by becoming a pop star president addicted to poker and marijuana. a radiant ride through a world  without boundary. get on the magic carpet, bish. fear is a mind state. liberation depends on where you focus.
          </p>
        </Body>

        <H1>join the mailing list!</H1>
        <H2>exclusive sneak previews + updates on the writing journey</H2>
        <MailingListForm className='mailingListForm' />
      </Root>
    )
  }

}
