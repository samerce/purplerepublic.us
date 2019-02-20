import React from 'react'
import YouTubeVideo from 'react-youtube'

import autobind from 'autobind-decorator'
import resizable from '../hocs/resizable'

@resizable()
export default class Video extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      videoConfig: getVideoConfig(this.props),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state || nextProps !== this.props
  }

  render() {
    const {id} = this.props
    return (
      <YouTubeVideo
        videoId={id}
        onReady={this.onReady}
        onStateChange={this.onStateChange}
        opts={this.state.videoConfig}
      />
    )
  }

  @autobind
  onReady({target}) {
    const {onReady} = this.props
    onReady && onReady(target)
  }

  @autobind
  onStateChange({data: playerState}) {
    if (playerState === 1) { // "playing"
      this.props.onPlay && this.props.onPlay()
    }
  }

  onResize() {
    this.setState({videoConfig: getVideoConfig(this.props)})
  }

}

function getVideoConfig({width, autoplay}) {
  if (typeof width === 'function') width = width()
  if (window.innerWidth > (1.5 * window.innerHeight)) {
    width = Math.min(width, 1024)
  }
  return {
    height: width / (16/9),
    width,
    origin: window.location.origin,
    playerVars: {
      rel: 0,
      frameborder: 0,
      allowfullscreen: 1,
      controls: 1,
      modestbranding: 1,
      color: 'white',
      autoplay: autoplay? 1 : 0,
    },
  }
}
