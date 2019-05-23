import React from 'react'
import Shop from '../Shop'
import Explore from '../Explore'

import {cx} from '../../utils/style'
import {
  Root, Button, Background, ButtonRoot, CloseButton,
} from './styled'

import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import withTransitions from '../hocs/withTransitions'

@connect(d => ({
  pastTimelineVisible: d.get('timeline').get('pastTimelineVisible'),
  futureTimelineVisible: d.get('timeline').get('futureTimelineVisible'),
  introMode: d.get('intro').get('mode'),
}))
@withTransitions({prefix: 'timeline', exitDuration: 1000})
export default class ThenNowWhen extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {pastTimelineVisible, futureTimelineVisible, show, hide} = this.props
    if (nextProps.pastTimelineVisible !== pastTimelineVisible) {
      if (pastTimelineVisible) {
        if (!nextProps.futureTimelineVisible) {
          hide()
        }
      } else show()
    }
    if (nextProps.futureTimelineVisible !== futureTimelineVisible) {
      if (futureTimelineVisible) {
        if (!nextProps.pastTimelineVisible) {
          hide()
        }
      } else show()
    }
  }

  render() {
    const {pastTimelineVisible, futureTimelineVisible, className, introMode} = this.props
    const leftClasses = cx({
      active: pastTimelineVisible,
    })
    const rightClasses = cx({
      active: futureTimelineVisible,
    })
    return (
      <Root className={className + ' ' + introMode}>
        <Background />
        <CloseButton onClick={this.closeTimeline}>
          <i className='fa fa-close' />
        </CloseButton>

        <ButtonRoot>
          <Button className={'left ' + leftClasses} onClick={this.onClickShop}>
            <i className='fa fa-shopping-bag' />
            <span>shop</span>
          </Button>

          <Button className={'right ' + rightClasses} onClick={this.onClickExplore}>
            <span>explore</span>
            <i className='fa fa-grav' />
          </Button>
        </ButtonRoot>

        <Shop />
        <Explore />
      </Root>
    )
  }

  @autobind
  closeTimeline() {
    window.location = '#start'
    document.getElementById('startRoot').scrollTop = 0
  }

  @autobind
  onClickShop() {
    window.location = '#start/shop'

    ga('send', 'event', {
      eventCategory: 'topnav',
      eventAction: 'shop clicked',
    })
  }

  @autobind
  onClickExplore() {
    window.location = '#start/explore'

    ga('send', 'event', {
      eventCategory: 'topnav',
      eventAction: 'explore clicked',
    })
  }

}
