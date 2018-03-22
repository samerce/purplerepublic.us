import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = 's2gGuBA_acg'
const IMAGE = SRC_URL + `bubbles/self-not-actor.jpg`

let player

module.exports = {
  className: 'bubbleButton-selfNotActor',
  title: 'the self is not the actor',
  subtitle: 'power is in focus',
  renderButtonContent,
  renderDescription,
  size: 'medium',
  onClose: () => player && player.pauseVideo()
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
