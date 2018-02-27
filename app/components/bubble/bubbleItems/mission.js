import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-logo',
  title: 'mission',
  subtitle: 'purple republic\'s',
  renderButtonContent,
  renderDescription,
  size: 'large',
  actions: [{
    text: 'read more',
    onClick: () => {
      const a = document.createElement('a')
      a.href = 'https://medium.com/the-purple-republic/our-mission-42292958700d'
      a.target = '_blank'
      a.click()
    },
  }]
}

function renderButtonContent() {
  return (
    <BubbleButtonImage
      src={SRC_URL + 'bubbles/mission.jpg'} />
  )
}

function renderDescription() {
  return (
    <div>
      can love go viral?

      from cabaret to congress — we’re here to unify the human race.

      to perpetually empower a collectively-cultivated conversation

      to inspire women, minorities, and queer candidates to run for office and support them on their journey

      if not us, who? if not now, when?
    </div>
  )

}
