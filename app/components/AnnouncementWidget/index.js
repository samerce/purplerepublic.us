import React from 'react'

import {
  Blurb, Root, Row, Button,
} from './styled'

import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {EMAIL_URL} from '../../global/constants'

@connect(d => ({
}))
export default class AnnouncementWidget extends React.PureComponent {

  render() {
    return (
      <Root>
        <Row>
          <Blurb>
            <i className='fa fa-bullhorn' />
            <div>calling all actors, dreamers, performers, artists, retail gurus, social media gurus, philosophers, revolutionaries, all around unicorns! we have an insane opportunity for two lucky ducks — holding ongoing casting calls/interviews until we find our magical creatures.</div>
          </Blurb>
        </Row>

        <Button onClick={this.openEmail}>
          <div>get in touch</div>
        </Button>
      </Root>
    )
  }

  @autobind
  openEmail() {
    openInNewTab(EMAIL_URL)
  }

}
