import React from 'react'

import {SRC_URL} from '../../../global/constants'

import {Description} from './styled'

export default class PlayBubble extends React.Component {

  static getActions() {
    return [{
      text: 'go!',
      onClick: () => window.location = '#hello',
    }]
  }
  static getButtonImageUrl() {
    return SRC_URL + 'commons/grandma-bubbles-mobile.jpg'
  }

  render() {
    return (
      <Description>
        explore a new way to engage with the internet. come experiment with transcending habit in favor of deep thinking as instinct.
      </Description>
    )
  }
}
