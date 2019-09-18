import React from 'react'

import  {BordersRoot} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import {getTopFudge} from '../Portal/styled'

export default connect((d) -> {
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
}) resizable() class Borders extends React.Component

  onResize: => @forceUpdate()

  render: =>
    {energy, view} = @props
    <BordersRoot
      top={getTopFudge()}
      className={"#{energy} #{view}"}
      screenHeight={window.innerHeight}
      screenWidth={window.innerWidth}>
      <div className='border borderLeft' />
      <div className='border borderRight' />
      <div className='border borderBottom' />
    </BordersRoot>
