import React from 'react'
import Gallery from 'react-grid-gallery'

import {injectGlobal} from 'styled-components'

import {SRC_URL} from '../../../global/constants'

export default class BubbleGallery extends React.Component {

  static defaultProps = {
    images: [],
  }

  static getButtonImageUrl() {
    return SRC_URL + `bubbles/0iAe2JrH4ck.jpg`
  }
  static getActions() { return [] }

  render() {
    const {images} = this.props
    return (
      <div>
        <Gallery
          enableImageSelection={false}
          imageCountSeparator='/'
          showLightboxThumbnails={true}
          backdropClosesModal={false}
          images={images} />
      </div>
    )
  }

}

injectGlobal`
  #lightboxBackdrop button span {
      color: white;
  }
`
