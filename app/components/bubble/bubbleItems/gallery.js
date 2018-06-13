import React from 'react'
import styled, {injectGlobal} from 'styled-components'
import Gallery from 'react-grid-gallery'

import autobind from 'autobind-decorator'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'

const VIDEO_ID = '89KE9NknQ8c'
const IMAGE = SRC_URL + `commons/${VIDEO_ID}.jpg`
const PIC_SRC = SRC_URL + 'quark-art/mothers/'

class BubbleGallery {

  constructor(props) {
    this.props = {...props}
    Object.keys(props).forEach(k => this[k] = props[k])
  }

  @autobind
  renderButtonContent() {
   return <BubbleButtonImage src={IMAGE} />
 }

  @autobind
  renderDescription() {
    return (
      <div style={{marginBottom: 150}}>
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

module.exports = new BubbleGallery({
  className: 'merman-gallery',
  title: 'merman',
  subtitle: 'little bird finds',
  size: 'medium',
  images: [
    {
      src: PIC_SRC + 'bust-me-open.jpg',
      thumbnail: PIC_SRC + 'bust-me-open.jpg',
      thumbnailWidth: 264,
      thumbnailHeight: 220,
      caption: 'bust me open!',
    },
    {
      src: PIC_SRC + 'carrying-the-weight.jpg',
      thumbnail: PIC_SRC + 'carrying-the-weight.jpg',
      thumbnailWidth: 264,
      thumbnailHeight: 220,
    },
    {
      src: PIC_SRC + 'curious-nebulae.jpg',
      thumbnail: PIC_SRC + 'curious-nebulae.jpg',
      thumbnailWidth: 264,
      thumbnailHeight: 220,
    },
  ],
})

injectGlobal`
  #lightboxBackdrop button span {
      color: white;
  }
`


// props = {
//   className: 'bubbleButton-logo',
//   title: 'what is this anyway?',
//   subtitle: 'you may be asking',
//   images: {},
//   renderContent: () => {},
//   actions: [{
//     text: 'read more',
//   }],
//   size: 'medium',
// }
