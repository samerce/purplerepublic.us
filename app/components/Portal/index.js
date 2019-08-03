import React from 'react'
import MaskedGif from '../MaskedGif'

import {
  Root, Title, TemptationRoot, GifRoot, DiveInButton, CloseButton,
  InTheDeepRoot
} from './styled'
import {
  H2,
} from '../../global/styled'

import {connect} from 'react-redux'

import {SRC_URL} from '../../global/constants'

const GIF_ROOT_URL = SRC_URL + 'portals/gifs/'
const MASK_ROOT_URL = SRC_URL + 'portals/borders/'

@connect(d => ({
  portals: d.get('gaiaverse').get('portals'),
}))
export default class Portal extends React.PureComponent {

  render() {
    const {spot, portals} = this.props
    const config = portals[spot]
    const {id} = config
    return (
      <Root className={'spot-' + spot}>
        <GifRoot>
          <MaskedGif
            className='gif'
            gif={GIF_ROOT_URL + id + '.gif'}
            mask={MASK_ROOT_URL + id + '.png'}
            isMasked={spot !== 'center'}
          />
          <DiveInButton>dive in</DiveInButton>
          <CloseButton>close</CloseButton>
        </GifRoot>

        <TemptationRoot>
          <Title>
            dissonance.
          </Title>
          <H2>the beginning was the end all along.</H2>
        </TemptationRoot>

        <InTheDeepRoot>

        </InTheDeepRoot>
      </Root>
    )
  }

}
