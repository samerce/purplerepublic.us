import React from 'react'
import Now from './Now/index.coffee'

import {
  Root,
} from './styled'

import {connect} from 'react-redux'
import {Mode as View} from '../Gaiaverse/reducer'

# FruitIdToComponent =
#   alyssa: require('./Now/index.coffee').default,

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
  view: d.get('gaiaverse').get('mode'),
) class Fruit extends React.PureComponent

  shouldComponentUpdate: (nextProps) =>
    @props.view isnt View.inTheDeep and nextProps.view is View.inTheDeep

  render: =>
    portal = @getPortal(@props)
    return null if !portal
    # Component = FruitIdToComponent.alyssa #[portal.id]
    <Now id='laganjaScrollRoot' />

  getPortal: (props) -> props.portals.center || {}
