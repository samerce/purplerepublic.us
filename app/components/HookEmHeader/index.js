import React from 'react'
import Video from '../Video'

import {
  Root, Blurb, Title, VideoRoot
} from './styled'

import {SCREEN_WIDTH_M} from '../../global/constants'

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
    const videoWidthPadding = (window.innerWidth <= SCREEN_WIDTH_M)? 35 : 120
    return (
      <Root>
        <VideoRoot>
          <Video
            id={'rmXjuF1GLK0'}
            width={() => Math.min(1200, window.innerWidth - videoWidthPadding)}
          />
        </VideoRoot>

        <Blurb>
          <p>we're born to celebrate. we're alive, bishes ! let's contemplate why. let's challenge fear, question reality, & work through being human. conscious and queer and human. we all dream, fear, and poop from the butt. let's get over it. earth is magic. and big enough for everybody.</p>

          <p>this is an open-source stand for something honest. a fluid place of flowing possibility.</p>

          <p>let's face ourselves. embrace our awkward. our bigotry and divine light.</p>

          <p>500,000 elected positions will be filled in 2020. woke and ready? don't walk - run !  support the long shots! we'll help.</p>
        </Blurb>
      </Root>
    )
  }

}
