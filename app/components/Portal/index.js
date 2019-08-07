import React from 'react'
import MaskedGif from '../MaskedGif'

import {
  Root, Title, TemptationRoot, GifRoot, Button, InTheDeepRoot,
  getTopFudge,
} from './styled'
import {
  H2,
} from '../../global/styled'

import {connect} from 'react-redux'
import resizable from '../hocs/resizable'
import autobind from 'autobind-decorator'

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
      styles: getStyles(),
      contentPaddingTop: getContentPaddingTop(),
    }
  }

  onResize() {
    this.setState({
      styles: getStyles(),
      contentPaddingTop: getContentPaddingTop(),
    })
  }

  render() {
    const {styles, contentPaddingTop} = this.state
    const {spot} = this.props
    const {id, title} = this.getPortal()
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
        </GifRoot>

        <Button className='title' onClick={this.onClickTitle}>
          {title}
        </Button>
        <Button className='close' onClick={this.onClickClose}>
          close
        </Button>

        <TemptationRoot>
          <H2>the beginning was the end all along.</H2>
        </TemptationRoot>

        <InTheDeepRoot paddingTop={contentPaddingTop}>
          this is the place. this is the time. now.<br/>
          this life is for you.<br/>
          to tinker away your blinks.<br/>
          toy with your knobs.<br/>
          nothing else matters.<br/>
          not money, not memories, not lovers, not children, not health, not trump.<br/>
          ditch the need to be rich and behold what riches present themselves before you.<br/>
          exiting the world of acquisitions requires acquiring freedom, which doesn't cost.<br/>
          purposely seek out things of low monetary value; spirit lives there.<br/>
          legacy and possession are fear's sentiment; weaponry to keep you in shackles.<br/>
          life is movement. settle and you're dead.<br/>
          vacuous thought loops and a pulse don't signify aliveness.<br/>
          all great things come from freedom. including freedom. freedom begets freedom.<br/>
          all change is birthed in freedom.<br/>
          fear or freedom. that's it.<br/><br/>

          fear, fear, fear, fear, fear, fear, fear. is the only enemy.<br/>
          root it out.<br/>
          then you, too, can make freaky as fuck drama with your few moments on this planet.<br/>
          the only other choice is fearfully regurgitating pre-chewed food into other sleeping mouths.<br/>
          all is cleared away when one is self-freed to be a person over a persona.<br/>
          isness over a walking, talking societal prognosis.<br/>
          benevolence reigns supreme in consciousness.<br/>
          it is only in sleeping ignorance can the binary exist.<br/>
          waking up frees the soul to be.<br/><br/>

          there are only two types of people... those who have set down their ego/fear and experienced a psychedelic trip.... and those who have not.<br/>
          there’s no enemy to fight so take some acid.<br/>
          exit the world of pre-chewed food. <br/>
          most heroes die mortified over their unraveled work.<br/>
          george washington died mortally wounded in his depression... realizing all his human work did and can do nothing to save his fellow man.<br/>
          the binary of heroes and villains / good and evil / richness and poverty ... is a mindset to break free from.<br/>
          to see with god's eyes/i.e. to have experienced the true nature of our collective reality... to know what is possible ...<br/>
          even on an earth full of incurable evil. . .<br/>
          helps to sit with it: there is no enemy to fight. . . except the fear locked in life itself. . .<br/>
          freedom comes with a specific melancholy. namely the knowledge that earth isn't ours to save.<br/>
          & that life is for two reasons: free the soul and enjoy playing conscious witness to triangulating spacetime.<br/>
          there are only two ways reality materializes: exploitation of fear or enjoyment of freed expression.<br/>
          i choose the conscious baptism of expansion. and am daily becoming freer and freer as a result.<br/>
          benevolent coexistence, boys.<br/>
          conveying beauty. being beauty. witnessing beauty.<br/>
          in conclusion - all business schools should be immediately closed down for spiritual renovations.<br/>
        </InTheDeepRoot>
      </Root>
    )
  }

  @autobind
  onClickTitle() {
    if (this.props.spot === 'center') {
      this.diveIntoPortal()
    } else {
      this.openPortal()
    }
  }

  @autobind
  onClickClose() {
    this.openPortal()
  }

  openPortal() {
    window.location = '#/portal/' + this.getPortal().id
  }

  diveIntoPortal() {
    window.location = '#/portal/' + this.getPortal().id + '/quark'
  }

  getPortal() {
    const {spot, portals} = this.props
    return portals[spot]
  }

}

function getStyles() {
  const {innerWidth, innerHeight} = window
  const widthSq = Math.pow(innerWidth, 2)
  const bisectHalfSq = Math.pow(Math.sqrt(widthSq + widthSq) / 2, 2)
  return {
    top: {
      top: -Math.sqrt(widthSq - bisectHalfSq) + getTopFudge(),
      height: innerWidth,
      yOffset: innerHeight / 4,
    },
    center: {
      width: innerWidth * .4,
    },
  }
}

function getContentPaddingTop() {
  return (9 * .7 * window.innerWidth) / 16
}
