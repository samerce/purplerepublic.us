import React from 'react'
import {findDOMNode} from 'react-dom'

import {
  Root, Icon, ImageBubbleButton,
} from './styled'

import {SRC_URL} from '../../../global/constants'

const xCenter = window.innerWidth / 2
const yCenter = window.innerHeight / 2
const TypeToIcon = {
  video: 'film',
  writing: 'book',
  gallery: 'camera-retro',
}

const getButtonImageUrl = id => SRC_URL + `bubbles/buttonImages/${id}.jpg`

export default class BubbleButton extends React.Component {

  constructor(props) {
    super(props)
    this.delay = (Math.random() * .5) + .5
    this.state = {
      styles: {},
    }
  }

  componentDidMount() {
    const rect = findDOMNode(this.ref).getBoundingClientRect()
    const xTranslate = xCenter - rect.left - (rect.width / 2)
    const yTranslate = yCenter - rect.top - (rect.height / 2)
    const styles = {
      willEnter: {
        transform: `
          translate(${xTranslate}px, ${yTranslate}px) scale(0)
        `,
      }
    }
    requestAnimationFrame(() => this.setState({styles}))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.className !== this.props.className ||
      this.state.styles !== nextState.styles ||
      !!nextProps.editing || nextProps.unsavedImageUrl !== this.props.unsavedImageUrl || nextProps.type !== this.props.type
  }

  render() {
    const {
      onClick, children, className, id,
      type, unsavedImageUrl, size,
    } = this.props

    return (
      <Root
        ref={r => this.ref = r}
        style={this.state.styles[className] || {}}
        delay={this.delay}
        onClick={onClick}>
        {children ||
          <ImageBubbleButton
            src={unsavedImageUrl || getButtonImageUrl(id)}
            size={size}>
            <Icon className={'fa fa-' + TypeToIcon[type]} />
          </ImageBubbleButton>
        }
      </Root>
    )
  }

}
