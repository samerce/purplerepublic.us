import React from 'react'
import Video from '../Video'

import {
  Root, Blurb, Title, VideoRoot
} from './styled'

export default class HookEmHeader extends React.Component {

  render() {
    if (this.props.headerTitle) {
      return this.renderTitleHeader()
    }
    return this.renderSingularityHeader()
  }

  renderTitleHeader() {
    return (
      <Root>
        <Title>{this.props.headerTitle}</Title>
      </Root>
    )
  }

  renderSingularityHeader() {
    return (
      <Root>
        <VideoRoot>
          <Video
            id={'rmXjuF1GLK0'}
            width={() => Math.min(1200, window.innerWidth - 35)}
          />
        </VideoRoot>

        <Blurb>
          collapse the paradox. let go of binary. live fearlessly.
        </Blurb>
      </Root>
    )
  }

}
