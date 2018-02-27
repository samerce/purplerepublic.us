import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '0iAe2JrH4ck'
const IMAGE = SRC_URL + `bubbles/senateWin.jpg`

module.exports = {
  className: 'bubbleButton-senateWin',
  title: 'drag queen wins senate seat!',
  subtitle: 'surprise landslide victory',
  renderButtonContent,
  renderDescription,
  size: 'small',
}

function renderButtonContent() {
  return <BubbleButtonImage src={IMAGE} />
}

function renderDescription() {
  const onVideoReady = () => {}
  return (
    <div style={{textAlign: 'center'}}>
      <YouTubeVideo
        videoId={VIDEO_ID}
        onReady={onVideoReady}
        opts={getVideoOptions()} />
    </div>
  )
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
      loop: 1,
      modestbranding: 1,
      playlist: [VIDEO_ID],
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
