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
  isShopOpen: d.get('topNav').get('isShopOpen'),
  isExploreOpen: d.get('topNav').get('isExploreOpen'),
  introMode: d.get('intro').get('mode'),
}))
@withTransitions({prefix: 'topNav', exitDuration: 1000})
export default class TopNav extends React.Component {

  componentWillReceiveProps(nextProps) {
    const {isShopOpen, isExploreOpen, show, hide} = this.props
    if (nextProps.isShopOpen !== isShopOpen) {
      if (isShopOpen) {
        if (!nextProps.isExploreOpen) {
          hide()
        }
      } else show()
    }
    if (nextProps.isExploreOpen !== isExploreOpen) {
      if (isExploreOpen) {
        if (!nextProps.isShopOpen) {
          hide()
        }
      } else show()
    }
  }

  render() {
    const {isShopOpen, isExploreOpen, className, introMode} = this.props
    const leftClasses = cx({
      active: isShopOpen,
    })
    const rightClasses = cx({
      active: isExploreOpen,
    })
    return (
      <Root className={className + ' ' + introMode}>
        <Background />
        <CloseButton onClick={this.closeTopNav}>
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
  closeTopNav() {
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
