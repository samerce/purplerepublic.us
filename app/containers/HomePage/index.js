import React from 'react'
import {connect} from 'react-redux'

import Politics from '../Politics'
import Theatre from '../Theatre'
import Movement from '../Movement'
import Reflection from '../Reflection'
import Happenings from '../Happenings'
import Action from '../Action'
import QuarkArt from '../quarkart'
import BitByBit from '../bitbybit'
import Hello from '../hello'
import Quote from '../quote'
import {Root, RouteRoot} from './styles'

import {clearPreloadRoute} from '../App/actions'

const router = {
  '#happenings': Happenings,
  '#hello': Hello,
  '#quote': Quote,
  '#politics': Politics,
  '#letsfocus': QuarkArt,
  '#letswrite': BitByBit,
  '#movement': Movement,
  '#reflection': Reflection,
  '#action': Action,
}

@connect(d => ({
  preloadRoute: d.get('app').get('preloadRoute'),
}))
export default class HomePage extends React.PureComponent {

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
      const activeRoute = window.location.hash
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
        activeRoute: activeRoute || Object.keys(router)[0],
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('receving ', nextProps)
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
    const RouteComponentA = aRoute && router[aRoute]
    const RouteComponentB = bRoute && router[bRoute]
    console.log(aRoute, ' ', bRoute)

    return (
      <Root>
        {aRoute &&
          <RouteRoot className={this.routeCx(aRoute)}>
            <RouteComponentA />
          </RouteRoot>
        }
        {bRoute &&
          <RouteRoot className={this.routeCx(bRoute)}>
            <RouteComponentB />
          </RouteRoot>
        }
      </Root>
    )
  }

  routeCx(route) {
    if (route === this.state.activeRoute) {
      return 'enter'
    }
    return ''
  }

}
