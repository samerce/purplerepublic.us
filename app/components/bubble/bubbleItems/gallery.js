import React from 'react'
import Gallery from 'react-grid-gallery'

import styled, {injectGlobal} from 'styled-components'

import {SRC_URL} from '../../../global/constants'

export default class BubbleGallery extends React.Component {

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

BubbleGallery.defaultProps = {
  images: [],
}

BubbleGallery.makeNucleus = props => ({
  ...props,
  Component: BubbleGallery,
  buttonImageUrl: SRC_URL + `bubbles/0iAe2JrH4ck.jpg`,
})
