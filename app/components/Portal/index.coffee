import React from 'react'

import {
  Root, Title, GifRoot, getTopFudge, FaerieRoot, ScrollTempt,
  ContentRoot,
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
getTopStyles
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
    {spot, energy, view, quark, fruitScrolled} = @props
    {innerWidth, innerHeight} = window
    styles = @getStyles(portal, innerWidth, innerHeight)
    {id, title} = portal
    style = styles[spot] or {}
    classes = cx {
      ['spot-' + spot]: yes,
      [energy]: yes,
      [view]: yes,
      hidden: (view is View.quark) and (quark isnt id),
      scrolled: fruitScrolled,
    }
    <Root
      className={classes} {...style}>
      <ContentRoot className={classes} {...style}>
        <GifRoot {...style} className={classes} onClick={@onClickPortal}>
          <img src={GIF_ROOT_URL + id + '.gif'} className={'gif spot-' + spot} />
          <div className={'gif still spot-' + spot}>
            <img src={GIF_ROOT_URL + id + '.jpg'} />
          </div>
        </GifRoot>

        <Title className={'spot-' + spot}>
          {title}
          <div>{title}</div>
        </Title>
        <ScrollTempt
          className={"fa fa-arrow-circle-o-down spot-#{spot} #{view}"}
        />
      </ContentRoot>
    </Root>

  onClickPortal: => window.location = "#/#{@props.energy}/#{@getPortal().id}"

  onClickClose: => window.location = "#/#{@props.energy}"

  getPortal: () => @props.portals[@props.spot]

  getStyles: memoize (portal, screenHeight, screenWidth) =>
    {
      top: getTopStyles(portal),
      bottomRight: getBottomStyles(portal),
      bottomLeft: getBottomStyles(portal),
    }

# ---

getTopStyles = ({position = {}}) ->
  {innerWidth: size, innerHeight: screenHeight} = window
  sizeSq = Math.pow(size, 2)
  bisectHalfSq = Math.pow(Math.sqrt(sizeSq + sizeSq) / 2, 2)
  {
    top: -Math.sqrt(sizeSq - bisectHalfSq) + getTopFudge(),
    topOffset: size / 7,
    size,
    yOffset: screenHeight / 4,
    xOffsetImg: 0,
    yOffsetImg: position.yOffset or 0,
  }

getBottomStyles = ({position = {}}) ->
  height = window.innerHeight
  {
    height,
    width: height * (16 / 9),
    xOffsetImg: position.xOffset || 0,
    yOffsetImg: 0,
  }
