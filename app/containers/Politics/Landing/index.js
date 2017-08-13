import React from 'react';
import {
  CatchLine,
  ContentArea,
} from '../../../global/styled'
import {
  BodyCircle, BodyCircleRight, ByLineRight,
  Subtitle, ByLine, OurPolitics,
} from '../styled'
import {
  Root,
  Scribble,
} from './styled'

export default class Landing extends React.PureComponent {
  render() {
    return (
      <Root style={{backgroundImage:
        'url("https://s3.amazonaws.com/purplerepublic/broccoli.jpg")'
      }}>
        <ContentArea>
          <CatchLine>
            <Scribble>
              (fearless)
            </Scribble>
            dialogues for democracy
          </CatchLine>
          <Subtitle>
            purple — because democracy is a red
            <span style={{
              textDecoration: 'underline',
              padding: '0 8px'
            }}>AND</span>
            blue thing
          </Subtitle>

          <ByLine style={{transform: 'rotateZ(2deg)'}}>
            can love go viral? we're here to unify the human race.
          </ByLine>
          <br />
          <br />
          <ByLineRight style={{transform: 'rotateZ(-1deg)'}}>
            to perpetually empower a collectively-cultivated conversation
          </ByLineRight>
          <br />
          <br />
          <br />
          <ByLine style={{transform: 'rotateZ(-1deg)'}}>
            if not us, who? if not now, when?
          </ByLine>
          <br />
          <br />
          <br />
          <ByLineRight style={{transform: 'rotateZ(2deg)'}}>
            rise ye thinkers & dreamers, lovers & builders, shakers & creators!
          </ByLineRight>
          <br />
          <br />
          <br />
          <ByLine style={{transform: 'rotateZ(-1deg)'}}>
            the proletariat's peaceful protest—representative. playful. transparent.
          </ByLine>
          <br />
          <br />
          <br />
          <ByLineRight style={{transform: 'rotateZ(-3deg)'}}>
            how do we get politicians who think, dream & act like us?
          </ByLineRight>
          <br />
          <br />
          <br />
          <ByLine style={{transform: 'rotateZ(1deg)'}}>
            we run! a rebellion of velvet!
          </ByLine>
          <br />
          <ByLineRight style={{marginTop: '15px', transform: 'rotate(2deg)'}}>
            we must act out our beliefs. ideas are preludes to creation. creation is action. let's act !
          </ByLineRight>

          <OurPolitics>
            <div className='reassureBlock'>
              inspired action requires thought. the purple party wants to build invigorated policy through deliberate dialogues, the beginnings of which are below. take a look, add your thoughts, create new politics with us !
            </div>
            <div className='videoBlock'>
              <div className='blurb'>
                a grassroots movement of vigilante journalism, rogue writers, revolutionary artists, & rational dialogue driven by curiosity, exploration, and love--starts with you!
                we're here to help ! a little belief and follow through & this whole thing goes viral. . .
              </div>
              <div className='video'>
                <iframe
                   src="https://www.youtube.com/embed/fnnR-9JmAjE" frameBorder="0" allowFullScreen />
              </div>
            </div>
          </OurPolitics>
        </ContentArea>
      </Root>
    )
  }
}
