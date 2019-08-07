import React from 'react'
import Portal from '../Portal'

import {
  Root, BordersRoot,Orb,
} from './styled'

import {addHashHandler} from '../../containers/App/actions'
import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'
import {DiveDuration} from './constants'
import autobind from 'autobind-decorator'
import {dive, activatePortal} from './actions'
import portals from './config'

const Mode = makeEnum([
  'seduction',
  'willDive',
  'inTheDeep',
  'willSeduce',
])

@connect(d => ({
  view: d.get('gaiaverse').get('mode'),
}))
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
      onExit: this.hidePortal,
    }))
    this.props.dispatch(addHashHandler({
      trigger: /#\/portal\/.*\/egg/,
      onEnter: this.enterPortal,
      onChange: () => {},
      onExit: this.openPortal,
    }))
    window.location = '#/portal/jellyfish'
  }

  componentWillReceiveProps(nextProps) {
    const {view: thisView} = this.props
    const {view: nextView} = nextProps
    if (nextView !== thisView) {
      const transition = Transitions[thisView][nextView]
      this.setState({mode: transition[0]})
      setTimeout(() => {
        requestAnimationFrame(() => this.setState({mode: transition[1]}))
      }, DiveDuration - 500)
    }
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

        <BordersRoot>
          <img src='plain.png' className='border borderLeft' />
          <img src='plain.png' className='border borderRight' />
          <img src='plain.png' className='border borderBottom' />
        </BordersRoot>
      </Root>
    )
  }

  @autobind
  openPortal() {
    const portal = getPortalFromUrl(this.state.portals)
    if (portal) {
      this.props.dispatch(activatePortal(portal.id))
    } else {
      window.location = '#/portal/jellyfish' // TODO calculate portal id
    }
  }

  @autobind
  hidePortal() {

  }

  @autobind
  enterPortal() {
    this.props.dispatch(dive())
  }

}

function getOrbSize() {
  const {innerWidth: width, innerHeight: height} = window
  if (width > height) return width
  else return height
}

var Transitions = {
  seduction: {
    seduction: ['willSeduce', 'seduction'],
    inTheDeep: ['willDive', 'inTheDeep'],
  },
  inTheDeep: {
    seduction: ['willSeduce', 'seduction'],
  }
}

export function getPortalFromUrl() {
  const {hash} = window.location
  const hashParts = hash.split('/')
  if (hashParts.length > 1 && hashParts[1] === 'portal') {
    let portalId = hashParts[2]
    return portals[portalId]
  }
}
