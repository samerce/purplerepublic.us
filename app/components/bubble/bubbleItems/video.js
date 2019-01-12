import React from 'react'
import Video from '../../Video'
import {BubbleBuilderYouTubeTool} from '../bubbleBuilderTools'
import BubbleWriting from './words'

import autobind from 'autobind-decorator'

import {
  VideoRoot, VideoWrapper,
} from './styled'

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

        <VideoWrapper>
          {videoId &&
            <Video
              id={videoId}
              onReady={this.onVideoReady}
              width={() => Math.min(1200, window.innerWidth * .8)}
            />
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
  onVideoReady(player) {
    this.player = player
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
