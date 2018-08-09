import React from 'react'
import EditingGallery from 'react-grid-gallery'
import Gallery from 'react-image-gallery'
import SelectPill from '../../unoSelectPill'
import BubbleWriting from './words'
import {Helmet} from 'react-helmet'

import {
  GalleryRoot, EditPhotosRoot, Button, DeleteButton,
  Hint, CaptionInput,
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

    const images = this.getGalleryImages(props)
    this.state = {
      mode: props.editing? Mode.add : Mode.show,
      images,
    }
  }

  getGalleryImages({images, id: bubbleId}) {
    if (!images || !images.length) return []

    let galleryImages = []

    images.forEach((img, index) => {
      const src = GalleryBaseUrl + bubbleId + `/${img.id}.jpg`
      galleryImages.push({
        src,
        description: img.caption,
        original: src,
        thumbnail: src,
        thumbnailWidth: img.width,
        thumbnailHeight: img.height,
        id: img.id,
        originalClass: this.getImageClass(img.width, img.height),
      })
    })

    return galleryImages
  }

  getImageClass(width, height) {
    if (width > height) {
      return 'preferWidth'
    }
    return 'preferHeight'
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!this.props.editing || !!nextProps.editing ||
      (this.props.focused !== nextProps.focused) ||
      (this.state !== nextState)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.editing && nextProps.editing) {
      this.setState({mode: Mode.add})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editing !== this.props.editing) {
      this.setState({images: this.getGalleryImages(this.props)})
    }
  }

  @autobind
  edit() {
    this.setImages(this.getGalleryImages(this.props))

    if (this.state.images.length) {
      this.captionInput.value = this.state.images[0].description
    }
  }

  render() {
    const {mode, images} = this.state
    const {
      detailText,
      editing,
      focused,
      onEditingChange,
    } = this.props
    const shouldShowEditingGallery =
      editing && (mode === Mode.delete || mode === Mode.move)

    return (
      <FlexColumn className={'galleryBubble-' + mode}>
        {focused && images.length &&
          <Helmet>
            <meta property='og:image' content={images[0].src} />
          </Helmet>
        }

        {(editing || detailText) &&
          <BubbleWriting
            {...this.props}
            placeholder='tell somebody bout yo gallery, hennie.'
          />
        }

        {(focused || editing) && !!images.length && !shouldShowEditingGallery &&
          <Gallery
            ref={r => this.gallery = r}
            renderCustomControls={editing? this.renderCaptionInput : null}
            lazyLoad={!editing}
            showPlayButton={false}
            showIndex={images.length > 1}
            showThumbnails={images.length > 1}
            showNav={images.length > 1}
            onSlide={this.onGallerySlide}
            swipeThreshold={5}
            flickThreshold={.1}
            slideInterval={1000}
            stopPropagation={true}
            items={images} />
        }

        {shouldShowEditingGallery &&
          <EditingGallery
            enableImageSelection={true}
            onSelectImage={this.onSelectImage}
            imageCountSeparator='/'
            showLightboxThumbnails={true}
            backdropClosesModal={false}
            onClickThumbnail={this.onSelectImage}
            images={images} />
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
  renderCaptionInput() {
    return <CaptionInput
      innerRef={r => this.captionInput = r}
      placeholder='give me a caption, hennie!'
      onKeyPress={this.onKeyPressCaptionInput}
      onBlur={this.onBlurCaptionInput}
    />
  }

  @autobind
  onKeyPressCaptionInput({key, target}) {
    if (key === 'Enter') {
      target.blur()
    }
  }

  @autobind
  onBlurCaptionInput({target}) {
    const image = this.getCurrentImage()
    if (!target.value || !target.value.length) {
      delete image.description
    } else {
      image.description = target.value
    }
    this.forceUpdate()
  }

  getCurrentImage() {
    const imageIndex = this.gallery.getCurrentIndex()
    return this.state.images[imageIndex]
  }

  @autobind
  onGallerySlide(imageIndex) {
    if (!this.props.editing) return
    this.captionInput.value = this.state.images[imageIndex].description || ''
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
      this.setImages([
        ...this.state.images,
        {
          id: getFilename(filename),
          src: fileReader.result,
          original: fileReader.result,
          thumbnail: fileReader.result,
          thumbnailWidth: imageElement.naturalWidth,
          thumbnailHeight: imageElement.naturalHeight,
          needsUpload: true,
          originalClass: this.getImageClass(
            imageElement.naturalWidth,
            imageElement.naturalHeight
          ),
        },
      ])
    }
  }

  @autobind
  deletePhotos() {
    if (!this.imagesToDelete.length) return

    const images = this.state.images.filter((o, i) => {
      return !this.imagesToDelete.includes(i)
    })

    images.forEach(o => o.isSelected = false)

    this.imagesToDelete = []
    this.setImages(images)
  }

  @autobind
  onSelectImage(index, image) {
    const {mode, images} = this.state

    images[index].isSelected = !images[index].isSelected

    this.setImages(images)
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

      const images = [...this.state.images]

      const sourceImage = images[this.sourceMoveIndex]
      images.splice(this.sourceMoveIndex, 1)
      images.splice(index, 0, sourceImage)
      images.forEach(o => o.isSelected = false)

      this.sourceMoveIndex = null
      this.setImages(images)
    }
  }

  @autobind
  publish() {
    const imageUploadRequests = this.state.images
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

  setImages(images) {
    const nucleusImages = images.map(img => ({
      id: img.id,
      width: img.thumbnailWidth,
      height: img.thumbnailHeight,
      caption: img.description,
    }))
    this.props.onEditingChange({images: nucleusImages})

    this.setState({
      images: [
        ...images
      ],
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
