import React from 'react'
import TimedTextBlurb from '../../timedTextBlurb'

import {
  PatreonRoot as Root, BeggingButton,
} from './styled'

import {setActiveGratitude} from '../redux/actions'
import {openInNewTab} from '../../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

@connect(d => ({}))
export default class PatreonHero extends React.PureComponent {

  render() {
    return (
      <Root leftSide>
        <TimedTextBlurb
          items={this.props.config.gratitude}
          onUpdateIndex={this.onUpdateIndex} />
        <BeggingButton onClick={this.onClickButton}>
          <div>become a patron</div>
        </BeggingButton>
      </Root>
    )
  }

  @autobind
  onUpdateIndex(newIndex) {
    this.props.dispatch(setActiveGratitude(newIndex))
  }

  @autobind
  onClickButton() {
    openInNewTab('https://www.patreon.com/expressyourmess')
  }

}
