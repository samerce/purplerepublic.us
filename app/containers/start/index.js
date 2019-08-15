import React from 'react'
import Countdown from '../../components/Countdown'
import AstrologicalToggle from '../../components/AstrologicalToggle'
import Gaiaverse from '../../components/Gaiaverse'
import Intro from '../../components/Intro'

import {
  Root,
} from './styled'

import {canShowEditingTools} from '../../utils/nav'
import sha256 from 'tiny-sha256'

const editPasscode = 'd3ef743cf28c7bf034bb6ca97c19028049c8bf135aa89974d62b62b8aabc072b'

// import why from 'why-did-you-update'
// why(React)

export default class Start extends React.PureComponent {

  componentWillMount() {
    if (process.env.NODE_ENV === 'production' && canShowEditingTools()) {
      const passcode = prompt('passcode, madam?') || ''
      if (!passcode.length || sha256(passcode) !== editPasscode) {
        alert('no entry fo yew.')
        window.location = '#intro'
      }
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Root>
        <Intro />
        <Countdown />
        <Gaiaverse />
        <AstrologicalToggle />
      </Root>
    )
  }

}
