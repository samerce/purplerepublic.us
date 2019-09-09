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
MoonEndTime = new Date('9/29/2019 00:00')

export default connect((d) =>
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
  anchor: d.get('start').get('anchor'),
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
    {view, energy, anchor} = @props
    stateClasses = "#{energy} #{view} anchor-#{anchor}"
    <Root className={stateClasses}>
      <Cosmos />

      <SunRoot onClick={@onClickSun}>
        <Sun {...styles.sun} className={stateClasses} />
        <Triangle className={stateClasses} />
        <RaysRoot>

        </RaysRoot>
        <Timer endTime={SunEndTime} className={stateClasses} />
        <CloseText className={stateClasses}>close</CloseText>
      </SunRoot>

      <MoonRoot>
        <Moon {...styles.moon} />
        <Timer endTime={MoonEndTime} className={stateClasses + ' moonTimer'} />
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
    if view is View.cosmos or view is View.quark
      window.location = '#/sun'
    if view is View.triangle
      window.location = '#/sun/nucleus'

  getStyles: ->
    sun:
      size: window.innerWidth,
    moon:
      size: window.innerWidth,
