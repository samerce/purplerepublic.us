import React from 'react'
import MaskedGif from '../MaskedGif'
import TalkingBubbles from '../TalkingBubbles'

import {
  Root, Title, GifRoot, Button, getTopFudge, FaerieRoot, ScrollTempt
} from './styled'
import {MaskWidth, MaskHeight} from '../MaskedGif/styled'

import {connect} from 'react-redux'
import resizable from '../hocs/resizable'
import {cx} from '../../utils/style'
import {View} from '../../containers/start/reducer.coffee'
import memoize from 'memoize-one'

import {
  SRC_URL, SCREEN_WIDTH_M
} from '../../global/constants'

GIF_ROOT_URL = SRC_URL + 'portals/gifs/'
MASK_ROOT_URL = SRC_URL + 'portals/borders/'

getTopStyles
getCenterStyles
getBottomStyles

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
  energy: d.get('start').get('energy'),
  view: d.get('start').get('view'),
  quark: d.get('start').get('quark'),
  fruitScrolled: d.get('start').get('fruitScrolled')
) resizable() class Portal extends React.Component

  onResize: => @forceUpdate()

  shouldComponentUpdate: (nextProps) =>
    if nextProps.view is View.cosmos and @props.view isnt View.cosmos
      no
    else yes

  render: =>
    portal = @getPortal()
    return null if !portal

    {spot, energy, view, quark, fruitScrolled} = @props
    {innerWidth, innerHeight} = window
    styles = @getStyles(portal, innerWidth, innerHeight)
    {id, title} = portal
    gifStyle = styles[spot] or {}
    classes = cx {
      ['spot-' + spot]: yes,
      [energy]: yes,
      [view]: yes,
      hidden: (view is View.quark) and (quark isnt id),
      scrolled: fruitScrolled,
    }
    <Root
      className={classes}
      paddingTop={gifStyle.contentPaddingTop}>
      <GifRoot {...gifStyle} className={classes} onClick={@onClickPortal}>
        <MaskedGif
          className={'gif spot-' + spot}
          gif={GIF_ROOT_URL + id + '.gif'}
          mask={GIF_ROOT_URL + 'faerieborder.png'}
          isMasked={spot is 'center'}
        />
        <div className={'gif still spot-' + spot}>
          <img src={GIF_ROOT_URL + id + '.jpg'} />
        </div>
      </GifRoot>

      <Button className={'spot-' + spot}>
        {title}
        <div>{title}</div>
      </Button>
      <ScrollTempt
        className={"fa fa-arrow-circle-o-down spot-#{spot} #{view}"}
      />
    </Root>

  onClickPortal: => window.location = "#/#{@props.energy}/#{@getPortal().id}"

  onClickClose: => window.location = "#/#{@props.energy}"

  getPortal: () => @props.portals[@props.spot]

  getStyles: memoize (portal, screenHeight, screenWidth) =>
    {
      top: getTopStyles(portal),
      center: getCenterStyles(),
      bottomRight: getBottomStyles(portal),
      bottomLeft: getBottomStyles(portal),
    }

# ---

getTopStyles = ({position = {}}) ->
  {innerWidth: topSize, innerHeight: screenHeight} = window
  sizeSq = Math.pow(topSize, 2)
  bisectHalfSq = Math.pow(Math.sqrt(sizeSq + sizeSq) / 2, 2)
  {
    top: -Math.sqrt(sizeSq - bisectHalfSq) + getTopFudge(innerWidth),
    size: topSize,
    yOffset: screenHeight / 4,
    xOffsetImg: 0,
    yOffsetImg: position.yOffset or 0,
  }

getCenterStyles = ->
  {innerWidth: screenWidth} = window
  scaleFactor = (screenWidth <= SCREEN_WIDTH_M)? .7 : .5
  gifWidth = screenWidth * scaleFactor
  gifHeight = gifWidth * (9/16)
  maskWidth = MaskWidth * scaleFactor
  maskHeight = MaskHeight * scaleFactor
  {
    gifWidth,
    gifHeight,
    maskWidth,
    maskHeight,
    maskTop: -(maskHeight - gifHeight) / 2 - 10,
    maskLeft: -(maskWidth - gifWidth) / 2 - 5,
    contentPaddingTop: maskHeight + 90,
  }

getBottomStyles = ({position = {}}) ->
  height = window.innerHeight
  {
    height,
    width: height * (16 / 9),
    xOffsetImg: position.xOffset || 0,
    yOffsetImg: 0,
  }
