import React from 'react'
import VideoRecorder from './mediaRecorderCore'
import {ReactMic as AudioRecorder} from '../../../components/react-mic'

require('wavesurfer.js')
import Wavesurfer from 'react-wavesurfer'

import autobind from 'autobind-decorator'

import {cx} from '../../../utils/style'
import {
  Root, VideoRoot, MediaRecorderTools, MediaRecorderTool, StartOverTool, EndRecordingTool,
} from './styled'
import {lighten, darken, transparentize} from 'polished'

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
      audioBlob: null,
      shouldAudioPlay: false,
      pos: 0,
    }
  }

  componentDidUpdate(prevProps) {
    const {isActive, type} = this.props
    if (isActive && !prevProps.isActive) {
      if (this.state.mode === Mode.paused) {
        this[type + 'WillAppear']()
      }
    }
  }

  render() {
    const {videoSize, themeColor, type} = this.props
    const {mode, audioBlob, shouldAudioPlay} = this.state

    return (
      <Root>
        <VideoRecorder
          className={cx({
            show: type === 'video',
            recorder: true
          })}
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
          render={this.renderMediaRecorder} />

        <AudioRecorder
          className={cx({
            show: type === 'audio' && mode !== Mode.paused,
            recorder: true,
            audio: true,
          })}
          ref={r => this.audioRecorder = r}
          strokeColor={lighten(.2, themeColor)}
          backgroundColor={transparentize(.9, themeColor)} />

        <div className={cx({
          show: type === 'audio' && mode === Mode.paused,
          wavesurfer: true,
        })}>
          <Wavesurfer
            pos={this.state.pos}
            onPosChange={e => console.log(e) && this.setState({pos: e.originalArgs[0]})}
            onClick={this.onClickWavesurfer}
            onFinish={() => this.setState({pos: 0})}
            options={{
              loopSelection: true, mediaControls: true, height: 390,
            progressColor: lighten(.2, themeColor), waveColor: lighten(.3, themeColor), cursorColor: darken(.1, themeColor)}}
            mediaControls={true}
            audioFile={audioBlob}
            playing={shouldAudioPlay} />
        </div>

        <MediaRecorderTools themeColor={themeColor}>
          <StartOverTool
            className={cx({
              hide: mode !== Mode.paused
            })}
            onClick={this.trashRecording}
            themeColor={themeColor}>
            <i className={`fa fa-trash start-over-icon`} />
          </StartOverTool>
          <MediaRecorderTool
            onClick={this.startOrPauseRecording}
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
          controls={true}
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
  startOrPauseRecording() {
    const {mode} = this.state
    const {type} = this.props

    if (mode === Mode.recording) {
      this.setState({mode: Mode.paused})
      this[type + 'OnPauseRecording']()
    } else {
      this.setState({mode: Mode.recording})
      this[type + 'OnStartRecording']()
    }
  }

  @autobind
  trashRecording() {
    const {type} = this.props
    this.setState({mode: Mode.stopped})
    this[type + 'OnTrashRecording']()
  }

  @autobind
  exit() {
    this.setState({shouldAudioPlay: false})
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

  videoWillAppear() {
    this.player.play()
  }

  videoOnStartRecording() {
    this.videoRecorder.start()
    this.player.pause()
  }

  videoOnPauseRecording() {
    this.videoRecorder.pause()
    this.player.play()
  }

  videoOnTrashRecording() {
    this.videoRecorder.stop()
    this.player.pause()
  }

  audioWillAppear() {
    this.setState({shouldAudioPlay: true})
  }

  audioOnStartRecording() {
    this.audioRecorder.start()
  }

  audioOnPauseRecording() {
    this.setState({
      audioBlob: this.audioRecorder.pause().blob,
      shouldAudioPlay: true,
    })
  }

  audioOnTrashRecording() {
    this.audioRecorder.stop()
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

  @autobind
  onClickWavesurfer() {
    const {mode, shouldAudioPlay} = this.state
    if (mode === Mode.paused) {
      this.setState({shouldAudioPlay: !shouldAudioPlay})
    }
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
