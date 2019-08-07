import React from 'react'
import Portal from '../Portal'

import {
  Root, BordersRoot,Orb,
} from './styled'
import {getTopFudge} from '../Portal/styled'

import {addHashHandler} from '../../containers/App/actions'
import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'
import {TransitionDuration} from './constants'
import autobind from 'autobind-decorator'
import {dive, activatePortal} from './actions'
import Portals from './config'
import resizable from '../hocs/resizable'

const Mode = makeEnum([
  'willChangePortal',
  'seduction',
  'willDive',
  'inTheDeep',
  'willSeduce',
])

@connect(d => ({
  view: d.get('gaiaverse').get('mode'),
  portals: d.get('gaiaverse').get('portals'),
}))
@resizable()
export default class Gaiaverse extends React.PureComponent {

  constructor() {
    super()
    this.orbSize = getOrbSize()
    this.state = {
      mode: Mode.seduction,
    }
  }

  componentDidMount() {
    this.props.dispatch(addHashHandler({
      trigger: '#/portal/',
      onEnter: this.openPortal,
      onChange: this.openPortal,
      onExit: () => {},
    }))
    this.props.dispatch(addHashHandler({
      trigger: /#\/portal\/.*\/quark/,
      onEnter: this.diveIntoPortal,
      onChange: () => {},
      onExit: this.openPortal,
    }))

    this.openPortal()
  }

  componentWillReceiveProps(nextProps) {
    const {view: thisView, portals: thisPortals} = this.props
    const {view: nextView, portals: nextPortals} = nextProps
    if (nextView !== thisView || thisPortals !== nextPortals) {
      const transition = Transitions[thisView][nextView]
      this.setState({mode: transition.modes[0]})
      setTimeout(() => {
        requestAnimationFrame(() => this.setState({mode: transition.modes[1]}))
      }, transition.duration)
    }
  }

  onResize() {
    this.forceUpdate()
  }

  render() {
    const {mode} = this.state
    return (
      <Root className={'mode-' + mode}>
        <Orb size={this.orbSize} />

        <Portal spot='top' />
        <Portal spot='center' />
        <Portal spot='bottomLeft' />
        <Portal spot='bottomRight' />

        <BordersRoot top={getTopFudge()}>
          <img src='plain.png' className='border borderLeft' />
          <img src='plain.png' className='border borderRight' />
          <img src='plain.png' className='border borderBottom' />
        </BordersRoot>
      </Root>
    )
  }

  @autobind
  openPortal() {
    const portal = getPortalFromUrl()
    if (portal) {
      this.props.dispatch(activatePortal(portal.id))
    } else {
      window.location = '#/portal/' + Object.keys(Portals)[0]
    }
  }

  @autobind
  diveIntoPortal() {
    this.props.dispatch(dive())
  }

}

function getOrbSize() {
  const {innerWidth: width, innerHeight: height} = window
  if (width > height) return width
  else return height
}

export function getPortalFromUrl() {
  const {hash} = window.location
  const hashParts = hash.split('/')
  if (hashParts.length > 1 && hashParts[1] === 'portal') {
    let portalId = hashParts[2] || ''
    return Portals[portalId]
  }
}

var Transitions = {
  seduction: {
    seduction: {
      modes: ['willChangePortal', 'seduction'],
      duration: 0,
    },
    inTheDeep: {
      modes: ['willDive', 'inTheDeep'],
      duration: TransitionDuration - 800,
    },
  },
  inTheDeep: {
    seduction: {
      modes: ['willSeduce', 'seduction'],
      duration: TransitionDuration - 800,
    },
  },
}
