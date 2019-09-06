import React from 'react'
import Timer from './Timer.coffee'
import UniverseBackdrop from './UniverseBackdrop.coffee'

import {
  Root, SunRoot, Sun, RaysRoot, MoonRoot, Moon,
  EyeRoot, CloseText,
} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import {Mode as View} from '../Gaiaverse/reducer'

SunEndTime = new Date('9/11/2019 00:00')

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
      <UniverseBackdrop />
      <SunRoot onClick={@onClickSun}>
        <Sun {...styles.sun} />
        <RaysRoot>

        </RaysRoot>
        <Timer endTime={SunEndTime} />
        <CloseText>close</CloseText>
      </SunRoot>

      <MoonRoot>
        <Moon {...styles.moon} />
      </MoonRoot>

      <EyeRoot>

      </EyeRoot>
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
