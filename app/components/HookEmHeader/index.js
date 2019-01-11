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
          This is our poem to planet earth. An open-source stand for something honest. Snapshots of life lived. Rewired dna. A little room for possibility. Creative space to get weird & think different. Our Schizopedia—a decategorized flow of ideas from a deep place beyond the binary. This is the present moment. Awareness witnessing now. Pure consciousness woke & ready to rebel.
        </Blurb>
      </Root>
    )
  }

}
