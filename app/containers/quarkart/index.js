import React from 'react';
import {Header} from '../../global/styled'
import {cx} from '../../utils/style'
import {
  Page, MultipleChoices, Choice, CropTools, CropTool, CropPrompt,
  DescribeTools, DescribeTool, OutlineDescription, CroppedImage,
  Mask, QuarkArtGallery, GalleryItem, GalleryItemList, GalleryTools,
  GalleryTool, Spinner,
} from './styled'

import autobind from 'autobind-decorator'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const SLACK_UPLOAD_URL = 'https://slack.com/api/files.upload'
const QUARK_IMAGE = 'https://s3.amazonaws.com/purplerepublic/do+you+see+me.jpg'
const MODES = [
  'multipleChoice',
  'crop',
  'describe',
  'performCrop',
  'quarkArtGallery',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})
const MIN_CROP_SIDE_LENGTH = 10
const MIN_DESC_WIDTH = 300
const CROPPED_IMAGE_DISPLAY_WIDTH = 500
const CROPPED_IMAGE_SIDE_SMALL = 400
const CROPPED_IMAGE_GALLERY_TOP = 150
const CROPPED_IMAGE_GALLERY_LEFT = 50

export default class QuarkArt extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      dragMode: 'crop',
      cropBoxVisible: false,
      mode: MODES.multipleChoice,
      cropBox: {top: 0, left: 0, width: 0, height: 0},
      croppedImageData: null,
      croppedImageFullData: null,
      descriptionStyle: {},
      croppedImageStyle: {},
      hasCroppedOnce: false,
      isUploadingImage: false,
      hasUploadedImage: false,
    }
  }

  render() {
    const {
      dragMode,
      cropBoxVisible,
      mode,
      croppedImageData,
      descriptionStyle,
      croppedImageStyle,
      hasCroppedOnce,
      selectedChoice,
    } = this.state
    const shouldShowCropPrompt = (mode === MODES.crop) && !cropBoxVisible
    const shouldShowCroppedImage = mode === MODES.performCrop ||
      mode === MODES.quarkArtGallery
    const shouldShowDescription = mode === MODES.describe ||
      mode === MODES.performCrop || mode === MODES.quarkArtGallery

    const pageCx = cx({
      cropping: dragMode === 'crop',
      ['mode-' + mode]: true,
    })
    const initialHeaderCx = cx({
      quarkHeader: true,
      show: mode !== MODES.quarkArtGallery,
    })
    const galleryHeaderCx = cx({
      quarkHeader: true,
      show: mode === MODES.quarkArtGallery,
    })
    const croppedImageCx = cx({
      show: shouldShowCroppedImage
    })
    const descriptionCx = cx({
      show: shouldShowDescription,
      gallery: mode === MODES.quarkArtGallery,
    })

    return (
      <Page className={pageCx} onClick={(e) => {
        const cropBoxSize = 200
        if (mode === MODES.crop && !cropBoxVisible) {
          const cropBox = {
            top: e.clientY - (cropBoxSize / 2),
            left: e.clientX - (cropBoxSize / 2),
            width: cropBoxSize,
            height: cropBoxSize,
          }
          this.refs.cropper.crop()
          this.refs.cropper.setCropBoxData(cropBox)
          this.onCropMove()
          this.setState({cropBoxVisible: true})
        }
      }}>
        <Header className={initialHeaderCx}>
          what do you see?
        </Header>
        <Header className={galleryHeaderCx}>
          quark art gallery
        </Header>
        <Mask className={mode === MODES.quarkArtGallery && 'show'} />

        {this.renderMultipleChoiceTools()}

        <CropPrompt className={shouldShowCropPrompt && 'show'}>
          <div>
            {!hasCroppedOnce && <span>{selectedChoice}. </span>}
            really, where?
          </div>
        </CropPrompt>

        {this.renderCropTools()}
        {this.renderDescribeTools()}

        <CroppedImage
          className={croppedImageCx}
          src={croppedImageData}
          style={croppedImageStyle} />
        <OutlineDescription
          className={descriptionCx}
          style={descriptionStyle}>
          <textarea
            ref='outlineDescription'
            placeholder='describe your discovery'
            onKeyDown={this.onKeyPressDescription}
            maxLength={140} />
        </OutlineDescription>

        {this.renderQuarkArtGallery()}
        {this.renderGalleryTools()}

        <Cropper
          className='quark-img-crop'
          ref='cropper'
          guides={false}
          viewMode={3}
          dragMode={dragMode}
          autoCrop={false}
          highlight={false}
          cropstart={this.onCropStart}
          cropmove={this.onCropMove}
          cropend={this.onCropEnd}
          crossOrigin='anonymous'
          src={QUARK_IMAGE} />
      </Page>
    )
  }

  renderMultipleChoiceTools() {
    const {mode} = this.state
    return (
      <MultipleChoices
        className={mode === MODES.multipleChoice && 'show'}>
        {this.renderChoice('water')}
        {this.renderChoice('chaos')}
        {this.renderChoice('a wicked horse')}
        {this.renderChoice('faces')}
        {this.renderChoice('quantum soup')}
      </MultipleChoices>
    )
  }

  renderChoice(text) {
    return (
      <Choice onClick={this.onClickChoice.bind(this, text)}>
        <div>{text}</div>
      </Choice>
    )
  }

  renderCropTools() {
    const {mode, cropBoxVisible, dragMode} = this.state
    const shouldShowCropTools = (mode === MODES.crop) && cropBoxVisible
    return (
      <CropTools className={shouldShowCropTools && 'show'}>
        <CropTool onClick={this.onCancelOutline}>
          <div>never mind</div>
        </CropTool>
        <CropTool onClick={this.onEndCropping}>
          <div>describe what you see</div>
        </CropTool>
      </CropTools>
    )
  }

  renderDescribeTools() {
    const {mode} = this.state
    return (
      <DescribeTools className={mode === MODES.describe && 'show'}>
        <DescribeTool onClick={this.onOutlineChangeRequest}>
          <div>change outline</div>
        </DescribeTool>
        <DescribeTool onClick={this.onOutlineFinished}>
          <div>done</div>
        </DescribeTool>
      </DescribeTools>
    )
  }

  renderQuarkArtGallery() {
    return (
      <QuarkArtGallery className={this.shouldShowGallery() && 'show'}>
        <div className='intro'>
          you just created your first piece of quark art!
          <br />
          see what other quarks people have found:
        </div>
        <GalleryItemList>
          {this.renderGalleryItem(.1)}
          {this.renderGalleryItem(.2)}
          {this.renderGalleryItem(.3)}
          {this.renderGalleryItem(.4)}
          {this.renderGalleryItem(.5)}
        </GalleryItemList>
      </QuarkArtGallery>
    )
  }

  renderGalleryItem(delay) {
    const {croppedImageData, croppedImageStyle} = this.state
    return (
      <GalleryItem
        delay={delay}
        onClick={e => this.onGalleryItemClick(e)}>
        <img src={croppedImageData} style={{
          width: 300,
          height: 400,
        }} />
      </GalleryItem>
    )
  }

  renderGalleryTools() {
    const {isUploadingImage, hasUploadedImage} = this.state
    return (
      <GalleryTools className={this.shouldShowGallery() && 'show'}>
        <GalleryTool
          onClick={this.onEditFinishedOutline}>
          <div>edit your discovery</div>
        </GalleryTool>
        <GalleryTool
          onClick={this.onDownload}>
          <div>download your quark</div>
        </GalleryTool>
        <GalleryTool
          className={hasUploadedImage && 'gone'}
          disabled={isUploadingImage}
          onClick={this.onPublish}>
          {!isUploadingImage && !hasUploadedImage && <div>publish to gallery</div>}
          {hasUploadedImage && <div>published!</div>}
          {isUploadingImage && this.renderSpinner()}
        </GalleryTool>
        <GalleryTool onClick={this.onDiscardQuark}>
          <div>find more quark!</div>
        </GalleryTool>
      </GalleryTools>
    )
  }

  renderSpinner(text) {
    return (
      <Spinner>
        <i className='fa fa-superpowers' />
        {text && <span>&nbsp; {text}</span>}
      </Spinner>
    )
  }

  shouldShowGallery() {
    return this.state.mode === MODES.quarkArtGallery
  }

  @autobind
  onClickChoice(selectedChoice) {
    this.setState({
      selectedChoice,
      dragMode: 'crop',
      mode: 'crop'
    })
  }

  @autobind
  onCropMove() {
    const cropBox = this.refs.cropper.getCropBoxData()
    this.setState({
      cropBox,
      descriptionStyle: this.getDescriptionStyleDefault(cropBox),
      croppedImageStyle: cropBox,
    })
  }

  @autobind
  onCropEnd() {
    const {cropBox} = this.state
    if (!cropBox.width || !cropBox.height ||
      cropBox.width < MIN_CROP_SIDE_LENGTH ||
      cropBox.height < MIN_CROP_SIDE_LENGTH) {
      this.onCancelOutline()
    } else {
      this.setState({
        cropBoxVisible: true,
      })
    }
  }

  @autobind
  onCancelOutline() {
    this.refs.cropper.clear()
    this.setState({cropBoxVisible: false})
  }

  @autobind
  onToggleDragMode() {
    const {dragMode} = this.state
    const newDragMode = dragMode === 'crop'? 'move' : 'crop'
    this.setState({dragMode: newDragMode})
    this.refs.cropper.setDragMode(newDragMode)
  }

  @autobind
  onEndCropping() {
    this.setState({
      mode: 'describe',
    })
    this.refs.outlineDescription.focus()
    this.refs.cropper.disable()
  }

  @autobind
  onOutlineChangeRequest() {
    this.setState({mode: 'crop', dragMode: 'crop'})
    this.refs.cropper.enable()
  }

  @autobind
  onKeyPressDescription(e) {
    if (e.keyCode === 13) { // enter keyCode
      this.onOutlineFinished()
      e.preventDefault()
      e.stopPropagation()
    }
  }

  @autobind
  onOutlineFinished() {
    const {cropper, outlineDescription} = this.refs

    if (!outlineDescription.value.trim()) {
      return outlineDescription.focus()
    }
    outlineDescription.blur()

    const croppedCanvas = cropper.getCroppedCanvas()
    this.setState({
      mode: MODES.performCrop,
      croppedImageData: croppedCanvas.toDataURL('image/jpeg', .5),
      croppedImageFullData: croppedCanvas.toDataURL('image/jpeg', .99),
    })

    setTimeout(() => {
      this.refs.cropper.enable()
      this.refs.cropper.clear()
      this.refs.cropper.disable()
      this.setState({
        mode: MODES.quarkArtGallery,
        descriptionStyle: this.getDescriptionStyleGallery(this.state.cropBox),
        croppedImageStyle: this.getCroppedImageStyleGallery(this.state.cropBox),
      })
    }, 1000)
  }

  @autobind
  onEditFinishedOutline() {
    const {cropBox} = this.state

    this.setState({
      mode: MODES.describe,
      descriptionStyle: this.getDescriptionStyleDefault(cropBox),
      croppedImageStyle: cropBox,
    })

    setTimeout(() => {
      const {cropper, outlineDescription} = this.refs
      outlineDescription.focus()

      cropper.enable()
      cropper.crop()
      cropper.setCropBoxData(cropBox)
      cropper.disable()

      this.setState({hasUploadedImage: false})
    }, 800)
  }

  @autobind
  onDownload() {
    const a = document.createElement('a')
    a.href = this.state.croppedImageFullData
    a.download = 'quark art - ' + this.refs.outlineDescription.value.trim() + '.jpg'
    a.click()
  }

  @autobind
  onPublish() {
    const {cropBox, croppedImageFullData} = this.state
    const description = encodeURIComponent(this.refs.outlineDescription.value.trim())
    const imageData = encodeURIComponent(croppedImageFullData)
    this.setState({
      isUploadingImage: true,
    })

    fetch('/quarkArt.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `description=${description}&imageData=${imageData}&sourceImage=${'submerged explorations'}&cropBox=${JSON.stringify(cropBox)}`,
    }).then(() => {
      setTimeout(() => this.setState({
        isUploadingImage: false,
        hasUploadedImage: true,
      }), 1000)
    })
  }

  @autobind
  onDiscardQuark() {
    this.refs.cropper.enable()
    this.refs.outlineDescription.value = ''
    this.setState({
      dragMode: 'crop',
      mode: MODES.crop,
      cropBoxVisible: false,
      hasCroppedOnce: true,
    })
    setTimeout(() => {
      this.setState({
        croppedImageData: null,
        croppedImageFullData: null,
        hasUploadedImage: false,
      })
    }, 1000)
  }

  onGalleryItemClick({target}) {
    const activeTransform = 'scale(3)'
    if (target.style.transform === activeTransform) {
      target.style.transform = 'none'
    } else target.style.transform = activeTransform
  }

  getDescriptionStyleDefault(cropBox) {
    let top = (cropBox.top || 0) - 110
    if ((cropBox.top + cropBox.height) < window.innerHeight - 220) {
      top = cropBox.top + cropBox.height + 15
    }

    const {width, left} = cropBox
    const newWidth = Math.max(width, MIN_DESC_WIDTH)
    const isOffScreenRight = left > (window.innerWidth - newWidth)
    const isBiggerThanCrop = width < MIN_DESC_WIDTH

    let offset = 0
    if (isOffScreenRight) {
      offset = newWidth - width
    } else if (isBiggerThanCrop) {
      offset = (MIN_DESC_WIDTH / 2) - (width / 2)
    }

    return {
      top,
      left,
      transform: `translate(-${offset}px)`,
      width: newWidth,
    }
  }

  getDescriptionStyleGallery(cropBox) {
    const croppedImageStyle = this.getCroppedImageStyleGallery(cropBox)
    const width = Math.max(croppedImageStyle.width, MIN_DESC_WIDTH)
    const left = (CROPPED_IMAGE_DISPLAY_WIDTH / 2) - (width / 2)
    return {
      left,
      width,
      top: CROPPED_IMAGE_GALLERY_TOP + croppedImageStyle.height,
      transform: 'none',
    }
  }

  getCroppedImageStyleGallery(cropBox) {
    const {height, width} = cropBox
    const isHeightBigger = height > width
    const newWidth = isHeightBigger?
      arCropSize(width, height) : CROPPED_IMAGE_SIDE_SMALL
    const left = (CROPPED_IMAGE_DISPLAY_WIDTH / 2) - (newWidth / 2)


    return {
      top: CROPPED_IMAGE_GALLERY_TOP,
      left,
      width: newWidth,
      height: isHeightBigger? CROPPED_IMAGE_SIDE_SMALL : arCropSize(height, width),
    }
  }

}

// aspect ratio sizing
function arCropSize(sideToShrink, sideToMatch) {
  return sideToShrink / (sideToMatch / CROPPED_IMAGE_SIDE_SMALL)
}
