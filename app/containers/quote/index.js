import React from 'react'
import Typist from 'react-typist'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, QuoteRoot, TextRoot, BackgroundRoot
} from './styled'
import {EASE_IN_OUT_SINE} from '../../global/constants'

import {connect} from 'react-redux'
import {requestRoutePreload} from '../App/actions'

@connect(d => ({
  backgroundUrl: d.get('quarkArt').get('motherImageUrl'),
}))
export default class Quote extends React.Component {
  constructor() {
    super()

    this.timeouts = []
    this.state = {
      isReady: false,
    }
  }

  componentWillMount() {
    this.props.dispatch(requestRoutePreload('#letsfocus'))
    this.timeouts.push(setTimeout(() => this.setState({isReady: true})))
    this.timeouts.push(setTimeout(() => this.setState({willExit: true}), 17000))
    this.timeouts.push(setTimeout(() => window.location = '#letsfocus', 17500))
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout)
  }

  render() {
    return (
      <Page className={this.pageCx()}>
        <QuoteRoot>
          <TextRoot>
            <Typist
              avgTypingDelay={80}
              stdTypingDelay={60}
              cursor={{
                show: false,
                blink: true,
                hideWhenDone: true,
                hideWhenDoneDelay: 0,
              }}>
              the only way to make sense out of change is to plunge into it, move with it, and join the dance
            </Typist>
          </TextRoot>
        </QuoteRoot>

        <BackgroundRoot src={this.props.backgroundUrl} />
      </Page>
    )
  }

  pageCx() {
    const {isReady, willExit} = this.state
    return cx({
      'reveal': isReady,
      'exit': willExit,
    })
  }

}
