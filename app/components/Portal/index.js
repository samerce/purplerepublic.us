import React from 'react'
import PortalFruit from '../PortalFruit'
import MaskedGif from '../MaskedGif'
import TalkingBubbles from '../TalkingBubbles'

import {
  Root, Title, GifRoot, Button, getTopFudge, FaerieRoot
} from './styled'
import {MaskWidth, MaskHeight} from '../MaskedGif/styled'

import {connect} from 'react-redux'
import resizable from '../hocs/resizable'
import autobind from 'autobind-decorator'

import {
  SRC_URL, SCREEN_WIDTH_M
} from '../../global/constants'

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
      showFaerie: false,
    }
    setTimeout(() => this.setState({showFaerie: true}), 3000)
    setTimeout(() => this.setState({showFaerie: false}), 13000)
  }

  @autobind
  onResize() {
    this.setState({styles: getStyles(this.props)})
  }

  componentDidMount() {
    this.faerie.className = this.faerie.className + ' ping'
  }

  componentWillReceiveProps(nextProps) {
    if (getPortal(this.props) !== getPortal(nextProps)) {
      this.setState({styles: getStyles(nextProps)})
    }
  }

  render() {
    const {styles, showFaerie} = this.state
    const {spot} = this.props
    const portal = getPortal(this.props)
    if (!portal) return null

    const {id, title} = portal
    const gifStyle = styles[spot] || {}
    return (
      <Root className={'spot-' + spot} paddingTop={gifStyle.contentPaddingTop}>
        <GifRoot {...gifStyle} className={'spot-' + spot} onClick={this.onClickPortal}>
          <MaskedGif
            className={'gif spot-' + spot}
            gif={GIF_ROOT_URL + id + '.gif'}
            mask={GIF_ROOT_URL + 'faerieborder.png'}
            isMasked={spot === 'center'}
          />
          <div className={'gif still spot-' + spot}>
            <img src={GIF_ROOT_URL + id + '.jpg'} />
          </div>
        </GifRoot>

        <Button
          className={'spot-' + spot}
          onClick={this.onClickPortal} delay={Math.random()}>
          {title}
        </Button>

        <FaerieRoot innerRef={r => this.faerie = r}>
          🧚<TalkingBubbles show={showFaerie} phrase="you are here now!" />
        ‍</FaerieRoot>

        {spot === 'center' &&
          <PortalFruit />
        }
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
    xOffsetImg: 0,
    yOffsetImg: position.yOffset || 0,
  }
}

function getCenterStyles() {
  const {innerWidth: screenWidth} = window
  const scaleFactor = (screenWidth <= SCREEN_WIDTH_M)? .7 : .5
  const gifWidth = screenWidth * scaleFactor
  const gifHeight = gifWidth * (9/16)
  const maskWidth = MaskWidth * scaleFactor
  const maskHeight = MaskHeight * scaleFactor
  return {
    gifWidth,
    gifHeight,
    maskWidth,
    maskHeight,
    maskTop: -(maskHeight - gifHeight) / 2 - 10,
    maskLeft: -(maskWidth - gifWidth) / 2 - 5,
    contentPaddingTop: maskHeight + 90,
  }
}

function getBottomStyles({position = {}}) {
  const height = window.innerHeight
  return {
    height,
    width: height * (16 / 9),
    xOffsetImg: position.xOffset || 0,
    yOffsetImg: 0,
  }
}
