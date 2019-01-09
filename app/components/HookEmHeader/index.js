import React from 'react'
import YouTubeVideo from 'react-youtube'

import {
  Root, Blurb, Title, VideoRoot
} from './styled'

import autobind from 'autobind-decorator'

export default class HookEmHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      videoConfig: getVideoConfig(),
    }
  }

  componentDidMount() {
     this.onResize = _.throttle(() => {
      this.setState({videoConfig: getVideoConfig()})
    }, 100)
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

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
    return (
      <Root>
        <VideoRoot
          ref={r => this.videoRoot = r}
          onClick={this.expandVideo}>
          <YouTubeVideo
            videoId={'rmXjuF1GLK0'}
            onReady={this.onVideoReady}
            opts={this.state.videoConfig}
          />
        </VideoRoot>

        <Blurb>
          collapse the paradox. let go of binary. live fearlessly.
        </Blurb>
      </Root>
    )
  }

  @autobind
  onVideoReady({target}) {
    this.introVideo = target
  }

  @autobind
  expandVideo() {
    const iframe = this.introVideo.getIframe()
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)()
      this.videoRoot.getElementsByTagName('span')[0].css('pointer-events', 'all')
    }
  }

}

function getVideoConfig() {
  const width = Math.min(1200, window.innerWidth - 35)
  return {
    height: width / (16/9),
    width,
    origin: window.location.origin,
    playerVars: {
      rel: 0,
      frameborder: 0,
      allowfullscreen: 1,
      controls: 1,
      modestbranding: 1,
      color: 'white',
      // autoplay: 1,
    },
  }
}
