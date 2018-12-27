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
      return (
        <Component
          className={`${prefix}-${mode}`}
          show={this.show}
          hide={this.hide}
          {...this.props}
        />
      )
    }

    @autobind
    show() {
      const {willEnterDuration = 0, enterDuration = 500} = this.args
      this.setState({mode: Mode.willEnter})
      if (willEnterDuration) {
        this.timeouts.push(
          setTimeout(() => this.setState({mode: Mode.enter}), willEnterDuration)
        )
      } else {
        this.setState({mode: Mode.enter})
      }
      this.timeouts.push(
        setTimeout(() => this.setState({mode: Mode.show}), willEnterDuration + enterDuration)
      )
    }

    @autobind
    hide() {
      const {willExitDuration = 0, exitDuration = 500} = this.args
      this.setState({mode: Mode.willExit})
      if (willExitDuration) {
        this.timeouts.push(
          setTimeout(() => this.setState({mode: Mode.exit}), willExitDuration)
        )
      } else {
        this.setState({mode: Mode.exit})
      }
      this.timeouts.push(
        setTimeout(() => this.setState({mode: Mode.hide}), willExitDuration + exitDuration)
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
