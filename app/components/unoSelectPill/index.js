import React from 'react'

import {
  Root, OptionRoot, Indicator, OptionText, FilterButton
} from './styled'
import {SCREEN_WIDTH_M} from '../../global/constants'

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
      collapsible,
    } = this.props
    const {isOpen} = this.state

    return (
      <Root
        className={className}
        collapsed={collapsible && !isOpen}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        <FilterButton
          className='fa fa-filter'
          hidden={!collapsible || isOpen}
          onClick={this.onFilterButtonClick}
        />
        {options.map(this.renderOption)}
      </Root>
    )
  }

  @autobind
  renderOption(opt, index) {
    const {selectedList, isOpen} = this.state
    const {collapsible, multiSelect} = this.props
    const isSelected = selectedList.includes(index)
    return (
      <OptionRoot
        key={index}
        breathe={index !== 0 && multiSelect}
        onClick={this.onClick.bind(this, opt, index)}
        selected={isSelected}
        hidden={collapsible && !isOpen}>
        <Indicator selected={isSelected} />
        <OptionText>{opt.name}</OptionText>
      </OptionRoot>
    )
  }

  @autobind
  onClick(opt, index) {
    const {onChange, multiSelect} = this.props

    let isSelected = true
    let newSelectedList = [...this.state.selectedList]
    if (newSelectedList.includes(index)) {
      isSelected = false
      newSelectedList = newSelectedList.filter(i => i !== index)
    } else {
      newSelectedList.push(index)
    }

    if (!multiSelect) {
      newSelectedList = [index]
    }

    this.setState({
      selectedList: newSelectedList,
    })

    opt.onClick(index, isSelected)
    onChange && onChange(newSelectedList)

    if (window.innerWidth <= SCREEN_WIDTH_M) {
      clearTimeout(this.collapseTimeout)
      this.setCollapseTimeout(2000)
    }
  }

  @autobind
  onFilterButtonClick() {
    if (window.innerWidth > SCREEN_WIDTH_M) return
    this.setState({isOpen: !this.state.isOpen})
    this.setCollapseTimeout(3000)
  }

  @autobind
  onMouseEnter() {
    if (!this.props.collapsible) return
    clearTimeout(this.collapseTimeout)
    this.setState({isOpen: true})
  }

  @autobind
  onMouseLeave() {
    if (!this.props.collapsible || !this.state.isOpen) return
    this.setCollapseTimeout()
  }

  setCollapseTimeout(timeout = 1000) {
    this.collapseTimeout = setTimeout(() => {
      this.setState({
        isOpen: false,
      })
    }, timeout)
  }

}
