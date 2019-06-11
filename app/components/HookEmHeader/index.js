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
        <Blurb>
          <p>
            hi there!<br/>
            <span className='love'>love. art. think.</span><br/>
            <span className='breathe'>breathe. be. repeat.</span><br/>
            <span className='welcome'>welcome home ! 💜</span>
          </p>
        </Blurb>

        <VideoRoot>
          <Video
            id='4guEZMQyA3E'
            onPlay={this.onClickVideo}
            width={() => Math.min(1200, window.innerWidth - videoWidthPadding)}
          />
        </VideoRoot>
      </Root>
    )
  }

  onClickVideo() {
    ga('send', 'event', {
      eventCategory: 'topnav',
      eventAction: 'video clicked',
    })
  }

}
