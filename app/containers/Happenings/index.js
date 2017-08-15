import React from 'react'
import styled from 'styled-components'
import {
  BackgroundArea,
  Background,
  Root,
  CatchLine,
  SweetTalk,
  HookEm,
  WooEm,
  ShakeEm,
  When,
  Bounce,
  Jiggle,
  Pocky, Chortle, Koki, WhenPart, TicketLink,
  Invitation, GetInvolved,
} from './styled'
import {

} from '../../global/styled'

export default class Happenings extends React.Component {
  render() {
    return (
      <Root className={this.props.className}>
        <Invitation>
          <CatchLine>
            a purple rocket launch
          </CatchLine>
          <SweetTalk>
            the purple party kicks off&nbsp;
          </SweetTalk>
          <When>
            <WhenPart href='https://goo.gl/maps/6EEfQ6szGBK2' target='_blank'>
              <div>august 17th @ 6pm</div>
              <div className='link'>
                club above, heidelberg, ann arbor
              </div>
            </WhenPart>
            <TicketLink
              href='https://www.eventbrite.com/e/a-purple-rocket-launch-the-purple-party-kicks-off-tickets-36905907563?aff=es2'
              target='_blank'>
              get free tickets !
            </TicketLink>
          </When>


          <HookEm>
            <div>greetings fellow comrades, lovers, friends !</div>
            <div className='sub'>we are the purple people. & we want you !</div>
            <div className='sub'>join us for an enchanting evening of reflective conversation & artistic exploration</div>
          </HookEm>

          <WooEm>
            dialogues. art. community. performance. politics. music. movement.
          </WooEm>

          <Bounce>
            curated space to think, play, and create
          </Bounce>

          <ShakeEm>
            networking at the next level
          </ShakeEm>

          <Jiggle>
            <div>dress how the mood strikes you — from jeans to drag !</div>
            <div className='sub'>a fully stocked bar and food menu will be available for purchase</div>
            <div className='tres'>this is a donation-based event — suggested donation $9.32 to $10,4365 to zero cents.</div>
            <div className='quat'>
              only 50 spaces available for the compelled & compelling — rsvp now !
            </div>
          </Jiggle>

          <Pocky>
            come create a paradigm with us.
            <div>bring along an open mind, your inner child & a curious heart.</div>
          </Pocky>

          <When>
            <WhenPart href='https://goo.gl/maps/6EEfQ6szGBK2' target='_blank'>
              <div>august 17th @ 6pm</div>
              <div className='link'>
                club above, heidelberg, ann arbor
              </div>
            </WhenPart>
            <TicketLink
              href='https://www.eventbrite.com/e/a-purple-rocket-launch-the-purple-party-kicks-off-tickets-36905907563?aff=es2'
              target='_blank'>
              get free tickets !
            </TicketLink>
          </When>
        </Invitation>

        <GetInvolved>
          <SweetTalk className='blurb-area'>
            <div className='blurb'>
              the time is now--we are the how.

              come to an event, add & share our social media, volunteer, donate, tell your friends, brainstorm with us,  host an event, canvass,  sign the petition to get the purple party officially on the ballot !

              become a vigilante journalist, a rogue writer, a revolutionary artist,

              <div>RUN FOR OFFICE!!</div>
            </div>
          </SweetTalk>
        </GetInvolved>
      </Root>

    )
  }
}
