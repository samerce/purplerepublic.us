import React from 'react'

import  {BordersRoot} from './styled'

import resizable from '../hocs/resizable'
import {connect} from 'react-redux'
import {getTopFudge} from '../Portal/styled'

export default connect((d) -> {
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
}) resizable() class Borders extends React.PureComponent

  onResize: => @forceUpdate()

  render: =>
    borderTop = getTopFudge()
    {energy, view} = @props
    <BordersRoot top={borderTop} className={"#{energy} #{view}"}>
      <div className='border borderLeft' />
      <div className='border borderRight' />
      <div className='border borderBottom' />
    </BordersRoot>
