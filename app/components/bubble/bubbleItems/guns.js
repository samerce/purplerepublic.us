import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '89KE9NknQ8c'
const IMAGE = SRC_URL + `commons/${VIDEO_ID}.jpg`

let player

module.exports = {
  className: 'bubbleButton-guns',
  title: 'drugs, drag queens, guns, & corruption',
  subtitle: 'little bird talks',
  renderButtonContent,
  renderDescription,
  renderExpandedContent,
  size: 'xlarge',
  onClose: () => player && player.pauseVideo(),
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

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
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
