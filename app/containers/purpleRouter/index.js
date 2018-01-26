import React from 'react'
import {connect} from 'react-redux'

import Politics from '../Politics'
import Theatre from '../Theatre'
import Movement from '../Movement'
import Reflection from '../Reflection'
import Intro from '../intro'
import Start from '../start'
import Action from '../Action'
import QuarkArt from '../quarkart'
import BitByBit from '../bitbybit'
import Hello from '../hello'
import Quote from '../quote'
import Video from '../video'
import Outro from '../outro'
import {Root, RouteRoot} from './styles'

import {clearPreloadRoute} from '../App/actions'

import {cx} from '../../utils/style'

const router = {
  '#intro': Intro,
  '#start': Start,
  '#hello': Hello,
  '#quote': Quote,
  '#politics': Politics,
  '#letsfocus': QuarkArt,
  '#letswrite': BitByBit,
  '#letsimprov': Video,
  '#reflection': Reflection,
  '#action': Action,
  '#outro': Outro,
}

@connect(d => ({
  preloadRoute: d.get('app').get('preloadRoute'),
}))
export default class PurpleRouter extends React.PureComponent {

  constructor() {
    super()

    const activeRoute = window.location.hash || Object.keys(router)[0]
    this.state = {
      activeRoute,
      aRoute: activeRoute,
      bRoute: false,
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      const activeRoute = window.location.hash || Object.keys(router)[0]
      const {preloadRoute} = this.props
      const {aRoute, bRoute} = this.state

      if (preloadRoute && preloadRoute === activeRoute) {
        this.props.dispatch(clearPreloadRoute())

        if (preloadRoute === aRoute) {
          this.setState({bRoute: null})
        } else {
          this.setState({aRoute: null})
        }
      } else {
        this.setState({aRoute: activeRoute})
      }

      this.setState({
        activeRoute,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const {preloadRoute} = nextProps
    if (preloadRoute) {
      if (this.state.aRoute) {
        this.setState({bRoute: preloadRoute})
      } else {
        this.setState({aRoute: preloadRoute})
      }
    }
  }

  render() {
    const {aRoute, bRoute} = this.state
    return (
      <Root>
        {aRoute && this.renderRoute(aRoute)}
        {bRoute && this.renderRoute(bRoute)}
      </Root>
    )
  }

  renderRoute(route) {
    const RouteComponent = router[route]
    return (
      <RouteRoot className={this.routeCx(route)}>
        <RouteComponent isPreloading={route !== this.state.activeRoute} />
      </RouteRoot>
    )
  }

  routeCx(route) {
    return cx({
      enter: route === this.state.activeRoute,
    })
  }

}
