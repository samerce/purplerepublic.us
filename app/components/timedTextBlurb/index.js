import React from 'react'

import {
  GratitudeWheelRoot, GratitudeText, Timer,
} from './styled'

import autobind from 'autobind-decorator'
import withTransitions from '../hocs/withTransitions'

@withTransitions({prefix: 'timedBlurb', enterDuration: 100, exitDuration: 100})
export default class TimedTextBlurb extends React.PureComponent {

  static defaultProps = {
    duration: 5000,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      timerActive: false,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({activeIndex: 0}))
    this.ticker = setInterval(() => {
      const {onUpdateIndex, items, hide, show} = this.props
      const newIndex = (this.state.activeIndex + 1) % items.length

      hide(() => {
        this.setState({activeIndex: newIndex})
        onUpdateIndex(newIndex)
        show()
      })

    }, this.props.duration)
    this.props.show()
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    clearTimeout(this.timeout)
  }

  render() {
    const {timerActive, activeIndex} = this.state
    const {items, duration, className} = this.props
    const item = activeIndex >= 0 && items[activeIndex]
    return (
      <GratitudeWheelRoot className={className + ' timedTextBlurbRoot'}>
        {item &&
          <GratitudeText>
            <div dangerouslySetInnerHTML={{__html: item.text}} />
          </GratitudeText>
        }

        <Timer
          duration={duration}
        />
      </GratitudeWheelRoot>
    )
  }

}
