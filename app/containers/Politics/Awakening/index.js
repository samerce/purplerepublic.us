import React from 'react';
import {
  Root,
  Header,
  ContentArea,
} from '../../../global/styled'
import {
  Background, BodyCircle, BodyCircleRight, ByLineRight,
  ByLine, BackgroundArea, MessageInput,
} from '../styled'
import {
  Scribble,
} from './styled'

export default class Awakening extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
        'url("https://s3.amazonaws.com/purplerepublic/awaken.jpg")'
      }}>
        <ContentArea>
          <Header>
            <Scribble>(cosmic)</Scribble>
            <Scribble.arrow>⌵</Scribble.arrow>
            a collective awakening
          </Header>

          <BodyCircle>
            it's time for a pause in the action. are we off course? let's recalibrate...take an opportunity to reflect. start again. new awareness; conscious participants. a rally for rationality.
          </BodyCircle>

          <BodyCircleRight>
            the bridge between reality and dream is effort—jump aboard the carousel of consciousness, we’re off to find the soul of a nation
          </BodyCircleRight>

          <BodyCircle>
            the goal is simple: bridge the divides that have our planet stuck. and do it in a way that celebrates life, that radically embraces the shared quantum entanglement of every one of the 7+ billion unique human journeys living together on this magical planet
          </BodyCircle>

          <BodyCircleRight>
            from city commission to senate—it’s time for a representative government that looks like those it purports to represent
          </BodyCircleRight>

          <BodyCircle>
            community counts — group processing — but that means we need to participate. we need our young, our disenfranchised, our artists, dreamers, and miracle makers to rally and rise !
          </BodyCircle>

          <MessageInput.right placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
