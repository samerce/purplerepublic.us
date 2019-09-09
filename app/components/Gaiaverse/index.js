import React from 'react'
import Portal from '../Portal/index.coffee'
import Borders from './Borders'

import {
  Root, Orb, Backdrop,
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
import {cx} from '../../utils/style'

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
  view: d.get('start').get('view'),
  energy: d.get('start').get('energy'),
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
    const {borderTop, orbSize} = this.state
    const {view, energy} = this.props
    const classes = cx({
      [view]: 1,
      [energy]: 1,
    })
    return (
      <Root className={classes}>
        <Orb size={orbSize} />
        <Backdrop />

        <Portal spot='top' />
        <Portal spot='bottomLeft' />
        <Portal spot='bottomRight' />

        <Borders top={borderTop} className={classes} />
      </Root>
    )
  }

}

function getOrbSize() {
  const {innerWidth: width, innerHeight: height} = window
  if (width > height) return width
  else return height
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
