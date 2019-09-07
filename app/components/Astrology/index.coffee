import React from 'react'
import Timer from './Timer.coffee'
import Cosmos from './Cosmos.coffee'

import {
  Root, SunRoot, Sun, RaysRoot, MoonRoot, Moon,
  EyeRoot, CloseText, Triangle, Eye, Huh, HuhRoot,
} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

import {View} from '../../containers/start/reducer.coffee'
import {setStartView} from '../../containers/start/actions.coffee'

SunEndTime = new Date('9/11/2019 00:00')

export default connect((d) =>
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
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
    {view, energy} = @props
    <Root className={energy + ' ' + view}>
      <Cosmos />

      <SunRoot onClick={@onClickSun}>
        <Sun {...styles.sun} />
        <Triangle />
        <RaysRoot>

        </RaysRoot>
        <Timer endTime={SunEndTime} />
        <CloseText>close</CloseText>
      </SunRoot>

      <MoonRoot>
        <Moon {...styles.moon} />
      </MoonRoot>

      <EyeRoot>
        <Eye className='fa fa-eye' />
      </EyeRoot>

      <HuhRoot>
        <Huh>?</Huh>
      </HuhRoot>
    </Root>

  onClickSun: =>
    {dispatch, view} = @props
    if view is View.cosmos
      dispatch setStartView(View.triangle, 'sun')
    if view is View.triangle
      dispatch setStartView(View.quark)

  exitPortalDive: =>
    window.location = window.location.hash.replace('/quark', '')

  getStyles: ->
    sun:
      size: window.innerWidth,
    moon:
      size: window.innerWidth,
