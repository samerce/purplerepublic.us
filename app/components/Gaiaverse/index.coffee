import React from 'react'
import Portal from '../Portal/index.coffee'
import Borders from './Borders.coffee'

import {
  Root, Backdrop,
} from './styled'

export default class Gaiaverse extends React.Component

  shouldComponentUpdate: -> no

  render: =>
    <Root>
      <Backdrop />

      <Portal spot='top' key='top' />
      <Portal spot='bottomLeft' key='bottomLeft' />
      <Portal spot='bottomRight' key='bottomRight' />

      <Borders />
    </Root>
