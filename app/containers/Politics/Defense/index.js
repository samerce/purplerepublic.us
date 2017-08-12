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

export default class Defense extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
         'url("https://c2.staticflickr.com/6/5086/13996426451_1903a4a0e0_b.jpg")'
       }}>
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
