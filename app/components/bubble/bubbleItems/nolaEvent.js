import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const INKY = SRC_URL + 'intro/inky.jpg'
const FLYER = SRC_URL + 'intro/nolaFlyer.jpg'

module.exports = {
  className: 'bubbleButton-nolaEvent',
  title: "#wigthesystem",
  subtitle: 'our next event',
  renderButtonContent,
  renderDescription,
  // renderExpandedContent,
  actions: [
    {
      text: 'get tickets!',
      onClick: () => {
        const a = document.createElement('a')
        a.href = 'https://www.eventbrite.com/e/theyll-tell-the-story-of-tonight-tickets-43379695838'
        a.target = '_blank'
        a.click()
      },
    },
  ],
  size: 'large',
}

function renderButtonContent() {
  return <BubbleButtonImage src={INKY} />
}

function renderDescription() {
  return (
    <div>
      from cabaret to congress—a drag queen's rise to senate. join us for an enchanting evening of performance, politics, & play! <br /><br />

      <a style={{width: '100%'}} href={FLYER} target='_blank'>
        <img src={FLYER} style={{width: '100%'}} />
      </a>

      <div style={{fontStyle: 'italic', fontSize: '16px', marginTop: '20px'}}>
        <strong>pick-your-price tickets.</strong> proceeds go towards the efforts of the purple republic. to support women, minorities, and queers to run for office. to encourage new cultural values of expression over survival.
      </div>
    </div>
  )
}

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
}
