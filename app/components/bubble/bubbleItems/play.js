import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

module.exports = {
  className: 'bubbleButton-logo',
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
      let's take a ride together
    </div>
  )

}
