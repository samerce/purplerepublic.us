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

import {YOUTUBE_URL} from '../../global/constants'

@connect(d => ({
}))
export default class YouTubeWidget extends React.PureComponent {

  render() {
    return (
      <WidgetRoot>
        <VideoRoot>
          <i className='fa fa-youtube' />
          <YouTubeVideo
            videoId={'rmXjuF1GLK0'}
            onReady={this.onVideoReady}
            opts={VideoConfig}
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

const width = 400
var VideoConfig = {
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
