import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = 'ZPkcFPn_Eb8'
const IMAGE = SRC_URL + `commons/${VIDEO_ID}.jpg`

let player

module.exports = {
  className: 'bubbleButton-purpleStump',
  title: 'purple stump',
  subtitle: 'little bird presents',
  renderButtonContent,
  renderDescription,
  size: 'xlarge',
  onClose: () => player && player.pauseVideo()
}

function renderButtonContent() {
  return <BubbleButtonImage src={IMAGE} />
}

function renderDescription(focused) {
  return (
    <div style={{textAlign: 'center'}}>
      {focused &&
        <YouTubeVideo
          videoId={VIDEO_ID}
          onReady={onVideoReady}
          opts={getVideoOptions()} />
      }
    </div>
  )
}

function onVideoReady({target}) {
  player = target
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

function getVideoWidth() {
  return window.innerWidth * .8
}

function getVideoHeight() {
  return getVideoWidth() / (16/9)
}
