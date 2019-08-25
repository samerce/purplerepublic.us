import React from 'react'

import autobind from 'autobind-decorator'
import _ from 'lodash'

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
      this.timers.push(setTimeout(action, time))
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
      this.onScrollThrottled = _.throttle(this.onScroll, 100)
      this.scrollNode.addEventListener('scroll', this.onScrollThrottled)
    }

  }
}}

export default laganja
