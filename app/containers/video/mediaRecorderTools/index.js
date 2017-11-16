import React from 'react'

import autobind from 'autobind-decorator'

import {cx} from '../../../utils/style'
import {
  Root, MediaRecorderTool, StartOverTool, EndRecordingTool,
} from './styled'

import Mode from '../recordingMode'

export default class MediaRecorderTools extends React.Component {

  render() {
    const {
      themeColor,
      className,
      mode,
      onTrash,
      onExit,
    } = this.props

    return (
      <Root themeColor={themeColor} className={className}>
        <StartOverTool
          className={cx({
            hide: mode !== Mode.paused
          })}
          onClick={onTrash}
          themeColor={themeColor}>
          <i className={`fa fa-trash start-over-icon`} />
        </StartOverTool>
        <MediaRecorderTool
          onClick={this.startOrPause}
          themeColor={themeColor}>
          <i className={cx({
            'fa fa-circle record-icon': true,
            hide: mode === Mode.recording,
          })} />
          <i className={cx({
            'fa fa-square stop-icon': true,
            hide: mode !== Mode.recording,
          })} />
        </MediaRecorderTool>
        <EndRecordingTool
          className={cx({
            hide: mode === Mode.recording,
          })}
          onClick={onExit}
          themeColor={themeColor}>
          <i className={cx({
            'fa fa-times': true,
            hide: mode !== Mode.stopped,
          })} />
          <i className={cx({
            'fa fa-save': true,
            hide: mode === Mode.stopped,
          })} />
        </EndRecordingTool>
      </Root>
    )
  }

  @autobind
  startOrPause() {
    const {onStart, onPause, mode} = this.props
    if (mode === Mode.recording) {
      onPause()
    } else {
      onStart()
    }
  }

}
