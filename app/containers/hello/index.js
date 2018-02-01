import React from 'react'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot, TransitionGif, Background,
} from './styled'

import {SRC_URL} from '../../global/constants'

const BACKGROUND_URL = SRC_URL + 'commons/watts.jpg'
const TRANSITION_URL = SRC_URL + 'commons/paris-walking.gif'

export default class Hello extends React.Component {

  constructor() {
    super()

    this.timers = []
    this.state = {
      isReady: false,
      willExit: false,
    }
  }

  componentWillMount() {
    this.timers.push(setTimeout(() => this.setState({isReady: true})))
    this.timers.push(setTimeout(() => this.setState({willExit: true}), 6000))
    this.timers.push(setTimeout(() => window.location = '#quote', 11000))
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    return (
      <Page className={this.pageCx()}>
        <Background src={BACKGROUND_URL} />
        <HeaderRoot>
          <Header className='hello-header'>
            perpetual empowerment
          </Header>
        </HeaderRoot>
        <TransitionGif src={TRANSITION_URL} />
      </Page>
    )
  }

  pageCx() {
    return cx({
      'hello-enter': this.state.isReady,
      'hello-exit': this.state.willExit,
    })
  }

}
