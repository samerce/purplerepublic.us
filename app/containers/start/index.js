import React from 'react'
import Backdrop from './backdrop'
import LogoBubble from '../../components/logoBubble'
import GetSocialWithUs from '../../components/getSocialWithUs'
import Bubbleverse from '../../components/bubbleverse'

import {
  Root,
} from './styled'

import {canShowEditingTools} from '../../utils/nav'
import sha256 from 'tiny-sha256'

const editPasscode = 'd3ef743cf28c7bf034bb6ca97c19028049c8bf135aa89974d62b62b8aabc072b'

// import why from 'why-did-you-update'
// if (process.env.NODE_ENV !== 'production') {
//   why(React)
// }

export default class Start extends React.Component {

  componentWillMount() {
    if (canShowEditingTools()) {
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
        <Backdrop />
        <LogoBubble />
        <Bubbleverse />
        <GetSocialWithUs />
      </Root>
    )
  }

}
