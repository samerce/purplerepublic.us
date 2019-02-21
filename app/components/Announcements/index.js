import React from 'react'

import {
  Blurb, Root, Row, Button, ContentRoot,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {openInNewTab} from '../../utils/nav'
import {connect} from 'react-redux'

import {EMAIL_URL} from '../../global/constants'

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class Announcements extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader>
          <hr />
          <div>announcements</div>
        </SectionHeader>
        <ContentRoot>
          <Row>
            <Blurb>
              <i className='fa fa-bullhorn' />
              <div>calling all actors, dreamers, performers, artists, retail gurus, social media gurus, philosophers, revolutionaries, all around unicorns! we have an insane opportunity for two lucky ducks — holding ongoing casting calls/interviews until we find our magical creatures.</div>
            </Blurb>
          </Row>

          <Button onClick={this.openEmail}>
            <div>get in touch</div>
          </Button>
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  openEmail() {
    ga('send', 'event', {
      eventCategory: 'announcements',
      eventAction: 'get-in-touch clicked',
    })
    openInNewTab(EMAIL_URL)
  }

}
