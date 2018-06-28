import React from 'react'
import {findDOMNode} from 'react-dom'

import {
  Root, BubbleIcon,
} from './styled'

const xCenter = window.innerWidth / 2
const yCenter = window.innerHeight / 2

const TypeToIcon = {
  video: 'film',
  writing: 'book',
  shop: 'shopping-bag',
}

export default class BubbleButton extends React.Component {

  componentDidMount() {
    this.rect = findDOMNode(this.ref).getBoundingClientRect()
    this.forceUpdate()
  }

  render() {
    const {onClick, className, children, type, editingButton} = this.props
    return (
      <Root
        ref={r => this.ref = r}
        style={this.getStyle()}
        delay={Math.random() * .5}
        className={className}
        onClick={onClick}>
        {children}
        <BubbleIcon editingButton={editingButton}>
          <i className={'fa fa-' + TypeToIcon[type]} />
        </BubbleIcon>
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
