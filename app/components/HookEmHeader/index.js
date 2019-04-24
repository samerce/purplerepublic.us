import React from 'react'
import Video from '../Video'

import {
  Root, Blurb, Title, VideoRoot
} from './styled'

import {connect} from 'react-redux'

import {SCREEN_WIDTH_M} from '../../global/constants'

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class HookEmHeader extends React.Component {

  render() {
    if (this.props.headerTitle) {
      return this.renderTitleHeader()
    }
    return this.renderSingularityHeader()
  }

  renderTitleHeader() {
    return (
      <Root>
        <Title>{this.props.headerTitle}</Title>
      </Root>
    )
  }

  renderSingularityHeader() {
    const videoWidthPadding = (window.innerWidth <= SCREEN_WIDTH_M)? 35 : 120
    return (
      <Root className={this.props.introMode}>
        <VideoRoot>
          <Video
            id={'8xExiMisNsc'}
            onPlay={this.onClickVideo}
            width={() => Math.min(1200, window.innerWidth - videoWidthPadding)}
          />
        </VideoRoot>

        <Blurb>
          <p>if not us, who? if not now, when?</p>
          <p>there are 500,000 offices up for election. pick one and run. we'll help!</p>
        </Blurb>
      </Root>
    )
  }

  onClickVideo() {
    console.log('playing video')
    ga('send', 'event', {
      eventCategory: 'topnav',
      eventAction: 'video clicked',
    })
  }

}
