import React from 'react'

import {throttle} from 'lodash'

function resizable() { return Component => {
  return class extends React.PureComponent {

    componentDidMount() {
      this.onResize = throttle(() => {
        this.component.onResize()
      }, 100)
      window.addEventListener('resize', this.onResize)
      this.component.onResize()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize)
    }

    render() {
      return (
        <Component
          ref={r => this.component = r}
          {...this.props}
        />
      )
    }

  }
}}

export default resizable
