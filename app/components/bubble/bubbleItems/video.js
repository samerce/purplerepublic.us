import React from 'react'
import YouTubeVideo from 'react-youtube'
import {BubbleBuilderYouTubeTool} from '../bubbleBuilderTools'
import BubbleWriting from './words'

import autobind from 'autobind-decorator'

import {
  VideoRoot,
} from './styled'

const VideoConfig = {
  width: '100%',
  origin: window.location.origin,
  playerVars: {
    rel: 0,
    showinfo: 0,
    frameborder: 0,
    allowfullscreen: 1,
    controls: 1,
    modestbranding: 1,
    color: 'white',
  },
}

export default class BubbleVideo extends React.Component {

  constructor(props) {
    super(props)

    this.player = null
    this.state = {
      shouldRenderVideo: getShouldRenderVideo(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shouldRenderVideo} = this.state
    this.setState({
      shouldRenderVideo: nextProps.videoId &&
        (shouldRenderVideo || getShouldRenderVideo(nextProps)),
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.videoId !== this.props.videoId ||
      nextState.shouldRenderVideo !== this.state.shouldRenderVideo
  }

  render() {
    return (
      <VideoRoot>
        <BubbleWriting {...this.props} />

        {this.state.shouldRenderVideo &&
          <YouTubeVideo
            videoId={this.props.videoId}
            onReady={this.onVideoReady}
            opts={VideoConfig} />
        }
      </VideoRoot>
    )
  }

  @autobind
  onClose() {
    this.player && this.player.pauseVideo()
  }

  @autobind
  onVideoReady({target}) {
    this.player = target
  }

  static renderCustomBuilderTools(nucleus, onChangeNucleus) {
    return (
      <BubbleBuilderYouTubeTool
        nucleus={nucleus}
        onChangeNucleus={onChangeNucleus}
      />
    )
  }

}

function getShouldRenderVideo({focused, editing, videoId}) {
  return (focused || editing) && videoId
}
