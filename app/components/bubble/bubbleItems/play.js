import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

module.exports = {
  className: 'bubbleButton-play',
  title: 'wanna play?',
  subtitle: 'hey there',
  renderButtonContent,
  renderDescription,
  actions: [{
    text: 'go!',
    onClick: () => {
      window.location = '#hello'
    },
  }],
  size: 'medium',
}

function renderButtonContent() {
  return (
    <BubbleButtonImage src={SRC_URL + 'commons/grandma-bubbles-mobile.jpg'} />
  )
}

function renderDescription() {
  return (
    <div>
      explore a new way to engage with the internet. come experiment with transcending habit in favor of deep thinking as instinct.
    </div>
  )

}
