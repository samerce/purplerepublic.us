import React from 'react'
import Recorder from './mediaRecorderCore'

import autobind from 'autobind-decorator'

import {cx} from '../../../utils/style'
import {
  Root, VideoRoot, MediaRecorderTools, MediaRecorderTool, StartOverTool, EndRecordingTool,
} from './styled'

const Mode = [
  'stopped',
  'recording',
  'paused',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})

export default class MediaRecorder extends React.Component {

  constructor() {
    super()
    this.state = {
      mode: Mode.stopped,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isActive && !prevProps.isActive) {
      if (this.state.mode === Mode.paused) {
        this.player.play()
      }
    }
  }

  render() {
    const {videoSize, themeColor} = this.props
    const {mode} = this.state

    return (
      <Root>
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

        <MediaRecorderTools themeColor={themeColor}>
          <StartOverTool
            className={cx({
              hide: mode !== Mode.paused
            })}
            onClick={this.startRecordingOver}
            themeColor={themeColor}>
            <i className={`fa fa-trash start-over-icon`} />
          </StartOverTool>
          <MediaRecorderTool
            onClick={this.startOrResumeRecording}
            themeColor={themeColor}>
            <i className={`fa fa-circle record-icon ${mode === Mode.recording && 'hide'}`} />
            <i className={`fa fa-square stop-icon ${mode !== Mode.recording && 'hide'}`} />
          </MediaRecorderTool>
          <EndRecordingTool
            className={cx({
              hide: mode === Mode.recording,
            })}
            onClick={this.exit}
            themeColor={themeColor}>
            <i className={cx({
              fa: true,
              'fa-times': true,
              hide: mode !== Mode.stopped,
            })} />
            <i className={cx({
              fa: true,
              'fa-save': true,
              hide: mode === Mode.stopped,
            })} />
          </EndRecordingTool>
        </MediaRecorderTools>
      </Root>
    )
  }

  @autobind
  renderMediaRecorder({start, stop, pause, resume}) {
    const isPlayingVideo = this.isPlayingVideo()
    const {mode} = this.state
    return (
      <VideoRoot>
        <video
          className={cx({
            hide: mode !== Mode.paused
          })}
          style={getMediaConstraints().video}
          onClick={this.onClickPlayerVideo}
          autoPlay
          loop={true}
          ref={r => this.player = r} />
        <video
          className={cx({
            hide: mode === Mode.paused
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
  startOrResumeRecording() {
    const {mode} = this.state
    if (mode === Mode.recording) {
      this.setState({mode: Mode.paused})
      this.recorder.pause()
      this.player.play()
    } else {
      this.setState({mode: Mode.recording})
      this.recorder.start()
      this.player.pause()
    }
  }

  @autobind
  startRecordingOver() {
    this.setState({mode: Mode.stopped})
    this.recorder.stop()
    this.player.pause()
  }

  @autobind
  exit() {
    this.player.pause()
    this.props.onExit(this.player.src)
  }

  @autobind
  onRecordingStarted(stream) {
    this.stream = stream
    setVideoSource(this.streamer, stream)
  }

  @autobind
  onRecordingPaused(blob) {
    setVideoSource(this.player, blob)
  }

  @autobind
  onRecordingStopped(blob) {
    // save video locally?
  }

  @autobind
  onRecordingPermitted(stream) {
    setVideoSource(this.streamer, stream)
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

  isPlayingVideo() {
    return this.state.mode === Mode.paused
  }

}

function setVideoSource(video, source) {
  video.src = URL.createObjectURL(source)
}

function getMediaConstraints(videoSize) {
  return {
    audio: true,
    video: videoSize || {
      width: 960,
      height: 540,
    },
  }
}
