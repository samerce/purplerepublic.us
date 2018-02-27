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
  renderExpandedContent,
  actions: [
    {text: 'get tickets!'}
  ]
}

function renderButtonContent() {
  return <BubbleButtonImage src={INKY} />
}

function renderDescription() {
  return (
    <div>
      a drag queen's rise to senate! drag. music. poetry. food. drink. art. dialogue. dance. democracy!<br />
      get your tickets today!<br />
      <strong>cafe istanbul — march 29th — 6pm</strong>
    </div>
  )
}

function renderExpandedContent() {
  return <div id="eventbrite-widget-container-43379695838"
              className='event-brite-checkout' />
}
