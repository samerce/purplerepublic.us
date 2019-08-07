import React from 'react'
import {connect} from 'react-redux'
import Loadable from 'react-loadable'
import Spinner from '../../components/spinnie'

import Intro from '../intro'
import Start from '../start'

const QuarkArt = Loadable({
  loader: () => import('../quarkart'),
  loading: Spinner,
})
const BitByBit = Loadable({
  loader: () => import('../bitbybit'),
  loading: Spinner,
})
const Hello = Loadable({
  loader: () => import('../hello'),
  loading: Spinner,
})
const Quote = Loadable({
  loader: () => import('../quote'),
  loading: Spinner,
})
const Video = Loadable({
  loader: () => import('../video'),
  loading: Spinner,
})
const Outro = Loadable({
  loader: () => import('../outro'),
  loading: Spinner,
})

import {Root, RouteRoot} from './styles'
import {cx} from '../../utils/style'

import {clearPreloadRoute} from '../App/actions'
import autobind from 'autobind-decorator'

const router = {
  // '#intro': Intro,
  '#': Start,
  '#hello': Hello,
  '#quote': Quote,
  '#letsfocus': QuarkArt,
  '#letswrite': BitByBit,
  '#letsimprov': Video,
  '#outro': Outro,
}

@connect(d => ({
  preloadRoute: d.get('app').get('preloadRoute'),
  hashHandlers: d.get('app').get('hashHandlers'),
}))
export default class PurpleRouter extends React.PureComponent {

  constructor() {
    super()

    const activeRoute = getCurrentRoute()
    this.state = {
      activeRoute,
      aRoute: activeRoute,
      bRoute: false,
    }
  }

  componentDidMount() {
    const {pathname} = window.location
    if (pathname && pathname.length > 1) {
      window.location = '/#/portal/' + pathname.substr(1)
    }

    setTimeout(() => setInterval(this.runHashHandlers, 250), 3500)

    window.onhashchange = () => {
      const activeRoute = getCurrentRoute()
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

  @autobind
  runHashHandlers() {
    const {lastHash = ''} = this
    const {hash: currentHash} = window.location
    if (lastHash === currentHash) return

    let onEnter, onExit
    this.props.hashHandlers.forEach(handler => {
      const {trigger} = handler
      if (lastHash.match(trigger)) {
        if (currentHash.match(trigger)) {
          handler.onChange()
        } else {
          onExit = handler.onExit
        }
      } else if (currentHash.match(trigger)) {
        onEnter = handler.onEnter
      }
    })

    if (onExit) {
      onExit()
      if (onEnter) {
        setTimeout(onEnter, 250)
      }
    } else if (onEnter) onEnter()
    this.lastHash = currentHash
  }

}

function getCurrentRoute() {
  const hash = window.location.hash
  const route = hash && hash.split('/')[0].replace('!', '')
  return route || Object.keys(router)[0]
}
