import React from 'react'
import MaskedGif from '../MaskedGif'

import {
  Root, Title, TemptationRoot, GifRoot, Button, InTheDeepRoot,
  getTopFudge,ChallengeRoot,
} from './styled'
import {
  H2,
} from '../../global/styled'
import {SCREEN_WIDTH_M} from '../../global/constants'

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

  constructor(props) {
    super()
    this.state = {
      styles: getStyles(props),
      contentPaddingTop: getContentPaddingTop(),
    }
  }

  @autobind
  onResize() {
    this.setState({
      styles: getStyles(this.props),
      contentPaddingTop: getContentPaddingTop(),
    })
  }

  componentDidUpdate(prevProps) {
    if (getPortal(this.props) !== getPortal(prevProps)) {
      this.onResize()
    }
  }

  render() {
    const {styles, contentPaddingTop} = this.state
    const {spot} = this.props
    const portal = getPortal(this.props)
    if (!portal) return null

    const {id, title} = portal
    const style = styles[spot] || {}
    return (
      <Root className={'spot-' + spot}>
        <GifRoot {...style} onClick={this.onClickPortal}>
          <MaskedGif
            className='gif'
            gif={GIF_ROOT_URL + id + '.gif'}
            mask={MASK_ROOT_URL + id + '.png'}
            isMasked={spot !== 'center'}
          />
          <div className='gif still'>
            <img src={GIF_ROOT_URL + id + '.jpg'} />
          </div>
        </GifRoot>

        <Button className='title' onClick={this.onClickPortal} delay={Math.random() * 1}>
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

          <ChallengeRoot>i dare you</ChallengeRoot>
          <br/><br/>
          <li>sit on a public bench for an hour. stare straight out and don't move a muscle.</li>
          <li>spend at least three hours without your phone.<br/></li>
          <li>run into a department store and yell at the top of your lungs what scares you the most in life right now.</li>
        </InTheDeepRoot>
      </Root>
    )
  }

  @autobind
  onClickPortal() {
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
    window.location = '#/portal/' + getPortal(this.props).id
  }

  diveIntoPortal() {
    window.location = '#/portal/' + getPortal(this.props).id + '/quark'
  }

}

function getPortal(props) {
  const {spot, portals} = props
  return portals[spot] || {}
}

function getStyles(props) {
  const portal = getPortal(props)
  return {
    top: getTopStyles(portal),
    center: getCenterStyles(),
    bottomRight: getBottomStyles(portal),
    bottomLeft: getBottomStyles(portal),
  }
}

function getTopStyles({position = {}}) {
  const {innerWidth: topSize, innerHeight: screenHeight} = window
  const sizeSq = Math.pow(topSize, 2)
  const bisectHalfSq = Math.pow(Math.sqrt(sizeSq + sizeSq) / 2, 2)
  return {
    top: -Math.sqrt(sizeSq - bisectHalfSq) + getTopFudge(),
    size: topSize,
    yOffset: screenHeight / 4,
    xOffsetImg: position.xOffset || 0,
    yOffsetImg: position.yOffset || 0,
  }
}

function getCenterStyles() {
  const {innerWidth: screenWidth} = window
  const centerScaleFactor = (screenWidth <= SCREEN_WIDTH_M)? .7 : .4
  return {
    width: screenWidth * centerScaleFactor,
  }
}

function getBottomStyles({position = {}}) {
  const height = window.innerHeight
  return {
    height,
    width: height * (16 / 9),
    xOffsetImg: position.xOffset || 0,
    yOffsetImg: position.yOffset || 0,
  }
}

function getContentPaddingTop() {
  return (9 * .7 * window.innerWidth) / 16
}
