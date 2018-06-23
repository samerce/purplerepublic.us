import React from 'react'
import {findDOMNode} from 'react-dom'

import {
  Root,
} from './styled'

const xCenter = window.innerWidth / 2
const yCenter = window.innerHeight / 2

export default class BubbleButton extends React.Component {

  componentDidMount() {
    this.rect = findDOMNode(this.ref).getBoundingClientRect()
    this.forceUpdate()
  }

  render() {
    const {onClick, className, children} = this.props
    return (
      <Root
        ref={r => this.ref = r}
        style={this.getStyle()}
        delay={Math.random() * .5}
        className={className}
        onClick={onClick}>
        {children}
      </Root>
    )
  }

  getStyle() {
    const {rect} = this
    if (this.props.className === 'willEnter' && rect) {
      const xTranslate = xCenter - rect.left - (rect.width / 2)
      const yTranslate = yCenter - rect.top - (rect.height / 2)
      return {
        transform: `
          translate(${xTranslate}px, ${yTranslate}px) scale(0)
        `,
      }
    } else return {}
  }

}
