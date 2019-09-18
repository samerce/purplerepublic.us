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
import memoize from 'memoize-one'

SunEndTime = new Date('9/11/2019 00:00')
MoonEndTime = new Date('9/29/2019 00:00')
SunSize = 300

export default connect((d) =>
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
  anchor: d.get('start').get('anchor'),
) resizable() class Astrology extends React.PureComponent

  onResize: => @forceUpdate()

  render: =>
    {view, energy, anchor} = @props
    power = " #{energy} #{view} "
    anchor = " anchor-#{anchor} "
    styles = @getStyles(window.innerWidth)
    <Root className={power + anchor}>
      <Cosmos />

      <SunRoot onClick={@onClickSun} className={power} {...styles}>
        <Sun className={view} />
        <Triangle />
        <Timer endTime={SunEndTime} className={view} />
        <CloseText className={power + anchor} parentSize={styles.size}>
          close
        </CloseText>
      </SunRoot>

      <MoonRoot className={power}>
        <Moon />
        <Timer endTime={MoonEndTime} className={view + ' moonTimer'} />
      </MoonRoot>

      <EyeRoot className={power}>
        <Eye className='fa fa-eye' />
      </EyeRoot>

      <HuhRoot className={power}>
        <Huh>?</Huh>
      </HuhRoot>
    </Root>

  onClickSun: =>
    {dispatch, view} = @props
    if view is View.cosmos or view is View.quark
      window.location = '#/sun'
    if view is View.triangle
      window.location = '#/sun/nucleus'

  getStyles: memoize (screenWidth) =>
    size = Math.min((screenWidth * .5), 300)
    {
      size
    }
