import React from 'react';
import {Header, CatchLine} from '../../../global/styled'
import {
  Root, Background, BodyCircle, BodyCircleRight, ByLineRight,
  Subtitle, ByLine,
} from '../styled'
import {
  ContentArea,
  Scribble,
  BackgroundArea,
} from './styled'

export default class Landing extends React.PureComponent {
  render() {
    return (
      <Root>
        <BackgroundArea>
          <Background
            src='http://payload225.cargocollective.com/1/10/350538/6810177/08-IDEO_670.jpg'
            alt='a purple republic dimension' />
        </BackgroundArea>

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
        </ContentArea>
      </Root>
    )
  }
}
