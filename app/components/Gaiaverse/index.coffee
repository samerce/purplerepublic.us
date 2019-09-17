import React from 'react'
import Portal, {ScreenWidthForSeduction} from '../Portal/index.coffee'
import Borders from './Borders.coffee'

import {
  Root, Backdrop,
} from './styled'

Spots = ['top', 'bottomLeft', 'bottomRight']

export default class Gaiaverse extends React.PureComponent

  constructor: (props) ->
    super(props)
    @state = {
      seduceSpotIndex: 0,
    }

  componentDidMount: () =>
    if window.innerWidth <= ScreenWidthForSeduction
      @interval(3000, () =>
        @setState seduceSpotIndex: (@state.seduceSpotIndex + 1) % Spots.length
      )

  interval: (time, fn) -> setInterval(fn, time)

  render: =>
    {seduceSpotIndex} = @state
    <Root>
      <Backdrop />

      {Spots.map((spot) =>
        <Portal spot={spot} key={spot} seduceSpot={Spots[seduceSpotIndex]} />
      )}

      <Borders />
    </Root>
