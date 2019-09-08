import React from 'react'
import Now from './Now/index.coffee'

import {
  Root,
} from './styled'

import {connect} from 'react-redux'
import {View} from '../../containers/start/reducer.coffee'

# FruitIdToComponent =
#   alyssa: require('./Now/index.coffee').default,

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
  view: d.get('start').get('view'),
  quark: d.get('start').get('quark'),
) class Fruit extends React.PureComponent

  shouldComponentUpdate: (nextProps) =>
    (@props.view is View.quark or nextProps.view is View.quark) and
    @props.view isnt nextProps.view

  render: =>
    portal = @getPortal(@props)
    {view} = @props
    return null if !portal or view isnt View.quark
    # Component = FruitIdToComponent.alyssa #[portal.id]
    <Now id='laganjaScrollRoot' />

  getPortal: => @props.portals?[@props.quark]
