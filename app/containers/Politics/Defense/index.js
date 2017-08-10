import React from 'react';
import {Header, CatchLine} from '../../../global/styled'
import {
  Root, Background, BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, BackgroundArea, ContentArea, MessageInput,
} from '../styled'

export default class Defense extends React.Component {
  render() {
    return (
      <Root>
        <BackgroundArea>
          <Background
            src='https://c2.staticflickr.com/6/5086/13996426451_1903a4a0e0_b.jpg'
            alt='a purple republic dimension' />
        </BackgroundArea>

        <ContentArea>
          <Header>
            defense without fear
          </Header>
          <BodyCircle>
            righting wrongs around the planet requires radical renegotiation of our cultural attitude towards other countries, cultures, and faiths. then we can build completely new relations around the world. war will not bring about democracy. international intervention in the form of drones and demands does not work. it kills and it is costly.
          </BodyCircle>

          <BodyCircleRight>
            what’s more attractive than conquering? than power and wealth?
          </BodyCircleRight>

          <BodyCircle>
            educate and create opportunities for vastly expanded exploration of inter-cultural mingling. a new understanding and compassion will develop in place of the fear and shock doctrine we use today to force our way onto others under the guise of moral suasion.
          </BodyCircle>

          <BodyCircleRight>
            the only way to bring about liberty is to work from the inside out. humans cannot liberate fellow humans. liberty is a solo endeavor.
          </BodyCircleRight>

          <MessageInput placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
