import React from 'react'
import Gallery from 'react-grid-gallery'

import styled, {injectGlobal} from 'styled-components'
import {BubbleButtonImage} from '../bubbleButton/styled'

import autobind from 'autobind-decorator'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '89KE9NknQ8c'
const IMAGE = SRC_URL + `commons/${VIDEO_ID}.jpg`

export default class BubbleGallery {

  constructor(props) {
    Object.keys(props).forEach(k => this[k] = props[k])
  }

  @autobind
  renderButtonContent() {
   return <BubbleButtonImage src={IMAGE} />
 }

  @autobind
  renderDescription() {
    return (
      <div>
        <Gallery
          enableImageSelection={false}
          imageCountSeparator='/'
          showLightboxThumbnails={true}
          backdropClosesModal={false}
          images={this.images} />
      </div>
    )
  }

}

injectGlobal`
  #lightboxBackdrop button span {
      color: white;
  }
`
