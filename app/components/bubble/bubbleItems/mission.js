import React from 'react'

import {SRC_URL} from '../../../global/constants'
import {openInNewTab} from '../../../utils/nav'

import {Description} from './styled'

module.exports = {
  className: 'bubbleButton-mission',
  title: 'mission',
  subtitle: 'purple republic\'s',
  size: 'large',
  buttonImageUrl: SRC_URL + 'bubbles/mission.jpg',
  actions: [{
    text: 'read more',
    onClick: () => openInNewTab(
      'https://medium.com/the-purple-republic/our-mission-42292958700d'
    ),
  }],
  Component: () => (
    <Description>
      can love go viral?<br /><br />

      from cabaret to congress — we’re here to unify the human race.

      to perpetually empower a collectively-cultivated conversation.

      to inspire women, minorities, and queer candidates to find leadership roles and support them on their journey.<br /><br />

      if not us, who? if not now, when?
    </Description>
  ),
}
