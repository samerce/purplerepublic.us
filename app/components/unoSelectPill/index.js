import React from 'react'

import {
  Root, OptionRoot, Indicator, OptionText,
} from './styled'
import {cx} from '../../utils/style'

import autobind from 'autobind-decorator'

export default class UnoSelectPill extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      selectedList: props.selectedList || [props.selectedIndex || 0],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex) {
      this.setState({
        selectedList:
          [nextProps.selectedIndex || this.props.selectedIndex],
      })
    }
  }

  render() {
    const {
      options,
      className,
    } = this.props

    return (
      <Root className={className}>
        {options.map(this.renderOption)}
      </Root>
    )
  }

  @autobind
  renderOption(opt, index) {
    const {selectedList} = this.state
    return (
      <OptionRoot
        key={index}
        breathe={index !== 0 && this.props.multiSelect}
        onClick={this.onClick.bind(this, opt, index)}
        className={cx({unoOptSelected: selectedList.includes(index)})}>
        <Indicator />
        <OptionText>{opt.name}</OptionText>
      </OptionRoot>
    )
  }

  @autobind
  onClick(opt, index) {
    let newSelectedList = [...this.state.selectedList]
    if (newSelectedList.includes(index)) {
      newSelectedList = newSelectedList.filter(i => i !== index)
    } else {
      newSelectedList.push(index)
    }

    if (!this.props.multiSelect) {
      newSelectedList = [index]
    }

    this.setState({
      selectedList: newSelectedList,
    })
    opt.onClick(newSelectedList)
  }

}
