import React from 'react'
import {makeEnum} from '../../utils/lang'
import autobind from 'autobind-decorator'

/*
args = {
  prefix: 'name to prefix transition classes; required',
  willEnterDuration: 0,
  enterDuration: 500,
  willExitDuration: 0,
  exitDuration: 500,
}
*/
function withTransitions(args) { return Component => {
  return class extends React.Component {

    constructor(props) {
      super(props)
      this.args = args
      this.timeouts = []
      this.state = {
        mode: Mode.hide,
      }
    }

    componentWillUnmount() {
      this.timeouts.forEach(clearTimeout)
    }

    render() {
      const {mode} = this.state
      const {prefix} = this.args
      const {className} = this.props
      return (
        <Component
          {...this.props}
          show={this.show}
          hide={this.hide}
          className={`${prefix}-${mode} ${className? className : ''}`}
        />
      )
    }

    @autobind
    show(callback) {
      const {willEnterDuration = 1, enterDuration = 500} = this.args
      this.setState({mode: Mode.willEnter})
      this.timeouts.push(
        setTimeout(() => this.setState({mode: Mode.enter}), willEnterDuration)
      )
      this.timeouts.push(
        setTimeout(() => {
          this.setState({mode: Mode.show})
          callback && callback()
        }, willEnterDuration + enterDuration)
      )
    }

    @autobind
    hide(callback) {
      const {willExitDuration = 1, exitDuration = 500} = this.args
      this.setState({mode: Mode.willExit})
      this.timeouts.push(
        setTimeout(() => this.setState({mode: Mode.exit}), willExitDuration)
      )
      this.timeouts.push(
        setTimeout(() => {
          this.setState({mode: Mode.hide})
          callback && callback()
        }, willExitDuration + exitDuration)
      )
    }
  }
}}

var Mode = makeEnum([
  'willEnter',
  'enter',
  'show',
  'willExit',
  'exit',
  'hide',
])

export default withTransitions
