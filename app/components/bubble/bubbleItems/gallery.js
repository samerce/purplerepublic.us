import React from 'react'
import EditingGallery from 'react-grid-gallery'
import Gallery from 'react-image-gallery'
import SelectPill from '../../unoSelectPill'

import {
  Description, GalleryRoot, EditPhotosRoot, Button, DeleteButton,
  Hint,
} from './styled'
import {FlexColumn, HiddenFileInput} from '../../../global/styled'
import 'react-image-gallery/styles/css/image-gallery.css'

import {SRC_URL} from '../../../global/constants'
import {makeEnum} from '../../../utils/lang'
import {makeQueryString} from '../../../utils/request'
import autobind from 'autobind-decorator'

const GalleryBaseKey = 'bubbles/galleryImages/'
const GalleryBaseUrl = SRC_URL + GalleryBaseKey

const Mode = makeEnum([
  'show',
  'add',
  'delete',
  'move',
])

export default class BubbleGallery extends React.PureComponent {

  constructor(props) {
    super(props)

    this.imagesToDelete = []
    this.sourceMoveIndex = null
    this.selectPillOptions = ['add', 'delete', 'move'].map(opt => ({
      name: opt,
      onClick: () => this.setState({mode: Mode[opt]})
    }))

    const localImages = this.getGalleryImages(props)
    this.state = {
      mode: props.editing? Mode.add : Mode.show,
      thumbnailStyle: this.getThumbnailStyle(localImages),
      localImages,
    }
  }

  getGalleryImages({images, id: bubbleId}) {
    if (!images || !images.length) return []

    let galleryImages = []

    images.forEach((img, index) => {
      const src = GalleryBaseUrl + bubbleId + `/${img.id}.jpg`
      const originalClass = (img.width / img.height) > 1.4?
        'widthPreferred' : 'heightPreferred'
      galleryImages.push({
        src,
        originalClass,
        original: src,
        thumbnail: src,
        thumbnailWidth: img.width,
        thumbnailHeight: img.height,
        id: img.id,
      })
    })

    return galleryImages
  }

  shouldComponentUpdate(nextProps) {
    return !!this.props.editing || !!nextProps.editing ||
      (this.props.focused !== nextProps.focused)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.editing && nextProps.editing) {
      this.setState({mode: Mode.add})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editing !== this.props.editing) {
      this.setState({localImages: this.getGalleryImages(this.props)})
    }
    if (this.state.localImages === prevState.localImages) return

    const images = this.state.localImages.map(img => ({
      id: img.id,
      width: img.thumbnailWidth,
      height: img.thumbnailHeight,
    }))

    this.props.onEditingChange({images})

    this.setState({
      thumbnailStyle: this.getThumbnailStyle(this.state.localImages),
    })
  }

  getThumbnailStyle(images) {
    return (images.length === 1)? {
      width: 695,
      height: (images[0].thumbnailHeight / images[0].thumbnailWidth) * 695,
    } : null
  }

  render() {
    const {mode, localImages, thumbnailStyle} = this.state
    const {
      detailText = 'tell somebody bout your gallery, hennie.',
      editing,
      focused,
      onEditingChange,
    } = this.props
    const onChange = ({target}) => onEditingChange({detailText: target.innerHTML})
    const shouldShowEditingGallery = (mode === Mode.delete || mode === Mode.move)

    return (
      <FlexColumn className={'galleryBubble-' + mode}>
        <Description>
          <span
            contentEditable={editing}
            onBlur={onChange}
            dangerouslySetInnerHTML={{__html: detailText}} />
        </Description>

        {(focused || editing) && !shouldShowEditingGallery &&
          <Gallery
            lazyLoad={!editing}
            showPlayButton={false}
            showIndex={true}
            items={localImages} />
        }

        {(focused || editing) && shouldShowEditingGallery &&
          <EditingGallery
            enableImageSelection={true}
            onSelectImage={this.onSelectImage}
            imageCountSeparator='/'
            showLightboxThumbnails={true}
            backdropClosesModal={false}
            onClickThumbnail={this.onSelectImage}
            images={localImages} />
        }

          {editing &&
            <EditPhotosRoot>
              <SelectPill
                className='gallerySelectPill'
                options={this.selectPillOptions}
              />

              {this['renderEditTools_' + mode]()}

              <HiddenFileInput
                multiple='multiple'
                onChange={this.onChangeFileInput}
                innerRef={r => this.fileInput = r}
              />
            </EditPhotosRoot>
          }
      </FlexColumn>
    )
  }

  renderEditTools_add() {
    return (
      <Button onClick={() => this.fileInput.click()}>
        add photos
      </Button>
    )
  }

  renderEditTools_delete() {
    return (
      <DeleteButton
        disabled={!this.imagesToDelete.length}
        onClick={this.deletePhotos}>
        delete photos
      </DeleteButton>
    )
  }

  renderEditTools_move() {
    return <Hint>click photos to move them</Hint>
  }

  @autobind
  onChangeFileInput({target}) {
    if (!validateFiles(target.files)) {
      return alert('sweetie, only jpegs please')
    }

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i]
      const fileReader = new FileReader()
      fileReader.onloadend = () => this.loadImage(fileReader, file.name)
      fileReader.readAsDataURL(file)
    }
  }

  @autobind
  loadImage(fileReader, filename) {
    const imageElement = new Image()
    imageElement.src = fileReader.result
    imageElement.onload = () => {
      this.setState({
        localImages: [
          ...this.state.localImages,
          {
            id: getFilename(filename),
            src: fileReader.result,
            thumbnail: fileReader.result,
            thumbnailWidth: imageElement.naturalWidth,
            thumbnailHeight: imageElement.naturalHeight,
            needsUpload: true,
          },
        ],
      })
    }
  }

  @autobind
  deletePhotos() {
    if (!this.imagesToDelete.length) return

    const localImages = this.state.localImages.filter((o, i) => {
      return !this.imagesToDelete.includes(i)
    })

    localImages.forEach(o => o.isSelected = false)

    this.imagesToDelete = []
    this.setState({localImages})
  }

  @autobind
  onSelectImage(index, image) {
    const {mode, localImages} = this.state

    localImages[index].isSelected = !localImages[index].isSelected
    this.setState({
      localImages: [
        ...localImages
      ],
    })

    this['onSelectImage_' + mode](index, image)
  }

  @autobind
  onSelectImage_delete(index, image) {
    const alreadyMarkedIndex = this.imagesToDelete.findIndex(i => i === index)
    if (alreadyMarkedIndex >= 0) {
      this.imagesToDelete.splice(alreadyMarkedIndex, 1)
    } else {
      this.imagesToDelete.push(index)
    }
  }

  @autobind
  onSelectImage_move(index, image) {
    if (!this.sourceMoveIndex) {
      this.sourceMoveIndex = index
    } else {
      if (this.sourceMoveIndex === index) {
        return this.sourceMoveIndex = null
      }

      const localImages = [...this.state.localImages]

      const sourceImage = localImages[this.sourceMoveIndex]
      localImages.splice(this.sourceMoveIndex, 1)
      localImages.splice(index, 0, sourceImage)
      localImages.forEach(o => o.isSelected = false)

      this.sourceMoveIndex = null
      this.setState({localImages})
    }
  }

  @autobind
  publish() {
    const imageUploadRequests = this.state.localImages
      .filter(img => img.needsUpload)
      .map(this.uploadImage)
    return Promise.all(imageUploadRequests)
  }

  @autobind
  uploadImage(img) {
    return fetch('/bubbles.upload.galleryImage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: makeQueryString({
        data: img.src,
        id: GalleryBaseKey + `${this.props.id}/${img.id}`
      }),
    })
  }

}

function getFilename(filenameRaw) {
  let filenameParts
  if (filenameRaw.includes('.jpg')) {
    filenameParts = filenameRaw.split('.jpg')
  } else {
    filenameParts = filenameRaw.split('.jpeg')
  }
  return filenameParts[0]
}

function validateFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const valid = ['jpg', 'jpeg'].some(
      format => files[i].name.includes(format)
    )
    if (!valid) return false
  }
  return true
}
