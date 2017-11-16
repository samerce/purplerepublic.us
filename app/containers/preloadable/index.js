import React from 'react'

export default class Preloadable extends React.Component {

  componentWillMount() {
    if (this.props.children.length > 1) {
      throw 'preloadable cannot have more than one child'
    }
  }

  componentDidMount() {
    const {isPreloading, children} = this.props
    if (!isPreloading && children.onEnter) {
      children.onEnter()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPreloading) {
      this.props.children.onEnter()
    }
  }

  render() {
    return this.props.children
  }

}
