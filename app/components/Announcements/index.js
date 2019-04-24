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
              <div>
                it's up to us, friends. free thinking minds—led by open hearts and expansive spirits—are a threat to the system. it's time we take back our collective power. oppressors limit our imagination. convince us life will crash down without them. we're desperate for a greater destiny. a deeper dance with reality. what does your utopia look like?
              </div>
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
