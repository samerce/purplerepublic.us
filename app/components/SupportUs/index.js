import React from 'react'

import {
  Root, Blurb, Button, ContentRoot, ButtonRoot,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {openInNewTab} from '../../utils/nav'
import {togglePastTimeline} from '../ThenNowWhen/actions'
import {getRandomColor} from '../../global/theme'

@connect(d => ({}))
export default class SupportUs extends React.PureComponent {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>dig us?</div>
        </SectionHeader>
        <ContentRoot>
          <Blurb>
            <p>join us! shop our art. donate to our nonprofit. become a patron. host an event. contribute ideas and art. volunteer your time. launch a local chapter.</p>

            <p>looking to make a big difference? interested in putting your money where your heart and mind are? invest in the paradigm! open an eym in your city or help us open more across the nation.</p>

            <p>and, of course: run!  500,000 offices will be up for election in 2020. launch your own grassroots campaign. we'll help.</p>
          </Blurb>
          <ButtonRoot>
            <Button color={'flik'} onClick={this.onClickDonate}>
              <i className='fa fa-heart'/>
              <div>donate</div>
            </Button>
            <Button color={'tweet'} onClick={this.onClickVolunteer}>
              <i className='fa fa-user-circle' />
              <div>volunteer</div>
            </Button>
            <Button color={'dali'} onClick={this.onClickShop}>
              <i className='fa fa-shopping-bag' />
              <div>shop</div>
            </Button>
            <Button color={'flik'} onClick={this.onClickRepresent}>
              <i className='fa fa-flag' />
              <div>represent</div>
            </Button>
            <Button color={'myrtle'} onClick={this.onClickInvest}>
              <i className='fa fa-money' />
              <div>invest</div>
            </Button>
          </ButtonRoot>
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  onClickDonate() {
    ga('send', 'event', {
      eventCategory: 'dig us',
      eventAction: 'donate clicked',
    })
    document.getElementById('payPalLink').click()
  }

  @autobind
  onClickVolunteer() {
    ga('send', 'event', {
      eventCategory: 'dig us',
      eventAction: 'volunteer clicked',
    })
    openInNewTab('mailto:whynot@expressyourmess.com')
  }

  @autobind
  onClickShop() {
    ga('send', 'event', {
      eventCategory: 'dig us',
      eventAction: 'shop clicked',
    })
    this.props.dispatch(togglePastTimeline())
  }

  @autobind
  onClickRepresent() {
    ga('send', 'event', {
      eventCategory: 'dig us',
      eventAction: 'represent clicked',
    })
    openInNewTab('mailto:whynot@expressyourmess.com')
  }

  @autobind
  onClickInvest() {
    ga('send', 'event', {
      eventCategory: 'dig us',
      eventAction: 'invest clicked',
    })
    openInNewTab('mailto:whynot@expressyourmess.com')
  }

}
