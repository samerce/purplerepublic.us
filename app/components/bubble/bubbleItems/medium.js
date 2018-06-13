import React from 'react'

import autobind from 'autobind-decorator'
import {openInNewTab} from '../../../utils/nav'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const MEDIUM_URL_BASE = 'https://medium.com/'

export default class BubbleMedium {

  constructor(props) {
    Object.keys(props).forEach(k => this[k] = props[k])

    const mediumImgId = props.mediumLink.split('/').pop()
    this.buttonImageSrc = SRC_URL + `bubbles/${mediumImgId}.jpg`

    this.actions = [
      {
        text: 'continue reading',
        onClick: openInNewTab.bind(this, props.mediumLink),
      },
    ]
  }

  @autobind
  renderButtonContent() {
   return <BubbleButtonImage src={this.buttonImageSrc} />
 }

  @autobind
  renderDescription() {
    return (
      <div>
        {this.teaserText}...
      </div>
    )
  }

}
