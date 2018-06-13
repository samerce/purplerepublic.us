import React from 'react'
import YouTubeVideo from 'react-youtube'

import autobind from 'autobind-decorator'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

export default class BubbleVideo {

  constructor(props) {
    Object.keys(props).forEach(k => this[k] = props[k])

    this.player = null
    this.shouldRenderVideo = false
    this.buttonImageSrc = SRC_URL + `bubbles/${this.videoId}.jpg`
  }

  @autobind
  renderButtonContent() {
   return <BubbleButtonImage src={this.buttonImageSrc} />
 }

  @autobind
  renderDescription(focused) {
    this.shouldRenderVideo = this.shouldRenderVideo || focused

    return (
      <div style={{textAlign: 'center'}}>
        {this.shouldRenderVideo &&
          <YouTubeVideo
            videoId={this.videoId}
            onReady={this.onVideoReady}
            opts={getVideoOptions()} />
        }
      </div>
    )
  }

  @autobind
  onClose() {
    this.player && this.player.pauseVideo()
  }

  @autobind
  onVideoReady({target}) {
    this.player = target
  }

}

function getVideoOptions() {
  return {
    width: '100%',
    origin: window.location.origin,
    playerVars: {
      rel: 0,
      showinfo: 0,
      frameborder: 0,
      allowfullscreen: 1,
      controls: 1,
      modestbranding: 1,
      color: 'white',
    },
  }
}
