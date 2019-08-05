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
import resizable from '../hocs/resizable'

import {SRC_URL} from '../../global/constants'

const GIF_ROOT_URL = SRC_URL + 'portals/gifs/'
const MASK_ROOT_URL = SRC_URL + 'portals/borders/'

@connect(d => ({
  portals: d.get('gaiaverse').get('portals'),
}))
@resizable()
export default class Portal extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      styles: getStyles()
    }
  }

  onResize() {
    this.setState({styles: getStyles()})
  }

  render() {
    const {spot, portals} = this.props
    const config = portals[spot]
    config.title = config.title || 'dissonance'
    const {id, title} = config
    const {styles} = this.state
    const style = styles[spot] || {}
    return (
      <Root className={'spot-' + spot}>
        <GifRoot {...style}>
          <MaskedGif
            className='gif'
            gif={GIF_ROOT_URL + id + '.gif'}
            mask={MASK_ROOT_URL + id + '.png'}
            isMasked={spot !== 'center'}
          />
          <DiveInButton>{title}</DiveInButton>
          <CloseButton>close</CloseButton>
        </GifRoot>

        <TemptationRoot>
          <H2>the beginning was the end all along.</H2>
        </TemptationRoot>

        <InTheDeepRoot>

        </InTheDeepRoot>

      </Root>
    )
  }

}

function getStyles() {
  const {innerWidth, innerHeight} = window
  const widthSq = Math.pow(innerWidth, 2)
  const bisectHalfSq = Math.pow(Math.sqrt(widthSq + widthSq) / 2, 2)
  return {
    top: {
      top: -Math.sqrt(widthSq - bisectHalfSq),
      height: innerWidth,
      yOffset: innerHeight / 4,
    },
    center: {
      width: innerWidth * .4,
    },
  }
}
