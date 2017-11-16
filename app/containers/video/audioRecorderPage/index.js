import React from 'react'
import {ReactMic as AudioRecorder} from '../../../components/react-mic'
import Wavesurfer from 'react-wavesurfer'
import MediaRecorderTools from '../mediaRecorderTools'

import autobind from 'autobind-decorator'

import {cx} from '../../../utils/style'
import {
  Root,
} from './styled'
import {lighten, darken, transparentize} from 'polished'

import Mode from '../recordingMode'

export default class AudioRecorderPage extends React.Component {

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
        willAppear()
      }
    }
  }

  render() {
    const {themeColor, isActive} = this.props
    const {mode, audioBlob, shouldAudioPlay} = this.state

    return (
      <Root themeColor={themeColor}>
        <AudioRecorder
          className={cx({
            recorder: true,
            show: mode !== Mode.paused,
          })}
          ref={r => this.audioRecorder = r}
          strokeColor={lighten(.2, themeColor)}
          backgroundColor={transparentize(.9, themeColor)} />

        <div className={cx({
          show: mode === Mode.paused,
          wavesurfer: true,
        })}>
          <Wavesurfer
            pos={this.state.pos}
            onPosChange={e => this.setState({pos: e.originalArgs[0]})}
            onClick={this.onClickWavesurfer}
            onFinish={() => this.setState({pos: 0})}
            options={{
              loopSelection: true, mediaControls: true, height: 390,
            progressColor: lighten(.2, themeColor), waveColor: lighten(.3, themeColor), cursorColor: darken(.1, themeColor)}}
            mediaControls={true}
            audioFile={audioBlob}
            playing={shouldAudioPlay} />
        </div>

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
  startRecording() {
    this.setState({mode: Mode.recording})
    this.audioRecorder.start()
  }

  @autobind
  pauseRecording() {
    this.setState({
      mode: Mode.paused,
      audioBlob: this.audioRecorder.pause().blob,
      shouldAudioPlay: true,
    })
  }

  @autobind
  trashRecording() {
    this.setState({
      mode: Mode.stopped,
      shouldAudioPlay: false,
    })
    this.audioRecorder.stop()
  }

  @autobind
  exit() {
    this.setState({shouldAudioPlay: false})
    this.props.onExit(this.state.audioBlob)
  }

  @autobind
  onClickWavesurfer() {
    const {mode, shouldAudioPlay} = this.state
    if (mode === Mode.paused) {
      this.setState({shouldAudioPlay: !shouldAudioPlay})
    }
  }

  @autobind
  onRecordingPermitted(stream) {

  }

  willAppear() {
    this.setState({shouldAudioPlay: true})
  }

}
