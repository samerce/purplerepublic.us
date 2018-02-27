import React from 'react'
import YouTubeVideo from 'react-youtube'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = 'ZPkcFPn_Eb8'
const IMAGE = SRC_URL + `bubbles/lampshade.jpg`

module.exports = {
  className: 'bubbleButton-nolaMarch',
  title: 'lampshade',
  subtitle: 'our first project',
  renderButtonContent,
  renderDescription,
  size: 'large',
}

function renderButtonContent() {
  return <BubbleButtonImage src={IMAGE} />
}

function renderDescription() {
  const onVideoReady = () => {}
  return (
    <div style={{textAlign: 'center'}}>
      <iframe src="https://cdnapisec.kaltura.com/p/2031091/sp/203109100/embedIframeJs/uiconf_id/36217991/partner_id/2031091?iframeembed=true&playerId=media-preview_0_0_xnyyzux7&entry_id=0_xnyyzux7&flashvars[streamerType]=auto" width={'90%'} height='400px' allowFullScreen frameBorder="0"></iframe>
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
