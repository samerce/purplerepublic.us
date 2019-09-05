import React from 'react'

import {TimerRoot} from './styled'

export default class Timer extends React.PureComponent

  constructor: ->
    super()
    @state =
      time: '105:54:27',
      seconds: 27,

  componentDidMount: =>
    setInterval @updateTime, 1000

  render: => <TimerRoot>{@state.time}</TimerRoot>

  updateTime: =>
    {seconds} = @state
    seconds--
    @setState {
      time: '105:54:' + (-1 * (seconds % 27)),
      seconds,
    }
