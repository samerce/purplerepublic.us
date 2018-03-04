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
      it's time to <span style={{fontWeight: 'bold'}}>#wigthesystem</span> !<br /><br />

      from cabaret to congress—a drag queen's rise to senate. join us for an enchanting evening of performance, politics, & play. <br /><br />

      <span className='nolaEvent-emphasis'>
        drink. drag. democracy.<br />
        art. music. poetry.<br />
        dialogue. dance. diatribes.<br />
        + appetizers, auction, & surprises.<br />
      </span><br />

      <strong className='nolaEvent-venue'>cafe istanbul — march 29th — 6pm</strong><br />
      <span className='nolaEvent-attire'>ATTIRE: <span style={{textDecoration: 'underline'}}>purple & fabulous</span> (wigs encouraged)<br /><br /></span>

      <hr />

      <span style={{fontStyle: 'italic', fontSize: '14px'}}>
        pick-your-price tickets. proceeds go towards the efforts of the purple republic. to support women, minorities, and queers to run for office. to encourage new cultural values of expression over survival.
      </span>
    </div>
  )
}

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
}
