import React from 'react'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot,
} from './styled'

export default class Hello extends React.Component {

  constructor() {
    super()

    this.timeouts = []
    this.state = {
      isReady: false,
      willExit: false,
    }
  }

  componentWillMount() {
    this.timeouts.push(setTimeout(() => this.setState({isReady: true})))
    this.timeouts.push(setTimeout(() => this.setState({willExit: true}), 7000))
    this.timeouts.push(setTimeout(() => window.location = '#quote', 9000))
  }

  componentWillUnmount() {
    this.timeouts.forEach(t => clearTimeout(t))
  }

  render() {
    const {
      isReady,
    } = this.state

    return (
      <Page className={this.pageCx()}>
        <HeaderRoot>
          <Header className='hello-header'>
            alan watts & mystical experience
          </Header>
        </HeaderRoot>
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
