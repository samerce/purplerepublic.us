import React from 'react'

import {TimerRoot} from './styled'

import moment from 'moment/moment'

export default class Timer extends React.PureComponent

  constructor: (props) ->
    super(props)
    @endTime = moment(props.endTime)
    @state = timeLeft: @getTimeLeft()

  componentDidMount: => setInterval @updateTime, 1000

  render: => <TimerRoot>{@state.timeLeft}</TimerRoot>

  updateTime: => @setState timeLeft: @getTimeLeft()

  getTimeLeft: ->
    standardTime = moment(@endTime - moment()).format 'DD:HH:mm:ss'
    parts = standardTime.split(':')
    hoursLeft = (parts[0] * 24) + +parts[1]
    "#{hoursLeft}:#{parts[2]}:#{parts[3]}"
