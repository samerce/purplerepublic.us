import React from 'react'
import Portal from '../Portal/index.coffee'
import Borders from './Borders.coffee'

import {
  Root, Backdrop,
} from './styled'

export default class Gaiaverse extends React.PureComponent

  shouldComponentUpdate: -> false

  render: =>
    <Root>
      <Backdrop />

      <Portal spot='top' />
      <Portal spot='bottomLeft' />
      <Portal spot='bottomRight' />

      <Borders />
    </Root>
