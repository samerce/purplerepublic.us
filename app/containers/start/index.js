import React from 'react'
import Backdrop from './backdrop'
import Logo from '../../components/logoBubble'
import HookEmHeader from '../../components/HookEmHeader'
import TopNav from '../../components/TopNav'
import StackGrid from '../../components/StackGrid'
import LatestBoard from '../../components/LatestBoard'
import GetSocialWithUs from '../../components/getSocialWithUs'
import Bubbleverse from '../../components/bubbleverse'
import PoetcardHero from '../../components/PoetcardHero'
import BookHero from '../../components/BookHero'
import Announcements from '../../components/Announcements'
import CampaignHero from '../../components/CampaignHero'
import Cast from '../../components/Cast'
import SupportUs from '../../components/SupportUs'

import {
  Root, ScrollContainer,
} from './styled'

import {canShowEditingTools} from '../../utils/nav'
import sha256 from 'tiny-sha256'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'

const editPasscode = 'd3ef743cf28c7bf034bb6ca97c19028049c8bf135aa89974d62b62b8aabc072b'

// import why from 'why-did-you-update'
// why(React)

@connect(d => ({
  isLogoWorldVisible: d.get('topNav').get('isExploreOpen') || d.get('topNav').get('isShopOpen'),
}))
export default class Start extends React.Component {

  componentWillMount() {
    if (process.env.NODE_ENV === 'production' && canShowEditingTools()) {
      const passcode = prompt('passcode, madam?') || ''
      if (!passcode.length || sha256(passcode) !== editPasscode) {
        alert('no entry fo yew.')
        window.location = '#intro'
      }
    }
  }

  componentDidMount() {
    this.scrollContainer = findDOMNode(this.scrollContainerRef)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogoWorldVisible && !this.props.isLogoWorldVisible) {
      this.scrollContainer.scrollTo(0, 0)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Root>
        <Backdrop />
        <ScrollContainer ref={r => this.scrollContainerRef = r} id='startRoot'>
          <Logo />
          <TopNav />
          <HookEmHeader />
          <Announcements />
          <PoetcardHero />
          <BookHero />
          <LatestBoard />
          <Cast />
          <SupportUs />
        </ScrollContainer>
        <Bubbleverse />
        <GetSocialWithUs />
      </Root>
    )
  }

}
