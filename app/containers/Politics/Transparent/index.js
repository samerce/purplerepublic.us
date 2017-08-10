import React from 'react';
import {Header, CatchLine} from '../../../global/styled'
import {
  Root, Background, BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, BackgroundArea, ContentArea, MessageInput,
} from '../styled'
import {Scribble} from './styled'

export default class Transparent extends React.Component {
  render() {
    return (
      <Root>
        <BackgroundArea>
          <Background
            src='https://c2.staticflickr.com/4/3944/33856994871_16af0b3587_b.jpg'
            alt='a purple republic dimension' />
        </BackgroundArea>

        <ContentArea>
          <Header>
            <Scribble>(no, really)</Scribble>
            real transparency
          </Header>
          <BodyCircle>
            beyond the sound bites, beyond the rhetoric. politics and policy that we can understand, built by us.
          </BodyCircle>

          <BodyCircleRight>
            honesty requires acceptance of our ourselves—our racism, our bigotry, our intolerance. to do that, a new conversation must emerge. no more evasion: head-on acknowledgement of our current reality and inspired action to create the next one.
          </BodyCircleRight>

          <BodyCircle>
            it's time to use technology to create healthy, fun, open lines of communication between politicians and their constituents. between the rich and famous and their ardent followers.
          </BodyCircle>

          <BodyCircleRight>
            a government-sponsored, user-friendly tech infrastructure to ensure transparency and dialogue for our people, with real-time updates and a chance to chime in. voting matters, but active civil engagement saves a nation.
          </BodyCircleRight>

          <MessageInput placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
