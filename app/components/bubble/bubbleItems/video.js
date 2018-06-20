import React from 'react'
import YouTubeVideo from 'react-youtube'

import autobind from 'autobind-decorator'

import {
  VideoRoot, LinkInput, LinkRoot, ChangeLinkButton,
} from './styled'

import {SRC_URL} from '../../../global/constants'

export default class BubbleVideo extends React.Component {

  constructor(props) {
    super(props)

    this.player = null
    this.videoUrl = null
    this.state = {
      shouldRenderVideo: props.focused && props.videoId,
      videoId: props.videoId,
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    // const {shouldRenderVideo, videoId} = nextState
    // const {focused} = nextProps
    // this.setState({
    //   shouldRenderVideo: (shouldRenderVideo || focused) && videoId,
    // })
  }

  render() {
    const {
      videoId,
      shouldRenderVideo,
    } = this.state
    const {
      focused,
      editing,
    } = this.props

    return (
      <VideoRoot>
        {editing && videoId &&
          <ChangeLinkButton onClick={this.onLinkChange}>
            change link
          </ChangeLinkButton>
        }
        {shouldRenderVideo &&
          <YouTubeVideo
            videoId={videoId}
            onReady={this.onVideoReady}
            opts={getVideoOptions()} />
        }
        {editing && !videoId &&
          <LinkRoot>
            <LinkInput
              onKeyPress={this.onVideoLinkInputKeyPress}
              defaultValue={this.videoUrl}
              placeholder={'youtube link here!'} />
          </LinkRoot>
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

  @autobind
  onLinkSet({target}) {
    this.videoUrl = target.value

    const videoId = target.value.split('/').pop().split('=').pop()
    this.setState({
      videoId,
      shouldRenderVideo: true,
    })
    this.props.onEditingChange({videoId})
  }

  @autobind
  onLinkChange() {
    this.setState({videoId: null})
  }

  @autobind
  onVideoLinkInputKeyPress(e) {
    if (e.key === 'Enter') this.onLinkSet(e)
  }

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

BubbleVideo.makeNucleus = props => ({
  ...props,
  Component: BubbleVideo,
  buttonImageUrl: SRC_URL + `bubbles/${props.videoId}.jpg`,
})
