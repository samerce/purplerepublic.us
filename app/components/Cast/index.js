import React from 'react'

import {
  Root, ContentRoot, QuarkRoot, BubbleImage, QuarkName, QuarkTitle,
} from './styled'
import {
  SectionHeader
} from '../../global/styled'

import {SRC_URL} from '../../global/constants'

export default class Cast extends React.PureComponent {

  render() {
    return (
      <Root>
        <SectionHeader>
          <hr />
          <div>cast</div>
        </SectionHeader>
        <ContentRoot>
          {this.renderQuark('grain is art', 'grain', 'headlight & grappler')}
          {this.renderQuark('me wig tiny', 'ash', 'headlight & wheel-greaser')}
        </ContentRoot>
      </Root>
    )
  }

  renderQuark(image, name, title) {
    return (
      <QuarkRoot>
        <BubbleImage src={SRC_URL + 'commons/' + image + '.jpg'} />
        <QuarkName>{name}</QuarkName>
        <QuarkTitle>{title}</QuarkTitle>
      </QuarkRoot>
    )
  }

}
