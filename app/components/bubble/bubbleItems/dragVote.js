import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '8xExiMisNsc'
const IMAGE = SRC_URL + `bubbles/dragVote.jpg`

let player

module.exports = {
  className: 'bubbleButton-dragVote',
  title: 'would you vote for a drag queen?',
  subtitle: 'we took to the streets asking',
  renderButtonContent,
  renderDescription,
  size: 'medium',
  onClose: () => player && player.pauseVideo(),
}

function renderButtonContent() {
  return <BubbleButtonImage src={IMAGE} />
}

function renderDescription() {
  return (
    <div style={{textAlign: 'center'}}>
      <YouTubeVideo
        videoId={VIDEO_ID}
        onReady={onVideoReady}
        opts={getVideoOptions()} />
    </div>
  )
}

function onVideoReady({target}) {
  player = target
}

function getVideoOptions() {
  return {
    width: '90%',
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
