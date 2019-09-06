import React from 'react'
import Portal from '../Portal/index.coffee'
import Borders from './Borders'

import {
  Root, BordersRoot,Orb, Backdrop,
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
import {Mode} from './reducer'

const View = makeEnum([
  'willChangePortal',
  'seduction',
  'willDive',
  'inTheDeep',
  'willSeduce',
])

@connect(d => ({
  mode: d.get('gaiaverse').get('mode'),
  portals: d.get('gaiaverse').get('portals'),
}))
@resizable()
export default class Gaiaverse extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      view: View.seduction,
      borderTop: getTopFudge(),
      orbSize: getOrbSize(),
    }
  }

  componentDidMount() {
    this.props.dispatch(addHashHandler({
      trigger: '#/portal/',
      onEnter: this.onPortalChange,
      onChange: this.onPortalChange,
      onExit: () => {},
    }))
    this.openPortal()
  }

  componentWillReceiveProps(nextProps) {
    const {mode: thisMode, portals: thisPortals} = this.props
    const {mode: nextMode, portals: nextPortals} = nextProps
    if (nextMode !== thisMode || thisPortals !== nextPortals) {
      const transition = Transitions[thisMode][nextMode]
      this.setState({view: transition.views[0]})
      setTimeout(() => {
        requestAnimationFrame(() => this.setState({view: transition.views[1]}))
      }, transition.duration)
    }
  }

  onResize() {
    this.setState({
      borderTop: getTopFudge(),
      orbSize: getOrbSize(),
    })
  }

  render() {
    const {view, borderTop, orbSize} = this.state
    return (
      <Root className={'mode-' + view}>
        <Orb size={orbSize} />
        <Backdrop />

        <Portal spot='top' />
        <Portal spot='bottomLeft' />
        <Portal spot='bottomRight' />

        <Borders top={borderTop} />
      </Root>
    )
  }

  @autobind
  onPortalChange() {
    if (window.location.hash.includes('quark')) {
      if (this.props.mode !== Mode.inTheDeep) {
        this.diveIntoPortal()
      }
    } else {
      this.openPortal()
    }
  }

  @autobind
  openPortal() {
    const {portals, dispatch} = this.props
    const portal = getPortalFromUrl()
    if (portal) {
      if (!portals.center || portal !== portals.center.id) {
        dispatch(activatePortal(portal.id))
      }
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
      views: ['willChangePortal', 'seduction'],
      duration: 0,
    },
    inTheDeep: {
      views: ['willDive', 'inTheDeep'],
      duration: 0,
    },
  },
  inTheDeep: {
    seduction: {
      views: ['willSeduce', 'seduction'],
      duration: TransitionDuration - 800,
    },
  },
}
