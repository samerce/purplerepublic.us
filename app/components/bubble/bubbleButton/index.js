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
  gallery: 'camera-retro',
}

export default class BubbleButton extends React.Component {

  constructor(props) {
    super(props)
    this.delay = Math.random() * .5
    this.styles = {}
  }

  componentDidMount() {
    const rect = findDOMNode(this.ref).getBoundingClientRect()
    const xTranslate = xCenter - rect.left - (rect.width / 2)
    const yTranslate = yCenter - rect.top - (rect.height / 2)
    this.styles.willEnter = {
      transform: `
        translate(${xTranslate}px, ${yTranslate}px) scale(0)
      `,
    }
    requestAnimationFrame(() => this.forceUpdate())
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.className !== this.props.className ||
      !!nextProps.editing
  }

  render() {
    const {onClick, className, children, type, editingButton} = this.props
    return (
      <Root
        ref={r => this.ref = r}
        style={this.styles[className] || {}}
        delay={this.delay}
        className={className}
        onClick={onClick}>
        {children}
        <BubbleIcon editingButton={editingButton}>
          <i className={'fa fa-' + TypeToIcon[type]} />
        </BubbleIcon>
      </Root>
    )
  }

}
