import React from 'react'
import Video from '../../Video'
import {BubbleBuilderYouTubeTool} from '../bubbleBuilderTools'

import autobind from 'autobind-decorator'

import {
  VideoRoot, VideoWrapper, RemoveButton,
} from './styled'

const YouTubeRegex = /^[https*:\/\/]*[www.]*youtube.com\/watch\?v=(.{11})/gm

export default class BubbleVideo extends React.Component {

  static matchingStrategy(contentBlock, callback, contentState) {
    const text = contentBlock.getText()
    let matchedItems, start
    while ((matchedItems = YouTubeRegex.exec(text)) !== null) {
      start = matchedItems.index
      callback(start, start + matchedItems[0].length)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      videoId: YouTubeRegex.exec(props.decoratedText)[1]
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }

  render() {
    const {editing, remove, decoratedText} = this.props
    const {videoId} = this.state
    return (
      <VideoRoot>

        {editing &&
          <RemoveButton onClick={this.remove}>
            <i className='fa fa-close' />
          </RemoveButton>
        }
        <VideoWrapper>
          {videoId &&
            <Video
              id={videoId}
              onReady={this.onVideoReady}
              width={() => Math.min(740, window.innerWidth * .75)}
            />
          }
        </VideoWrapper>

      </VideoRoot>
    )
  }

  @autobind
  remove() {
    const {remove, decoratedText} = this.props
    remove(decoratedText)
  }

  @autobind
  onClose() {
    this.player && this.player.pauseVideo()
  }

  @autobind
  onVideoReady(player) {
    this.player = player
  }

}
