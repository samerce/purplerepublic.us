import React from 'react'
import styled from 'styled-components'
import {
  Root,
  ContentArea,
  Header,
  SweetTalk,
} from '../../global/styled'
import {

} from './styled'

//https://c1.staticflickr.com/3/2535/3674436667_319f902890_b.jpg

export default class Action extends React.Component {
  render() {
    return (
      <Root className={`action-root ${this.props.className}`}
         style={{backgroundImage: 'url("https://s3.amazonaws.com/purplerepublic/electric.jpg")'}}>
        <ContentArea className='action-main'>
          <Header>
            get involved!
          </Header>

          <SweetTalk className='action-blurb'>
            the time is now--we are the how.

            come to an event, add & share our social media, volunteer, donate, tell your friends, brainstorm with us,  host an event, canvass,  sign the petition to get the purple party officially on the ballot !

            become a vigilante journalist, a rogue writer, a revolutionary artist,

            <div>RUN FOR OFFICE!!</div>
          </SweetTalk>
        </ContentArea>
      </Root>
    )
  }
}
