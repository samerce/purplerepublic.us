import React from 'react'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const IMAGE = SRC_URL + `bubbles/lampshade.jpg`

module.exports = {
  className: 'bubbleButton-lampshade',
  title: 'lampshade',
  subtitle: 'our last project',
  renderButtonContent,
  renderDescription,
  size: 'medium',
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
