import React from 'react'
import Now from './Now/index.coffee'

import {
  Root, ScrollTempt
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
  scrolled: d.get('start').get('fruitScrolled'),
) class Fruit extends React.Component

  shouldComponentUpdate: (nextProps) =>
    @isMovingInOurOutOfQuark(nextProps) or @isChangingScroll(nextProps)

  isMovingInOurOutOfQuark: (nextProps) =>
    (@props.view is View.quark or nextProps.view is View.quark) and
    @props.view isnt nextProps.view

  isChangingScroll: (nextProps) => @props.scrolled isnt nextProps.scrolled

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
    {view, quark, scrolled} = @props
    # Component = FruitIdToComponent.alyssa #[quark]
    <Root className={view} id='laganjaScrollRoot'>
      <ScrollTempt
        onClick={@onClickScrollTempt}
        className={"#{view} #{scrolled and 'scrolled'}"}
      >⎏</ScrollTempt>
      <Now />
    </Root>

  onClickScrollTempt: -> document.getElementById'laganjaScrollRoot'.scroll {
    top: window.innerHeight / 2,
    behavior: 'smooth'
  }
