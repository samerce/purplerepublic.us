import React from 'react'
import YouTubeVideo from 'react-youtube'
import {BubbleBuilderYouTubeTool} from '../bubbleBuilderTools'

import autobind from 'autobind-decorator'

import {
  VideoRoot,
} from './styled'

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
      shouldRenderVideo: shouldRenderVideo || getShouldRenderVideo(nextProps),
    })
  }

  render() {
    return (
      <VideoRoot>
        {this.state.shouldRenderVideo &&
          <YouTubeVideo
            videoId={this.props.videoId}
            onReady={this.onVideoReady}
            opts={getVideoOptions()} />
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

function getVideoOptions() {
  return {
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
}
