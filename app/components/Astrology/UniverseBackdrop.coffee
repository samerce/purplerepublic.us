import React from 'react'

import psychedelia from './psychedelia'

export default class UniverseBackdrop extends React.PureComponent

  render: -> <div id='universeBackdropRoot' />

  componentDidMount: -> psychedelia()
