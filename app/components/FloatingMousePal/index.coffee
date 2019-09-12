import React from 'react'

import {
  Root,
} from './styled'

export default class FloatingMousePal extends React.Component
  @props:
    offsets: {}

  componentDidMount: =>
    window.addEventListener 'mousemove', @onMouseMove

  componentWillUnmount: =>
    window.removeEventListener 'mousemove', @onMouseMove

  shouldComponentUpdate: -> no

  render: =>
    <Root
      ref={(r) => @root = r}
      className={@props.className || ''}>
      {@props.children}
    </Root>

  onMouseMove: (ev) =>
    offsets = {
      top: -10,
      left: 10,
      ...@props.offsets,
    }
    @root.style.top = ev.clientY + offsets.top + 'px'
    @root.style.left = ev.clientX + offsets.left + 'px'
