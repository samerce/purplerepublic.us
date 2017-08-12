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

// other image: https://c1.staticflickr.com/5/4217/35492205630_2b63af4d4c_b.jpg

export default class Learning extends React.Component {
  render() {
    return (
      <Root style={{backgroundImage:
        'url("https://c1.staticflickr.com/5/4309/35476210014_92b08fa4a5_b.jpg")'
      }}>
        <ContentArea>
          <Header>
            <Scribble>(lifelong)</Scribble>
            boundless curiosity
          </Header>
          <BodyCircle>
            many people aren’t ready for school when they are younger. many wake up at 21 or 31 wishing they had taken their education more seriously. only now they feel it is too late. now they may have children. now they work two jobs to keep food on the table. now they’ve been priced out of bettering themselves.
          </BodyCircle>

          <BodyCircleRight>
            going back to school is a formidable foe. resentment and isolation and fear of a life of struggle settles into the bone. from here we learn to blame and hate.
          </BodyCircleRight>

          <BodyCircle>
            we can allow people to learn when their nature is ready to learn. we all arrive at things at a different pace. if you decide at 27 you are ready to go back to school, a free school should be there for you to go back to.
          </BodyCircle>

          <BodyCircleRight>
            the money is there. do not allow yourself to be fooled for a second longer. we are the richest nation. we have enough to ensure a successful, safe, educated, enlightened, joyous life for each of our citizens. we just have to believe what we know to be true and stop listening to politicians and media and naysayers who want to use shock doctrine, conditioning, and outright propoganda to deter us from asking tough questions.
          </BodyCircleRight>

          <MessageInput placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
