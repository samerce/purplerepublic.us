import React from 'react'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const INKY = SRC_URL + 'intro/inky.jpg'

module.exports = {
  className: 'bubbleButton-nolaEvent',
  title: "they'll tell the story of tonight",
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
      it's time to #wigthesystem !<br /><br />

      from cabaret to congress—a drag queen's rise to senate. join us for an enchanting evening of performance, politics, & play. <br /><br />

      dialogue. dance. democracy. <br />
      poetry. music. art.<br />
       food. drink. drag. <br />

      <span style={{textDecoration: 'underline'}}>attire</span>: purple (wigs encouraged)<br /><br />

      <strong style={{fontSize: '22px'}}>cafe istanbul — march 29th — 6pm</strong><br /><br />

      <span style={{fontStyle: 'italic', fontSize: '14px'}}>
        proceeds go towards the efforts of the purple republic. to support women, minorities, and queers to run for office. to encourage new national values of expression over survival.
      </span>
    </div>
  )
}

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
}
