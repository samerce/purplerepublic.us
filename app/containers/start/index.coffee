import React from 'react'
import Astrology from '../../components/Astrology/index.coffee'
import Gaiaverse from '../../components/Gaiaverse'
import Intro from '../../components/Intro'

import {
  Root,
} from './styled'

import {canShowEditingTools} from '../../utils/nav'
import sha256 from 'tiny-sha256'

editPasscode = 'd3ef743cf28c7bf034bb6ca97c19028049c8bf135aa89974d62b62b8aabc072b'

import why from 'why-did-you-update'
why React

export default class Start extends React.PureComponent

  componentWillMount: =>
    if process.env.NODE_ENV is 'production' and canShowEditingTools()
      passcode = prompt('passcode, madam?') or ''
      if !passcode.length or sha256(passcode) isnt editPasscode
        alert('no entry fo yew.')
        window.location.href = window.location.href.replace('edit.', '')

  shouldComponentUpdate: -> false

  render: ->
    <Root>
      <Intro />
      <Gaiaverse />
      <Astrology />
    </Root>
