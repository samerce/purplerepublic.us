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

          <ByLine>
            rise ye thinkers and dreamers, lovers and builders, creators and movers !
          </ByLine>
          <br />
          <ByLineRight>
            this is the proletariat's protest--representative. playful. transparent.
          </ByLineRight>
          <br />
          <ByLine>
            how do we get politicians who think like us?
          </ByLine>
          <br />
          <ByLineRight>
            we run! a rebellion of velvet!
          </ByLineRight>
        </ContentArea>
      </Root>
    )
  }
}
