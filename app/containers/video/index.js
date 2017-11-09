import React from 'react'
import YouTubeVideo from 'react-youtube'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot, VideoRoot, Background, ReviewTools, ReviewTool,
  ScriptRoot, ScriptTextInput, ScriptDoneButton,
} from './styled'

const PLAYER_ELEMENT_ID = 'videoPlayer'
const VIDEO_URL =
  'https://www.youtube.com/embed/s2gGuBA_acg?rel=0&amp;showinfo=0'
const VIDEO_ID = 's2gGuBA_acg'
const MODES = [
  'videoWillEnter',
  'videoEnter',
  'videoFocused',
  'videoReview',
  'videoMakeScript',
  'videoMakeVideoResponse',
  'videoMakeAudioResponse',
  'videoExit',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})

@connect(d => ({
  backgroundUrl: d.get('quarkArt').get('motherImageUrl'),
  themeColor: d.get('quarkArt').get('themeColor'),
}))
export default class Video extends React.Component {

  constructor() {
    super()

    this.timers = []
    this.state = {
      mode: MODES.videoWillEnter,
      hasMadeEntrance: false,
    }
  }

  componentDidMount() {
    if (!this.props.isPreloading) this.onEnter()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPreloading && this.state.mode === MODES.videoWillEnter) {
      this.onEnter()
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
    this.player && this.player.stopVideo()
  }

  render() {
    const {mode, hasMadeEntrance} = this.state
    const {backgroundUrl, themeColor} = this.props
    return (
      <Page className={mode}>
        <Background src={backgroundUrl} />
        <HeaderRoot themeColor={themeColor}>
          <Header className='video-header'>
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
            onClick={() => this.setState({mode: MODES.videoMakeVideoResponse})}
            themeColor={themeColor}>
            <div>make video response</div>
          </ReviewTool>
          <ReviewTool
            onClick={() => this.setState({mode: MODES.videoMakeAudioResponse})}
            themeColor={themeColor}>
            <div>make audio response</div>
          </ReviewTool>
          <ReviewTool
            onClick={this.onExit}
            themeColor={themeColor}>
            <div>onward!</div>
          </ReviewTool>
        </ReviewTools>

        <ScriptRoot>
          <ScriptTextInput
            themeColor={themeColor}
            innerRef={r => this.scriptInput = r} />
          <ScriptDoneButton
            onClick={this.onCloseScript}
            themeColor={themeColor}>
            <div>close script</div>
          </ScriptDoneButton>
        </ScriptRoot>
      </Page>
    )
  }

  onEnter() {
    this.timers.push(setTimeout(() => this.setState({mode: MODES.videoEnter})))
    if (this.player) {
      this.timers.push(
        setTimeout(() => this.makeAnEntrance(this.player), 3000)
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
    this.setState({mode: MODES.videoMakeScript})
    this.timers.push(setTimeout(() => this.scriptInput.focus(), 2500))
  }

  @autobind
  onCloseScript() {
    this.setState({mode: MODES.videoReview})
  }

  @autobind
  onVideoMouseEnter() {
    if (this.state.mode === MODES.videoReview) {
      this.setState({mode: MODES.videoFocused})
    }
  }

  @autobind
  onVideoMouseLeave() {
    const {mode, hasMadeEntrance} = this.state
    if (hasMadeEntrance && mode === MODES.videoFocused) {
      this.setState({mode: MODES.videoReview})
    }
  }

  @autobind
  onExit() {
    this.setState({mode: MODES.videoExit})
    this.timers.push(setTimeout(() => window.location = '#politics', 2000))
  }

  makeAnEntrance(player) {
    player.setLoop(true)
    player.playVideo()

    this.setState({
      mode: MODES.videoFocused,
    })
    this.timers.push(
      setTimeout(() => this.setState({
        mode: MODES.videoReview,
        hasMadeEntrance: true,
      }), 15000)
    )
  }

}

function getVideoOptions() {
  return {
    width: getVideoWidth() + 'px',
    height: getVideoHeight() + 'px',
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
