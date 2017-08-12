import React from 'react';
import {
  Root,
  Header,
  ContentArea,
} from '../../../global/styled'
import {
  BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, MessageInput,
} from '../styled'
import {Scribble} from './styled'

export default class Transparent extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
        'url("https://c2.staticflickr.com/4/3944/33856994871_16af0b3587_b.jpg")'
      }}>
        <ContentArea>
          <Header>
            <Scribble>(no, really)</Scribble>
            real transparency
          </Header>
          <BodyCircle>
            perpetual empowerment through collectively-cultivated conversation
          </BodyCircle>

          <BodyCircleRight>
            beyond the rhetoric, beyond the soundbite: politics and policy built by us, that works for us.
          </BodyCircleRight>

          <BodyCircle>
            we must ask why. and then why again. no anticipatory obedience. blind acceptance kills. tyrants are installed. hate is learned.
          </BodyCircle>

          <BodyCircleRight>
            so, too, is empathy, expansion, and embrace.
          </BodyCircleRight>

          <BodyCircle>
            we must come to terms with who we are as a nation. we must look straight at our bigotries, fears, and pursuits.
          </BodyCircle>

          <BodyCircleRight>
            history doesn't repeat, it instructs. history warns and inspires.
          </BodyCircleRight>

          <BodyCircle>
            our founding fathers were against parties and factions. we were to be the united states.
          </BodyCircle>

          <BodyCircleRight>
            a nation of mindful collaboration over mindless competition.
          </BodyCircleRight>

          <BodyCircle>
            the search for common good cannot be restrained by the demands and desires of the few.
          </BodyCircle>

          <BodyCircleRight>
            it's time to use technology to create healthy, fun, open lines of communication between politicians and their constituents. between the rich and famous and their ardent followers.
          </BodyCircleRight>

          <BodyCircle>
            a government-sponsored, user-friendly tech infrastructure to ensure transparency and dialogue for our people, with real-time updates and a chance to chime in. voting matters, but active civil engagement saves a nation.
          </BodyCircle>

          <MessageInput.right placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
