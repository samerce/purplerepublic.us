import React from 'react'
import YouTubeVideo from 'react-youtube'
import {BubbleBuilderYouTubeTool} from '../bubbleBuilderTools'
import BubbleWriting from './words'

import autobind from 'autobind-decorator'

import {
  VideoRoot, VideoWrapper,
} from './styled'

const width = Math.min(1200, window.innerWidth * .8)
const VideoConfig = {
  width,
  height: width / (16/9),
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

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }

  render() {
    const {
      nucleus, editing,
    } = this.props
    const {
      detailText, videoId,
    } = nucleus
    return (
      <VideoRoot>
        {(editing || detailText) &&
          <BubbleWriting
            {...this.props}
            className='videoWriting'
            placeholder='you got a description for this video, love?'
          />
        }

        <VideoWrapper width={width}>
          {videoId &&
            <YouTubeVideo
              videoId={videoId}
              onReady={this.onVideoReady}
              opts={VideoConfig} />
          }
        </VideoWrapper>

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
