import React from 'react'

import {
  Root,
} from './styled'

export default class BubbleButton extends React.Component {

  render() {
    const {onClick, className, children} = this.props
    return (
      <Root
        delay={Math.random() * .5}
        className={className}
        onClick={onClick}>
        {children}
      </Root>
    )
  }

}
