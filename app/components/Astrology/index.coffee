import React from 'react'
import Timer from './Timer.coffee'

import {
  Root, SunRoot, Sun, RaysRoot, MoonRoot, Moon,
  EarthRoot, CloseText,
} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import {Mode as View} from '../Gaiaverse/reducer'

export default connect((d) =>
  view: d.get('gaiaverse').get('mode')
) resizable() class Astrology extends React.PureComponent

  constructor: ->
    super()
    @state =
      styles: @getStyles(),

  onResize: =>
    styles = @getStyles()
    return if styles.sun.size is @state.styles.sun.size and
              styles.moon.size is @state.styles.moon.size
    @setState {styles}

  render: =>
    {styles, time} = @state
    {view} = @props
    <Root className={'view-' + view}>
      <SunRoot onClick={@onClickSun}>
        <Sun {...styles.sun} />
        <RaysRoot>

        </RaysRoot>
        <Timer />
        <CloseText>close</CloseText>
      </SunRoot>

      <MoonRoot>
        <Moon {...styles.moon} />
      </MoonRoot>

      <EarthRoot>

      </EarthRoot>
    </Root>

  onClickSun: =>
    @exitPortalDive() if @props.view is View.inTheDeep

  exitPortalDive: =>
    window.location = window.location.hash.replace('/quark', '')

  getStyles: ->
    sun:
      size: window.innerWidth,
    moon:
      size: window.innerWidth,
