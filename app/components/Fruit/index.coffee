import React from 'react'
import Now from './Now/index.coffee'

import {
  Root,
} from './styled'

import {connect} from 'react-redux'
import {View} from '../../containers/start/reducer.coffee'
import Portals from '../../components/Gaiaverse/config'
import {setFruitScrolled} from '../../containers/start/actions.coffee'
import {throttle} from 'lodash'

# FruitIdToComponent =
#   alyssa: require('./Now/index.coffee').default,

export default connect((d) =>
  portals: d.get('gaiaverse').get('portals'),
  view: d.get('start').get('view'),
  quark: d.get('start').get('quark'),
) class Fruit extends React.Component

  shouldComponentUpdate: (nextProps) =>
    (@props.view is View.quark or nextProps.view is View.quark) and
    @props.view isnt nextProps.view

  componentDidMount: =>
    @onScroll = throttle @watchScrolling, 200
    @scroller = document.getElementById 'laganjaScrollRoot'
    @scroller.addEventListener 'scroll', @onScroll

  watchScrolling: () =>
    if @scroller.scrollTop > 10
      @props.dispatch setFruitScrolled(yes)
    else @props.dispatch setFruitScrolled(no)

  componentDidUpdate: (prevProps) =>
    if prevProps.view isnt View.quark and @props.view is View.quark
      requestAnimationFrame () => @scroller.scrollTop = 0

  render: =>
    {view, quark} = @props
    # Component = FruitIdToComponent.alyssa #[quark]
    <Root className={view} id='laganjaScrollRoot'>
      <Now id='laganjaScrollRoot' />
    </Root>
