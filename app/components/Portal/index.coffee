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

import {
  SRC_URL, SCREEN_WIDTH_M
} from '../../global/constants'

GIF_ROOT_URL = SRC_URL + 'portals/gifs/'
MASK_ROOT_URL = SRC_URL + 'portals/borders/'

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
) resizable() class Portal extends React.PureComponent

  constructor: (props) ->
    super(props)
    @state =
      styles: @getStyles(props),

  onResize: =>
    @setState styles: @getStyles(@props)

  componentWillReceiveProps: (nextProps) =>
    if @getPortal(@props) isnt @getPortal(nextProps)
      @setState styles: @getStyles(nextProps)

  shouldComponentUpdate: (nextProps) =>
    @getPortal(@props) isnt @getPortal(nextProps)

  getPortal: (props) ->
    {spot, portals} = props
    portals[spot] or {}

  render: =>
    portal = @getPortal(@props)
    return null if !portal

    {spot} = @props
    {styles} = @state
    {id, title} = portal
    gifStyle = styles[spot] or {}
    <Root id={'laganjaScrollRoot' if spot is 'center'}
      className={'spot-' + spot}
      paddingTop={gifStyle.contentPaddingTop}>
      <GifRoot {...gifStyle} className={'spot-' + spot} onClick={this.onClickPortal}>
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

      <Button
        className={'spot-' + spot} delay={Math.random()}>
        {title}
        <div>{title}</div>
      </Button>
    </Root>

  onClickPortal: =>
    if @props.spot is 'center' then @diveIntoPortal()
    else @openPortal()

  onClickClose: => @openPortal()

  openPortal: =>
    window.location = '#/portal/' + @getPortal(@props).id

  diveIntoPortal: =>
    window.location = '#/portal/' + @getPortal(@props).id + '/quark'

  getStyles: (props) ->
    portal = @getPortal(props)
    {
      top: @getTopStyles(portal),
      center: @getCenterStyles(),
      bottomRight: @getBottomStyles(portal),
      bottomLeft: @getBottomStyles(portal),
    }

  getTopStyles: ({position = {}}) ->
    {innerWidth: topSize, innerHeight: screenHeight} = window
    sizeSq = Math.pow(topSize, 2)
    bisectHalfSq = Math.pow(Math.sqrt(sizeSq + sizeSq) / 2, 2)
    {
      top: -Math.sqrt(sizeSq - bisectHalfSq) + getTopFudge(),
      size: topSize,
      yOffset: screenHeight / 4,
      xOffsetImg: 0,
      yOffsetImg: position.yOffset or 0,
    }

  getCenterStyles: ->
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

  getBottomStyles: ({position = {}}) ->
    height = window.innerHeight
    {
      height,
      width: height * (16 / 9),
      xOffsetImg: position.xOffset || 0,
      yOffsetImg: 0,
    }
