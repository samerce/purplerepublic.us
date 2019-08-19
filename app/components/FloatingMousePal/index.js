import React from 'react'

import {
  Root,
} from './styled'

import autobind from 'autobind-decorator'

export default class FloatingMousePal extends React.PureComponent {

  constructor() {
    super()
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Root
        innerRef={r => this.root = r}
        className={this.props.className || ''}>
        {this.props.children}
      </Root>
    )
  }

  @autobind
  onMouseMove(ev) {
    let {offsets = {}} = this.props
    offsets = {
      top: -10,
      left: 10,
      ...offsets
    }
    this.root.style.top = ev.clientY + offsets.top + 'px'
    this.root.style.left = ev.clientX + offsets.left + 'px'
  }

}
