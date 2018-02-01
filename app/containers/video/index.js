import React from 'react'
import YouTubeVideo from 'react-youtube'
import VideoRecorderPage from './videoRecorderPage'
import AudioRecorderPage from './audioRecorderPage'
import ResponseSummary from './responseSummary'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot, VideoRoot, Background, ReviewTools, ReviewTool,
  ScriptRoot, ScriptTextInput, ScriptDoneButton,
} from './styled'

const PLAYER_ELEMENT_ID = 'videoPlayer'
const VIDEO_ID = 's2gGuBA_acg' // youtube video's identifier
const Mode = makeEnum([
  'videoWillEnter',
  'videoEnter',
  'videoFocused',
  'videoReview',
  'videoMakeScript',
  'videoMakeVideoResponse',
  'videoMakeAudioResponse',
  'videoResponseSummary',
  'videoExit',
])

@connect(d => ({
  backgroundUrl: d.get('quarkArt').get('motherImageUrl'),
  themeColor: d.get('quarkArt').get('themeColor'),
}))
export default class Video extends React.Component {

  constructor() {
    super()

    this.noRecording = !window.MediaRecorder
    this.timers = []
    this.state = {
      mode: Mode.videoWillEnter,
      hasMadeEntrance: false,
      recordedVideo: null,
      audioBlob: null,
    }
  }

  componentDidMount() {
    if (!this.props.isPreloading) this.onEnter()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPreloading && this.state.mode === Mode.videoWillEnter) {
      this.onEnter()
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
    this.player && this.player.stopVideo()
  }

  render() {
    const {
      mode,
      hasMadeEntrance,
      recordedVideo,
      scriptText,
      audioBlob,
    } = this.state
    const {backgroundUrl, themeColor} = this.props
    return (
      <Page className={mode}>
        <Background src={backgroundUrl} />
        <HeaderRoot themeColor={themeColor}>
          <Header className='video-header review'>
            who is the observer?
          </Header>
        </HeaderRoot>

        <VideoRoot
          onMouseLeave={this.onVideoMouseLeave}
          onMouseEnter={this.onVideoMouseEnter}>
          <YouTubeVideo
            videoId={VIDEO_ID}
            id={PLAYER_ELEMENT_ID}
            onReady={this.onVideoReady}
            opts={getVideoOptions()} />
        </VideoRoot>

        <ReviewTools themeColor={themeColor}>
          <ReviewTool
            onClick={this.onMakeScript}
            themeColor={themeColor}>
            <div>make script</div>
          </ReviewTool>
          <ReviewTool
            className={this.noRecording && 'bad-apple'}
            onClick={() => this.showMediaRecorder('Video')}
            themeColor={themeColor}>
            <div>make video response</div>
          </ReviewTool>
          <ReviewTool
            className={this.noRecording && 'bad-apple'}
            onClick={() => this.showMediaRecorder('Audio')}
            themeColor={themeColor}>
            <div>make audio response</div>
          </ReviewTool>
          <ReviewTool
            onClick={this.onExitReviewMode}
            themeColor={themeColor}>
            <div>onward!</div>
          </ReviewTool>
        </ReviewTools>

        <ScriptRoot>
          <ScriptTextInput
            themeColor={themeColor}
            onChange={this.storeScriptText}
            innerRef={r => this.scriptInput = r} />
          <ScriptDoneButton
            onClick={this.onCloseScript}
            themeColor={themeColor}>
            <div>close script</div>
          </ScriptDoneButton>
        </ScriptRoot>

        <VideoRecorderPage
          themeColor={themeColor}
          videoSize={{
            width: getVideoWidth(),
            height: getVideoHeight(),
          }}
          isActive={mode === Mode.videoMakeVideoResponse}
          onExit={this.onEndVideoRecording} />

        <AudioRecorderPage
          themeColor={themeColor}
          isActive={mode === Mode.videoMakeAudioResponse}
          onExit={this.onEndAudioRecording} />

        <ResponseSummary
          themeColor={themeColor}
          videoData={recordedVideo}
          audioBlob={audioBlob}
          scriptText={scriptText}
          goBack={this.returnFromSummary} />

      </Page>
    )
  }

  @autobind
  showMediaRecorder(type) {
    if (this.noRecording) {
      return alert('your browser doesn\'t support recording experiences. :(\nuse google chrome instead!')
    }
    this.setState({mode: Mode[`videoMake${type}Response`]})
  }

  onEnter() {
    this.timers.push(setTimeout(() => this.setState({mode: Mode.videoEnter})))
    if (this.player) {
      this.timers.push(
        setTimeout(() => this.makeAnEntrance(this.player), 300)
      )
    }
  }

  @autobind
  onVideoReady({target: player}) {
    if (this.state.hasMadeEntrance || this.props.isPreloading) {
      return this.player = player
    }
    this.makeAnEntrance(player)
  }

  @autobind
  onMakeScript() {
    this.setState({mode: Mode.videoMakeScript})
    this.timers.push(setTimeout(() => this.scriptInput.focus(), 1000))
  }

  @autobind
  onCloseScript() {
    this.setState({mode: Mode.videoReview})
  }

  @autobind
  onEndVideoRecording(videoData) {
    this.setState({
      mode: Mode.videoReview,
      recordedVideo: videoData,
    })
  }

  @autobind
  onEndAudioRecording(audioBlob) {
    this.setState({
      mode: Mode.videoReview,
      audioBlob,
    })
  }

  @autobind
  onVideoMouseEnter() {
    if (this.state.mode === Mode.videoReview) {
      this.setState({mode: Mode.videoFocused})
    }
  }

  @autobind
  onVideoMouseLeave() {
    const {mode, hasMadeEntrance} = this.state
    if (hasMadeEntrance && mode === Mode.videoFocused) {
      this.setState({mode: Mode.videoReview})
    }
  }

  @autobind
  onExitReviewMode() {
    this.setState({mode: Mode.videoResponseSummary})
  }

  @autobind
  returnFromSummary() {
    this.setState({mode: Mode.videoReview})
  }

  @autobind
  onExit() {
    this.setState({mode: Mode.videoExit})
    this.timers.push(setTimeout(() => window.location = '#politics', 2000))
  }

  @autobind
  storeScriptText() {
    this.setState({
      scriptText: this.scriptInput.value
    })
  }

  makeAnEntrance(player) {
    player.setLoop(true)
    // player.playVideo()

    this.setState({
      mode: Mode.videoFocused,
    })
    this.timers.push(
      setTimeout(() => this.setState({
        mode: Mode.videoReview,
        hasMadeEntrance: true,
      }), 150)
    )
  }

}

function getVideoOptions() {
  return {
    width: getVideoWidth() + 'px',
    height: getVideoHeight() + 'px',
    origin: window.location.origin,
    playerVars: {
      rel: 0,
      showinfo: 0,
      frameborder: 0,
      allowfullscreen: 1,
      controls: 1,
      loop: 1,
      modestbranding: 1,
      playlist: [VIDEO_ID],
      color: 'white',
    },
  }
}

function getVideoWidth() {
  return window.innerWidth * .8
}

function getVideoHeight() {
  return getVideoWidth() / (16/9)
}
