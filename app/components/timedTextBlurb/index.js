import React from 'react'

import {
  GratitudeWheel, GratitudeWheelRoot, GratitudeText, Timer,
} from './styled'

import autobind from 'autobind-decorator'

export default class TimedTextBlurb extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }

  componentDidMount() {
    this.ticker = setInterval(() => {
      const {onUpdateIndex, items} = this.props
      const newIndex = (this.state.activeIndex + 1) % items.length
      this.setState({activeIndex: newIndex})
      onUpdateIndex(newIndex)
    }, this.props.duration)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    return (
      <GratitudeWheelRoot className={this.props.className}>
        {this.props.items.map(this.renderItem)}
      </GratitudeWheelRoot>
    )
  }

  @autobind
  renderItem(item, index) {
    const {activeIndex} = this.state
    return (
      <GratitudeWheel
        key={index}
        className={activeIndex === index && 'active'}>
        <GratitudeText>
          <div>{item.text}</div>
        </GratitudeText>
        <Timer duration={this.props.duration} />
      </GratitudeWheel>
    )
  }

}

TimedTextBlurb.defaultProps = {
  duration: 5000,
}
