import React from 'react'

import {
  Root, Title, GifRoot, getTopFudge, FaerieRoot,
  ContentRoot,
} from './styled'
import {MaskWidth, MaskHeight} from '../MaskedGif/styled'

import {connect} from 'react-redux'
import resizable from '../hocs/resizable'
import {cx} from '../../utils/style'
import {View} from '../../containers/start/reducer.coffee'
import memoize from 'memoize-one'

import {
  SRC_URL, CDN_URL, SCREEN_WIDTH_M, SCREEN_WIDTH_MS, SCREEN_WIDTH_L, SCREEN_WIDTH_ML
} from '../../global/constants'

export ScreenWidthForSeduction = SCREEN_WIDTH_ML
IMG_ROOT_URL = SRC_URL + 'portals/stills/'
VID_ROOT_URL = CDN_URL + 'portals/videos/'
getTopStyles
getBottomStyles

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
  energy: d.get('start').get('energy'),
  view: d.get('start').get('view'),
  quark: d.get('start').get('quark'),
  fruitScrolled: d.get('start').get('fruitScrolled')
) resizable() class Portal extends React.Component

  state = {
    seducing: no,
  }

  componentDidMount: => @handleScroll()
  componentDidUpdate: => @handleScroll()
  onResize: => @forceUpdate()

  shouldComponentUpdate: (nextProps) =>
    if nextProps.view is View.cosmos and @props.view isnt View.cosmos
      no
    else yes

  render: =>
    portal = @getPortal()
    {spot, energy, view, quark, fruitScrolled, seduceSpot} = @props
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
      seducing: (seduceSpot is spot) and (innerWidth <= ScreenWidthForSeduction),
      spotTopIsActive: (quark is @props.portals.top.id)
    }
    <Root
      className={classes} {...style}>
      <ContentRoot className={classes} {...style}
        onMouseEnter={@onMouseEnter} onMouseLeave={@onMouseLeave}>
        <GifRoot {...style} className={classes} onClick={@onClickPortal}>
          <div className={'gif spot-' + spot}>
            <video className='gift' loop={1} playsinline={1}
              ref={(r) => @video = r}
              src={VID_ROOT_URL + id + '.mp4'}
            />
          </div>
        </GifRoot>

        <Title className={'spot-' + spot}>
          {title}
          <div>{title}</div>
        </Title>

      </ContentRoot>
    </Root>

  onClickPortal: =>
    window.location = "#/#{@props.energy}/#{@getPortal().id}"
    @video.play()

  onClickClose: =>
    window.location = "#/#{@props.energy}"
    @video.pause()

  handleScroll: =>
    return unless @props.quark is @getPortal().id
    if @props.fruitScrolled
      @video.pause()
    else setTimeout((=> @video.play()), 500)

  onMouseEnter: => @video.play()

  onMouseLeave: => @video.pause()

  getPortal: => @props.portals[@props.spot]

  getStyles: memoize (portal, screenWidth, screenHeight) =>
    {
      top: getTopStyles(portal),
      bottomRight: getBottomStyles(portal),
      bottomLeft: getBottomStyles(portal),
    }

# ---

getTopStyles = ({position = {}}) ->
  {innerWidth: screenWidth, innerHeight: screenHeight} = window
  size = screenWidth
  left = 0
  myTopFudge = 0
  if size <= SCREEN_WIDTH_MS
    size *= 1.5
    left = myTopFudge = (screenWidth / 2) - (size / 2)
  sizeSq = Math.pow(size, 2)
  bisectHalfSq = Math.pow(Math.sqrt(sizeSq + sizeSq) / 2, 2)
  {
    left,
    top: -Math.sqrt(sizeSq - bisectHalfSq) + getTopFudge() + myTopFudge,
    topOffset: if screenWidth > SCREEN_WIDTH_MS then (size / 6) else (size / 5),
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
