import React from 'react';
import {Header, CatchLine} from '../../../global/styled'
import {
  Root, Background, BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, BackgroundArea, ContentArea, MessageInput,
} from '../styled'

export default class Exploration extends React.Component {
  render() {
    return (
      <Root>
        <BackgroundArea>
          <Background
            src='https://c1.staticflickr.com/5/4321/35925547236_f2127b9002_b.jpg'
            alt='a purple republic dimension' />
        </BackgroundArea>

        <ContentArea>
          <Header>
            explore to grow
          </Header>
          <BodyCircle>
            offer donation-based, city-sponsored meditation, yoga, fitness, healthy eating, art, and exploration courses
          </BodyCircle>

          <BodyCircleRight>
            make the path to self-care attractive and easy and it will be hard to refuse. cater it to the person's journey instead of a generic formula for growth and success
          </BodyCircleRight>

          <MessageInput placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
