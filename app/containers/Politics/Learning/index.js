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
        'url("https://s3.amazonaws.com/purplerepublic/curious.jpg")'
      }}>
        <ContentArea>
          <Header>
            <Scribble>(lifelong)</Scribble>
            boundless curiosity
          </Header>
          <BodyCircle>
            going back to school at any age should be a right. education is how we grow our minds and our hearts. education teaches us empathy. teaches us to be curious. life is an endless education. removing barriers of entry is pivotal to maximizing our collective human potential. perhaps modern einstein, picasso, shakespeare, or spinoza are three credit hours away from their breakthrough.
          </BodyCircle>

          <BodyCircleRight>
            helplessness is bred in hopelessness. from this comes blame, denial, and hate. we all arrive at a different pace. affording education to all of society--whether at ten, eighteen, or fifty-six--should be a top priority for our nation. an educated people create. an educated people get along. an educated people increase the wealth, dynamism, and happiness of a nation.
          </BodyCircleRight>

          <BodyCircle>
            we are the richest nation in the history of the planet. the money is there. we have enough to ensure a successful, safe, educated, enlightened, joyous life for each of our citizens. we just have to believe what we know to be true and stop engaging the vacuous void of naysaying propaganda.  we mustn't be deterred from asking the tough questions. from demanding an honest reply. we mustn't be dettered from lifting each other to our god-given potential. not everyone is ready at eighteen to step into their light. we must be there to witness each other when the flower is in bloom.
          </BodyCircle>

          <BodyCircleRight>
            the free and open pursuit of knowledge—of chasing our curiosities—should be a right.
          </BodyCircleRight>

          <MessageInput placeholder='What do you think?'/>
        </ContentArea>
      </Root>
    )
  }
}
