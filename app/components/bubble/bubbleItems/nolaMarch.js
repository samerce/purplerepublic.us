import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '89KE9NknQ8c'
const IMAGE = SRC_URL + `commons/${VIDEO_ID}.jpg`

module.exports = {
  className: 'bubbleButton-nolaMarch',
  title: 'drugs, drag queens, guns, & corruption',
  subtitle: 'little bird talks',
  renderButtonContent,
  renderDescription,
  renderExpandedContent,
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

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
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
