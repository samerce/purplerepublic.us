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
export default class CampaignHero extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader>
          <hr />
          <div>purple 2020</div>
        </SectionHeader>
        <ContentRoot>
          <Row>
            <Blurb>
              <div>
                can we dare to envision a greater destiny? can we replace “when's it coming" with “it's already here"? we have a planet full of absolutely fabulous people who have lost heart. who have boarded themselves up.<br /><br />

                it's time to make space for the good to come.<br />
                it's time to move beyond fear.<br /><br />

                what do you see? what's inside of you? what wants out? we can let each other know we are here. together. part of something bigger. first we must imagine. tend to your dreamscape.<br /><br />

                what reality do we wish to be a part of?
              </div>
            </Blurb>
          </Row>

          <Button onClick={this.openEmail}>
            <div>get involved</div>
          </Button>
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  openEmail() {
    ga('send', 'event', {
      eventCategory: 'campaignHero',
      eventAction: 'get-involved clicked',
    })
    openInNewTab(EMAIL_URL)
  }

}
