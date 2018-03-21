import React from 'react'

import {cx} from '../../../utils/style'
import {
  Root, ContentRoot,
} from './styled'

export default class BubbleButton extends React.Component {

  render() {
    const {onClick, className} = this.props
    return (
      <Root
        delay={Math.random() * .5}
        className={className}
        onClick={onClick}>
        {this.props.children}
      </Root>
    )
  }

}
