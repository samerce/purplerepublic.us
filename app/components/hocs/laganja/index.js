import React from 'react'

import autobind from 'autobind-decorator'
import {throttle} from 'lodash'

function laganja() { return Component => {
  return class extends React.PureComponent {

    constructor(props) {
      super(props)
      this.timers = []
      this.scrollListeners = []
    }

    componentWillUnmount() {
      this.stop()
    }

    render() {
      return (
        <Component
          laganja={this}
          {...this.props}
        />
      )
    }

    @autobind
    start(dna) {
      this.stop()
      this.initScrollListener()
      dna(this)
    }

    @autobind
    stop() {
      if (this.scrollNode) {
        this.scrollNode.removeEventListener('scroll', this.onScrollThrottled)
      }
      this.timers.forEach(clearTimeout)
    }

    @autobind
    timer(time, action) {
      const timer = setTimeout(action, time)
      this.timers.push(timer)
      return timer
    }

    @autobind
    timerOff(timer) {
      this.timers = this.timers.filter(t => t !== timer)
      clearTimeout(timer)
    }

    @autobind
    scrollListener(listener) {
      this.scrollListeners.push(listener)
    }

    @autobind
    onScroll() {
      this.scrollListeners.forEach(sl => {
        requestAnimationFrame(() => sl(this.scrollNode.scrollTop))
      })
    }

    initScrollListener() {
      this.scrollNode = document.getElementById('laganjaScrollRoot')
      this.onScrollThrottled = throttle(this.onScroll, 100)
      this.scrollNode.addEventListener('scroll', this.onScrollThrottled)
    }

  }
}}

export default laganja
