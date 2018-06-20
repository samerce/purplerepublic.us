import React from 'react'
import {SRC_URL} from '../../../global/constants'

import {Description} from './styled'

module.exports = {
  className: 'bubbleButton-play',
  title: 'wanna play?',
  subtitle: 'hey there',
  buttonImageUrl: SRC_URL + 'commons/grandma-bubbles-mobile.jpg',
  actions: [{
    text: 'go!',
    onClick: () => window.location = '#hello',
  }],
  size: 'medium',
  Component: () => (
    <Description>
      explore a new way to engage with the internet. come experiment with transcending habit in favor of deep thinking as instinct.
    </Description>
  ),
}
