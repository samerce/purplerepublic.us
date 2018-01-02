import React from 'react'

import {Header} from '../../global/styled'
import {cx} from '../../utils/style'
import {
  Page, MultipleChoices, Choice, CropTools, CropTool, CropPrompt,
  DescribeTools, DescribeTool, OutlineDescription, CroppedImage,
  Mask, QuarkArtGallery, GalleryItem, GalleryItemList, GalleryTools,
  GalleryTool, Spinner,
} from './styled'

import {getMotherImageIndex} from '../../utils/quarkart'
import {selectNewQuarkMother, setQuarkMotherImageIndex} from './actions'
import {requestRoutePreload} from '../App/actions'

import {connect} from 'react-redux';
import autobind from 'autobind-decorator'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

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
const CROP_BOX_SIZE_DEFAULT = 200

@connect(d => ({
  motherImageUrl: d.get('quarkArt').get('motherImageUrl'),
  themeColor: d.get('quarkArt').get('themeColor'),
  motherImageIndex: d.get('quarkArt').get('motherImageIndex'),
  multipleChoiceOptions: d.get('quarkArt').get('motherMultipleChoiceOptions'),
}))
export default class QuarkArt extends React.PureComponent {

  constructor() {
    super()

    this.timers = []
    this.state = {
      dragMode: 'move',
      cropBoxVisible: false,
      mode: MODES.multipleChoice,
      cropBox: {},
      croppedImageData: null,
      croppedImageFullData: null,
      descriptionStyle: {},
      croppedImageStyle: {},
      hasCroppedOnce: false,
      isUploadingImage: false,
      hasUploadedImage: false,
      galleryItems: [],
      isReady: false,
      willExit: false,
      isRestarting: false,
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  componentDidMount() {
    this.cropper.img.addEventListener('ready', this.onReady)

    fetch('/quarkArt.list?maxObjects=5', {
      method: 'GET',
    }).then((responseRaw) => {
      if (!responseRaw) return

      responseRaw.json().then(response => {
        const galleryItems = []
        for (let item in response.items) {
          galleryItems.push(item)
        }
        this.setState({galleryItems: response.items})
      })
    }).catch(e => {
      console.warning('quark art list fetch failed', e)
    })

    this.props.dispatch(requestRoutePreload('#letswrite'))
  }

  componentDidUpdate(prevProps) {
    if (!this.state.isRestarting) return

   this.cropper.enable()
   this.cropper.moveTo(0, 0)

   setTimeout(() => {
     this.outlineDescription.value = ''
     this.setState({
       croppedImageData: null,
       croppedImageFullData: null,
       hasUploadedImage: false,
       isRestarting: false,
     })
   }, 1000)
 }

  render() {
    const {
      isReady,
      dragMode,
      cropBoxVisible,
      mode,
      croppedImageData,
      descriptionStyle,
      croppedImageStyle,
      hasCroppedOnce,
      selectedChoice,
      willExit,
    } = this.state
    const {
      motherImageUrl,
      themeColor
    } = this.props
    const shouldShowCropPrompt = (mode === MODES.crop) && !cropBoxVisible
    const shouldShowCroppedImage = mode === MODES.performCrop ||
      mode === MODES.quarkArtGallery
    const shouldShowDescription = mode === MODES.describe ||
      mode === MODES.performCrop || mode === MODES.quarkArtGallery

    const pageCx = cx({
      cropping: dragMode === 'crop',
      ['mode-' + mode]: true,
      'quark-exit': willExit,
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
      <Page
        className={pageCx}
        onClick={this.onClickImage}
        themeColor={themeColor}>
        <Spinner className='big opaque' show={!isReady} themeColor={themeColor} />
        <Header className={initialHeaderCx} themeColor={themeColor}>
          what do you see?
        </Header>
        <Header className={galleryHeaderCx} themeColor={themeColor}>
          quark art gallery
        </Header>
        <Mask className={mode === MODES.quarkArtGallery && 'show'} />

        {this.renderMultipleChoiceTools()}

        <CropPrompt className={shouldShowCropPrompt && 'show'} themeColor={themeColor}>
          <div>
            {!hasCroppedOnce && <span>{selectedChoice}. </span>}
            really, where?
          </div>
        </CropPrompt>

        {this.renderCropTools()}
        {this.renderDescribeTools()}

        <CroppedImage
          themeColor={themeColor}
          className={croppedImageCx}
          src={croppedImageData}
          style={croppedImageStyle} />
        <OutlineDescription
          themeColor={themeColor}
          className={descriptionCx}
          style={descriptionStyle}>
          <textarea
            ref={ref => this.outlineDescription = ref}
            placeholder='describe your discovery'
            onKeyDown={this.onKeyPressDescription}
            maxLength={140} />
        </OutlineDescription>

        {this.renderQuarkArtGallery()}
        {this.renderGalleryTools()}

        <Cropper
          themeColor={themeColor}
          className='quark-img-crop'
          ref={ref => this.cropper = ref}
          guides={false}
          viewMode={3}
          dragMode={dragMode}
          autoCrop={false}
          highlight={false}
          zoomable={false}
          toggleDragModeOnDblclick={false}
          cropstart={this.onCropStart}
          cropmove={this.onCropMove}
          cropend={this.onCropEnd}
          src={this.props.motherImageUrl} />
      </Page>
    )
  }

  renderMultipleChoiceTools() {
    const {mode} = this.state
    return (
      <MultipleChoices
        themeColor={this.props.themeColor}
        className={mode === MODES.multipleChoice && 'show'}>
        {this.props.multipleChoiceOptions.map(this.renderChoice)}
      </MultipleChoices>
    )
  }

  @autobind
  renderChoice(text) {
    return (
      <Choice
        key={text}
        themeColor={this.props.themeColor}
        onClick={this.onClickChoice.bind(this, text)}>
        <div>{text}</div>
      </Choice>
    )
  }

  renderCropTools() {
    const {mode, cropBoxVisible, dragMode} = this.state
    const shouldShowCropTools = (mode === MODES.crop) && cropBoxVisible
    const {themeColor} = this.props

    return (
      <CropTools
        themeColor={themeColor}
        className={shouldShowCropTools && 'show'}>
        <CropTool themeColor={themeColor} onClick={this.onCancelOutline}>
          <div>never mind</div>
        </CropTool>
        <CropTool themeColor={themeColor} onClick={this.onEndCropping}>
          <div>describe what you see</div>
        </CropTool>
      </CropTools>
    )
  }

  renderDescribeTools() {
    const {mode} = this.state
    const {themeColor} = this.props

    return (
      <DescribeTools
        themeColor={themeColor}
        className={mode === MODES.describe && 'show'}>
        <DescribeTool themeColor={themeColor} onClick={this.onOutlineChangeRequest}>
          <div>change outline</div>
        </DescribeTool>
        <DescribeTool themeColor={themeColor} onClick={this.onOutlineFinished}>
          <div>done</div>
        </DescribeTool>
      </DescribeTools>
    )
  }

  renderQuarkArtGallery() {
    const delayInterval = .1
    let delay = 0
    const {themeColor} = this.props

    return (
      <QuarkArtGallery
        themeColor={themeColor}
        className={this.shouldShowGallery() && 'show'}>
        <div className='intro'>
          you just created your first piece of quark art!
          <br />
          see what other quarks people have found:
        </div>
        <GalleryItemList themeColor={themeColor}>
          {this.state.galleryItems.map(item => {
            delay = delay + delayInterval
            return this.renderGalleryItem(item, delay)
          })}
        </GalleryItemList>
      </QuarkArtGallery>
    )
  }

  renderGalleryItem(item, delay) {
    const {croppedImageData, croppedImageStyle} = this.state
    const style = getCroppedImageStyleGallery(item, 200)

    return (
      <GalleryItem
        themeColor={this.props.themeColor}
        key={item.url}
        delay={delay}
        onClick={e => this.onGalleryItemClick(e)}>
        <img src={item.url} style={{
          width: style.width,
          height: style.height,
        }} />
        <div>{item.description}</div>
      </GalleryItem>
    )
  }

  renderGalleryTools() {
    const {isUploadingImage, hasUploadedImage} = this.state
    const {themeColor} = this.props

    return (
      <GalleryTools
        themeColor={themeColor}
        className={this.shouldShowGallery() && 'show'}>
        <GalleryTool
          themeColor={themeColor}
          onClick={this.onEditFinishedOutline}>
          <div>edit your discovery</div>
        </GalleryTool>
        <GalleryTool
          themeColor={themeColor}
          onClick={this.onDownload}>
          <div>download your quark</div>
        </GalleryTool>
        <GalleryTool
          themeColor={themeColor}
          className={hasUploadedImage && 'gone'}
          disabled={isUploadingImage}
          onClick={this.onPublish}>
          {!isUploadingImage && !hasUploadedImage && <div>publish to gallery</div>}
          <Spinner show={isUploadingImage} />
          {hasUploadedImage && <div>published!</div>}
        </GalleryTool>
        <GalleryTool
          themeColor={themeColor}
          onClick={this.onDiscardQuark}>
          <div>find more quark!</div>
        </GalleryTool>
        <GalleryTool
          themeColor={themeColor}
          onClick={this.onMoveOn}>
          <div>move on</div>
        </GalleryTool>
      </GalleryTools>
    )
  }

  shouldShowGallery() {
    return this.state.mode === MODES.quarkArtGallery
  }

  @autobind
  onReady() {
    setTimeout(() => this.setState({isReady: true}), 1000)
    this.cropper.moveTo(0, 0)
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
  onClickImage(e) {
    const {mode, cropBoxVisible} = this.state;
    if (mode === MODES.crop && !cropBoxVisible) {
      const cropBox = {
        top: e.clientY - (CROP_BOX_SIZE_DEFAULT / 2),
        left: e.clientX - (CROP_BOX_SIZE_DEFAULT / 2),
        width: CROP_BOX_SIZE_DEFAULT,
        height: CROP_BOX_SIZE_DEFAULT,
      }
      this.cropper.crop()
      this.cropper.setCropBoxData(cropBox)
      this.onCropMove()
      this.setState({cropBoxVisible: true})
    }
  }

  @autobind
  onCropStart() {
    const cropBox = this.cropper.getCropBoxData()
      if (!cropBox.width) {
        this.setState({cropBoxVisible: true})
      }
  }

  @autobind
  onCropMove() {
    const cropBox = this.cropper.getCropBoxData()
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
    this.cropper.clear()
    this.setState({
      cropBox: {},
      cropBoxVisible: false,
    })
  }

  @autobind
  onToggleDragMode() {
    const {dragMode} = this.state
    const newDragMode = dragMode === 'crop'? 'move' : 'crop'
    this.setState({dragMode: newDragMode})
    this.cropper.setDragMode(newDragMode)
  }

  @autobind
  onEndCropping() {
    this.setState({
      mode: 'describe',
    })
    this.outlineDescription.focus()
    this.cropper.disable()
  }

  @autobind
  onOutlineChangeRequest() {
    this.setState({mode: 'crop', dragMode: 'crop'})
    this.cropper.enable()
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
    const {cropper, outlineDescription} = this

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
      this.cropper.enable()
      this.cropper.clear()
      this.cropper.disable()
      this.setState({
        mode: MODES.quarkArtGallery,
        descriptionStyle: this.getDescriptionStyleGallery(this.state.cropBox),
        croppedImageStyle: getCroppedImageStyleGallery(this.state.cropBox),
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
      const {cropper, outlineDescription} = this
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
    a.download = 'quark art - ' + this.outlineDescription.value.trim() + '.jpg'
    a.click()
  }

  @autobind
  onPublish() {
    const {cropBox, croppedImageFullData} = this.state
    const description = encodeURIComponent(this.outlineDescription.value.trim())
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
    const newImageIndex = getMotherImageIndex()
    const isSameImage = newImageIndex === this.props.motherImageIndex
    this.setState({
      dragMode: isSameImage? 'crop' : 'move',
      mode: isSameImage? MODES.crop : MODES.multipleChoice,
      isReady: isSameImage,
      cropBoxVisible: false,
      hasCroppedOnce: true,
      isRestarting: true,
    })
    this.props.dispatch(setQuarkMotherImageIndex(newImageIndex))
  }

  @autobind
  onMoveOn() {
    this.setState({willExit: true})
    this.timers.push(setTimeout(() => window.location = '#letswrite', 1000))
  }

  onGalleryItemClick({target}) {
    const activeTransform = 'scale(3)'
    if (target.style.transform === activeTransform) {
      target.style.transform = 'none'
    } else target.style.transform = activeTransform
  }

  getDescriptionStyleDefault(cropBoxUnclean) {
    const cropBox = {
      top: cropBoxUnclean.top || 0,
      left: cropBoxUnclean.left || 0,
      width: cropBoxUnclean.width || 0,
      height: cropBoxUnclean.height || 0,
    }
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
    const croppedImageStyle = getCroppedImageStyleGallery(cropBox)
    const width = Math.max(croppedImageStyle.width, MIN_DESC_WIDTH)
    const left = (CROPPED_IMAGE_DISPLAY_WIDTH / 2) - (width / 2)
    return {
      left,
      width,
      top: CROPPED_IMAGE_GALLERY_TOP + croppedImageStyle.height,
      transform: 'none',
    }
  }

}

function getCroppedImageStyleGallery(cropBox, shrinkSize = CROPPED_IMAGE_SIDE_SMALL) {
  const {height: cropHeight, width: cropWidth} = cropBox
  const isHeightBigger = cropHeight > cropWidth
  const width = isHeightBigger?
    arCropSize(cropWidth, cropHeight, shrinkSize) : shrinkSize
  const height = isHeightBigger?
    shrinkSize : arCropSize(cropHeight, cropWidth, shrinkSize)
  const left = (CROPPED_IMAGE_DISPLAY_WIDTH / 2) - (width / 2)

  return {
    top: CROPPED_IMAGE_GALLERY_TOP,
    left,
    width,
    height,
  }
}

// aspect ratio sizing
function arCropSize(sideToShrink, sideToMatch, shrinkSize) {
  return sideToShrink / (sideToMatch / shrinkSize)
}
