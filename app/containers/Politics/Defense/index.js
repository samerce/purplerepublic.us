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
import SlackInput from '../SlackInput'

export default class Defense extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
         'url("https://s3.amazonaws.com/purplerepublic/fearless.jpg")'
       }}>
        <ContentArea>
          <Header>
            defense without fear
          </Header>
          <BodyCircle>
            war will not bring about democracy. international intervention in the form of drones and demands does not work. it kills and it is costly.
          </BodyCircle>

          <BodyCircleRight>
            righting wrongs around the planet requires radical renegotiation of our cultural attitude towards other countries, cultures, and faiths.
          </BodyCircleRight>

          <BodyCircle>
            from a place of acceptance and celebration do we build bountiful foreign relations with our world.
          </BodyCircle>

          <BodyCircleRight>
            genuine inter-cultural mingling must be fostered from the top. let's trickle that down. let's create opportunities for vastly expanded exploration. understanding and compassion will develop in place of the fear and shock doctrine we use today. forced will under the guise of moral suasion is so 90s.
          </BodyCircleRight>

          <BodyCircle>
            liberty is granted from the inside out. humans cannot liberate fellow humans. it is a solo trip, best experienced by walking together. it is the job of we the people to foster space that prizes liberty, freedom, expression, dialogue, and understanding. this stops war. not iron fists and $600 billion dollar defense budgets pretending to plead lady liberty's case.
          </BodyCircle>

          <BodyCircleRight>
            terror cannot stop terror
          </BodyCircleRight>

          <BodyCircle>
            love can
          </BodyCircle>

          <SlackInput channel='defense' isRight />
        </ContentArea>
      </Root>
    )
  }
}
