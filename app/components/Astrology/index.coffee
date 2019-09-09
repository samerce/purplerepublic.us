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

SunEndTime = new Date('9/11/2019 00:00')
MoonEndTime = new Date('9/29/2019 00:00')

export default connect((d) =>
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
  anchor: d.get('start').get('anchor'),
) class Astrology extends React.PureComponent

  render: =>
    {view, energy, anchor} = @props
    classes = "#{energy} #{view} anchor-#{anchor}"
    <Root className={classes}>
      <Cosmos />

      <SunRoot onClick={@onClickSun}>
        <Sun className={classes} />
        <Triangle className={classes} />
        <Timer endTime={SunEndTime} className={classes} />
        <CloseText className={classes}>close</CloseText>
      </SunRoot>

      <MoonRoot>
        <Moon />
        <Timer endTime={MoonEndTime} className={classes + ' moonTimer'} />
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
