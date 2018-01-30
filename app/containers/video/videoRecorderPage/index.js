import React from 'react'
import VideoRecorder from './mediaRecorderCore'
import MediaRecorderTools from '../mediaRecorderTools'

import autobind from 'autobind-decorator'

import {cx} from '../../../utils/style'
import {
  Root, VideoRoot,
} from './styled'
import {lighten, darken, transparentize} from 'polished'

import Mode from '../recordingMode'

export default class VideoRecorderPage extends React.Component {

  constructor() {
    super()
    this.state = {
      mode: Mode.stopped,
    }
  }

  componentDidUpdate(prevProps) {
    const {isActive} = this.props
    if (isActive && !prevProps.isActive) {
      if (this.state.mode === Mode.paused) {
        this.willAppear()
      }
    }
  }

  render() {
    const {videoSize, themeColor, isActive} = this.props
    const {mode} = this.state

    return (
      <Root themeColor={themeColor}>
        <VideoRecorder
          className='show recorder'
          ref={r => this.videoRecorder = r}
          constraints={getMediaConstraints(videoSize)}
          delayInitialization={false}
          onGranted={this.onRecordingPermitted}
          onDenied={this.onRecordingDenied}
          onStart={this.onRecordingStarted}
          onStop={this.onRecordingStopped}
          onPause={this.onRecordingPaused}
          onResume={this.onRecordingResumed}
          onError={this.onRecordingError}
          render={this.renderVideos} />

        <MediaRecorderTools
          className={cx({
            show: isActive,
          })}
          mode={mode}
          onStart={this.startRecording}
          onPause={this.pauseRecording}
          onTrash={this.trashRecording}
          onExit={this.exit}
          themeColor={themeColor} />
      </Root>
    )
  }

  @autobind
  renderVideos({start, stop, pause, resume}) {
    const {mode} = this.state

    return (
      <VideoRoot>
        <video
          className={cx({
            [mode]: true,
            hide: mode !== Mode.paused
          })}
          style={getMediaConstraints().video}
          onClick={this.onClickPlayerVideo}
          autoPlay
          loop={true}
          controls={true}
          ref={r => this.player = r} />
        <video
          className={cx({
            [mode]: true,
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
  startRecording() {
    this.setState({mode: Mode.recording})
    this.videoRecorder.start()
    this.player.pause()
  }

  @autobind
  pauseRecording() {
    this.setState({mode: Mode.paused})
    this.videoRecorder.pause()
    this.player.play()
  }

  @autobind
  trashRecording() {
    this.setState({mode: Mode.stopped})
    this.videoRecorder.stop()
    this.player.pause()
  }

  @autobind
  exit() {
    this.player.pause()
    this.exitWithVideo()
  }

  @autobind
  onRecordingStarted(stream) {
    this.stream = stream
    setVideoSource(this.streamer, stream)
  }

  @autobind
  onRecordingPaused(blob) {
    this.setState({blob})
    setVideoSource(this.player, blob)
  }

  @autobind
  onRecordingStopped(blob) {
    this.setState({blob})
    this.exitWithVideo()
    // save video locally?
  }

  @autobind
  onRecordingPermitted(stream) {
    setVideoSource(this.streamer, stream)
  }

  exitWithVideo() {
    const {blob} = this.state
    this.props.onExit({
      url: blob && URL.createObjectURL(blob),
      blob: blob,
    })
  }

  willAppear() {
    this.player.play()
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
