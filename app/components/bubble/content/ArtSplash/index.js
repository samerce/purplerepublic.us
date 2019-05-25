import React from 'react'
import {ClickableImage} from '../../../tinySpells'
import Gallery from '../../widgets/Gallery'

import autobind from 'autobind-decorator'

import {
  Root,
} from './styled'
import {galleryImageUrl} from '../../../../utils/url'

export default class ArtSplash extends React.PureComponent {

  render() {
    const {editing, nucleus} = this.props
    const {id, images = []} = nucleus
    return (
      <Root>
        {images.map(img => (
          <div key={img.id}>
            <ClickableImage
              className='basic'
              src={this.getImageSrc(id, img.id)}
            />
          </div>
        ))}
        {editing &&
          <Gallery
            {...this.props}
            ref={r => this.gallery = this.gallery || r.getWrappedInstance()}
          />
        }
      </Root>
    )
  }

  getImageSrc(bubbleId, imgId) {
    let src
    if (this.props.editing && this.gallery && this.gallery.localImages) {
      const image = this.gallery.localImages.find(img => img.id === imgId)
      if (image) src = image.src
    }
    return src? src : galleryImageUrl(bubbleId, imgId)
  }

}
