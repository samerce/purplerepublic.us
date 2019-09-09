import React from 'react'
import Astrology from '../../components/Astrology/index.coffee'
import Gaiaverse from '../../components/Gaiaverse'
import Intro from '../../components/Intro'
import Fruit from '../../components/Fruit/index.coffee'

import {
  Root,
} from './styled'

import {setStartView} from './actions.coffee'
import {canShowEditingTools} from '../../utils/nav'
import sha256 from 'tiny-sha256'
import {connect} from 'react-redux'
import {addHashHandler} from '../App/actions'
import {View} from './reducer.coffee'

editPasscode = 'd3ef743cf28c7bf034bb6ca97c19028049c8bf135aa89974d62b62b8aabc072b'

import why from 'why-did-you-update'
why React

export default connect((d) ->
  view: d.get('start').get('view'),
  portals: d.get('gaiaverse').get('portals'),
) class Start extends React.PureComponent

  componentWillMount: =>
    @props.dispatch addHashHandler {
      trigger: '#/',
      onEnter: @onHashChange,
      onChange: @onHashChange,
      onExit: ->,
    }

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
      <Fruit />
    </Root>

  onHashChange: =>
    {hash} = window.location
    hashParts = hash.split '/'
    return unless hashParts.length > 1

    if not hashParts[1]
      @props.dispatch setStartView(View.cosmos)
    else
      energy = hashParts[1]
      if hashParts.length is 2
        @props.dispatch setStartView(View.triangle, {energy})
      else
        quark = hashParts[2]
        @props.dispatch setStartView(View.quark, {
          quark: quark,
          energy: energy,
          anchor: @findAnchor(quark),
        })

  findAnchor: (quark) =>
    anchor = ''
    for spot, portal of @props.portals
      anchor = spot if portal.id is quark
    anchor
