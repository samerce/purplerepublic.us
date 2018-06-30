import React from 'react'

import {
  Root, OptionRoot, Indicator, OptionText,
} from './styled'
import {cx} from '../../utils/style'

import autobind from 'autobind-decorator'

export default class UnoSelectPill extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.selectedIndex || 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      })
    }
  }

  render() {
    const {
      options,
      className,
    } = this.props
    const {
      selectedIndex,
    } = this.state

    return (
      <Root className={className}>
        {options.map(this.renderOption)}
      </Root>
    )
  }

  @autobind
  renderOption(opt, index) {
    const {selectedIndex} = this.state
    const isSelected = selectedIndex === index
    return (
      <OptionRoot
        key={index}
        onClick={this.onClick.bind(this, opt, index)}
        className={cx({unoOptSelected: isSelected})}>
        <Indicator />
        <OptionText>{opt.name}</OptionText>
      </OptionRoot>
    )
  }

  @autobind
  onClick(opt, index) {
    this.setState({
      selectedIndex: index
    })
    opt.onClick()
  }

}
