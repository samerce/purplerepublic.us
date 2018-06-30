import React from 'react'
import Gallery from 'react-grid-gallery'

import {
  Description, GalleryRoot, EditPhotosRoot, Button, DeleteButton,
  Hint,
} from './styled'
import SelectPill from '../../unoSelectPill'

import {injectGlobal} from 'styled-components'

import {SRC_URL} from '../../../global/constants'
import {makeEnum} from '../../../utils/lang'
import autobind from 'autobind-decorator'

const Mode = makeEnum([
  'show',
  'add',
  'delete',
  'move',
])

export default class BubbleGallery extends React.Component {

  constructor(props) {
    super(props)

    this.fileReader = new FileReader()
    this.fileReader.onloadend = this.onImageUploadComplete

    this.imagesToDelete = []
    this.sourceMoveIndex = null
    this.selectPillOptions = ['add', 'delete', 'move'].map(opt => ({
      name: opt,
      onClick: () => this.setState({mode: Mode[opt]})
    }))

    this.state = {
      mode: props.editing? Mode.add : Mode.show,
      localImages: [],
      isUploadingImage: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.editing && nextProps.editing) {
      this.setState({mode: Mode.add})
    }
  }

  render() {
    const {mode, localImages} = this.state
    const {
      images,
      detailText = 'tell somebody bout your gallery, hennie.',
      editing,
      onEditingChange,
    } = this.props
    const onChange = ({target}) => onEditingChange({detailText: target.innerHTML})

    return (
      <GalleryRoot className={'galleryBubble-' + mode}>
        <Description>
          <span
            contentEditable={editing}
            onBlur={onChange}
            dangerouslySetInnerHTML={{__html: detailText}} />
        </Description>

        <Gallery
          enableImageSelection={mode === Mode.delete || mode === Mode.move}
          onSelectImage={this.onSelectImage}
          imageCountSeparator='/'
          showLightboxThumbnails={true}
          backdropClosesModal={false}
          onClickThumbnail={(mode === Mode.delete || mode === Mode.move)? this.onSelectImage : undefined}
          images={images || localImages} />

          {editing &&
            <EditPhotosRoot>
              <SelectPill
                className='gallerySelectPill'
                options={this.selectPillOptions}
              />

              {this['renderEditTools_' + mode]()}

              <input
                type='file' style={{visibility: 'hidden', position: 'absolute'}}
                onChange={this.onChangeFileInput}
                ref={r => this.fileInput = r}
              />
            </EditPhotosRoot>
          }
      </GalleryRoot>
    )
  }

  renderEditTools_add() {
    return (
      <Button onClick={() => this.fileInput.click()}>
        add photo
      </Button>
    )
  }

  renderEditTools_delete() {
    return (
      <div>
        <DeleteButton
          disabled={!this.imagesToDelete.length}
          onClick={this.deletePhotos}>delete photos</DeleteButton>
      </div>
    )
  }

  renderEditTools_move() {
    return <Hint>click photos to move them</Hint>
  }

  @autobind
  onChangeFileInput(e) {
    this.setState({
      isUploadingImage: true,
    })
    this.fileReader.readAsDataURL(e.target.files[0])
  }

  @autobind
  onImageUploadComplete() {
    const localImages = [
      ...this.state.localImages,
      {
        src: this.fileReader.result,
        thumbnail: this.fileReader.result,
        thumbnailWidth: 320,
        thumbnailHeight: 174,
      },
    ]
    this.setState({
      isUploadingImage: false,
      localImages,
    })
    this.props.onEditingChange({images: localImages})
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
    this.props.onEditingChange({images: localImages})
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

      this.setState({localImages})
      this.props.onEditingChange({images: localImages})
      this.sourceMoveIndex = null
    }
  }

}

injectGlobal`
  #lightboxBackdrop button span {
      color: white;
  }
`
