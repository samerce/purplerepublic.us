import React from 'react'
import YouTubeVideo from 'react-youtube'

import {
  VideoRoot, Button,
} from './styled'
import {
  WidgetRoot
} from '../../global/styled'

import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import resizable from '../hocs/resizable'

import {YOUTUBE_URL} from '../../global/constants'

@resizable()
export default class YouTubeWidget extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      videoConfig: getVideoConfig(),
    }
  }

  onResize() {
    this.setState({videoConfig: getVideoConfig()})
  }

  render() {
    return (
      <WidgetRoot>
        <VideoRoot>
          <i className='fa fa-youtube' />
          <YouTubeVideo
            videoId={'rmXjuF1GLK0'}
            onReady={this.onVideoReady}
            opts={this.state.videoConfig}
          />
        </VideoRoot>

        <Button onClick={this.openChannel}>
          <div>go to youtube</div>
        </Button>
      </WidgetRoot>
    )
  }

  @autobind
  onVideoReady() {

  }

  @autobind
  openChannel() {
    openInNewTab(YOUTUBE_URL)
  }

}

function getVideoConfig() {
  const width = Math.min(400, window.innerWidth * .95)
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
