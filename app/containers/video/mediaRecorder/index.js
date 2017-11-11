import React from 'react'
import Recorder from './mediaRecorderCore'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {cx} from '../../../utils/style'
import {Header} from '../../../global/styled'
import {
  Root, VideoRoot
} from './styled'

export const RecordingState = [
  'started',
  'resumed',
  'paused',
  'stopped',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})

export default class MediaRecorder extends React.Component {

  componentDidMount() {
    const {recorder} = this
    this.stateToAction = {
      [RecordingState.started]: this.startRecording,
      [RecordingState.paused]: this.pauseRecording,
      [RecordingState.stopped]: this.stopRecording,
    }
  }

  componentDidUpdate() {
    const {stateToAction} = this
    const {recordingState} = this.props
    if (stateToAction && stateToAction[recordingState]) {
      stateToAction[recordingState]()
    }
  }

  render() {
    const {className, videoSize} = this.props
    return (
      <Root className={className}>
        <Recorder
          ref={r => this.recorder = r}
          constraints={getMediaConstraints(videoSize)}
          delayInitialization={false}
          onGranted={this.onRecordingPermitted}
          onDenied={this.onRecordingDenied}
          onStart={this.onRecordingStarted}
          onStop={this.onRecordingStopped}
          onPause={this.onRecordingPaused}
          onResume={this.onRecordingResumed}
          onError={this.onRecordingError}
          render={this.renderMediaRecorder} />
      </Root>
    )
  }

  @autobind
  renderMediaRecorder({start, stop, pause, resume}) {
    const isPlayingVideo = this.isPlayingVideo()
    const {recordingState} = this.props
    return (
      <VideoRoot>
        <video
          className={cx({
            hide: recordingState !== RecordingState.paused
          })}
          style={getMediaConstraints().video}
          onClick={this.onClickPlayerVideo}
          autoPlay
          loop={true}
          ref={r => this.player = r} />
        <video
          className={cx({
            hide: recordingState === RecordingState.paused
          })}
          style={getMediaConstraints().video}
          onClick={this.onClickStreamerVideo}
          autoPlay
          muted={true}
          controls={false}
          ref={r => this.streamer = r} />
      </VideoRoot>
    )
  }

  @autobind
  startRecording() {
    this.recorder.start()
  }

  @autobind
  pauseRecording() {
    this.recorder.pause()
  }

  @autobind
  resumeRecording() {
    this.recorder.resume()
  }

  @autobind
  stopRecording() {
    this.recorder.stop()
  }

  @autobind
  onRecordingStarted(stream) {
    this.stream = stream
    this.setVideoSource(this.streamer, stream)
  }

  @autobind
  onRecordingPaused(blob) {
    this.setVideoSource(this.player, blob)
  }

  @autobind
  onRecordingStopped(blob) {
    // this.setPlayerSource(blob)
    // save video locally?
  }

  @autobind
  onRecordingPermitted(stream) {
    this.setVideoSource(this.streamer, stream)
  }

  @autobind
  onClickPlayerVideo() {
    if (this.player.paused) {
      this.player.play()
    } else this.player.pause()
  }

  @autobind
  onClickStreamerVideo() {
    if (this.streamer.paused) {
      this.streamer.play()
    } else this.streamer.pause()
  }

  setVideoSource(video, source) {
    video.src = URL.createObjectURL(source)
  }

  isPlayingVideo() {
    const {recordingState} = this.props
    return recordingState === RecordingState.paused
  }

}

function getMediaConstraints(videoSize) {
  return {
    audio: true,
    video: videoSize || {
      width: 768,
      height: 432,
    },
  }
}
