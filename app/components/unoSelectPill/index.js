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
      selectedIndex: props.initialSelected,
    }
  }

  render() {
    const {
      options,
    } = this.props
    const {
      selectedIndex,
    } = this.state

    return (
      <Root>
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
