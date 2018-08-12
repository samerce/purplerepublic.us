import React from 'react'
import Spinnie from '../../spinnie'
import UnoSelectPill from '../../unoSelectPill'
import {
  BubbleBuilderNameTool,
  BubbleBuilderButtonTool,
  BubbleBuilderJourneyTool,
} from '../bubbleBuilderTools'

import BubbleDetails from '../bubbleDetails'
import {Description} from '../bubbleItems/styled'
import {BubbleType, BubbleComponents} from '../config'

import {cx} from '../../../utils/style'
import {
  Root, BubbleButtonRoot, BubbleBuilderToolsRoot, BubbleButtonContent,
  BubbleButtonSizeSlider,
} from './styled'
import {
  ToolBar, ToolBarItem, MaskAbsoluteFillParent,
} from '../../../global/styled'

import {makeEnum} from '../../../utils/lang'
import autobind from 'autobind-decorator'

import {SRC_URL} from '../../../global/constants'

const Mode = makeEnum([
  'willEnter',
  'enter',
  'defocused',
  'willFocus',
  'focused',
  'editing',
  'willDefocus',
  'expanded',
])

const LOCAL_NUCLEUS_KEY = 'purple.republic.editingBubbleNucleus.'
const BUBBLE_IMAGE_URL = SRC_URL + 'bubbles/buttonImages/'

const DURATION_WILL_ENTER = 700
const DURATION_ENTER = DURATION_WILL_ENTER + 700
const INITIAL_FILTER = 0 //video

const InitialNucleus = {
  title: 'i am a cosmic title waiting to happen',
  subtitle: 'click! make me pretty',
  size: 200,
}
const FilterOptionList = [
  BubbleType.gallery,
  BubbleType.video,
  BubbleType.words,
]

export default class BubbleBuilder extends React.PureComponent {

  constructor(props) {
    super(props)

    this.timers = []
    this.filterOptions = FilterOptionList.map(opt => ({
      name: opt,
      onClick: this.onSelectFilter.bind(this, opt)
    }))

    this.state = {
      mode: Mode.willEnter,
      isUploadingImage: false,
      isPublishing: false,
      imageUrl: '',
      nucleus: getNewNucleus(FilterOptionList[INITIAL_FILTER]),
    }
  }

  componentDidMount() {
    this.timers.push(
      setTimeout(() => this.setState({mode: Mode.enter}), DURATION_WILL_ENTER),
      setTimeout(() => this.setState({mode: Mode.defocused}), DURATION_ENTER)
    )
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  componentDidUpdate() {
    // storeNucleus(this.state.nucleus)
    if (this.props.visible) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = null
    }
  }

  @autobind
  show(existingBubble, existingBubbleIndex) {
    if (existingBubble) {
      this.setState({
        nucleus: {
          ...existingBubble,
        },
        existingBubbleIndex,
        imageUrl: BUBBLE_IMAGE_URL + existingBubble.id + '.jpg',
      }, () => this.bubble.edit())
    } else {
      this.bubble.edit()
    }
  }

  render() {
    const {mode, imageUrl, nucleus, isPublishing} = this.state
    const {visible} = this.props
    const {Component: BubbleComponent} = nucleus

    return (
      <Root
        style={{display: visible? 'flex' : 'none'}}
        ref={r => this.root = r}
        className={'bubbleBuilder-' + mode}>

        <MaskAbsoluteFillParent show={isPublishing}>
          <Spinnie show={true} />
        </MaskAbsoluteFillParent>

        <UnoSelectPill
          options={this.filterOptions}
          selectedIndex={FilterOptionList.findIndex(o => o === nucleus.type)}
        />

        {this.renderBubbleButtonBuilder()}
        {this.renderBubbleBuilderTools()}

        <BubbleButton
          nucleus={nucleus}
          className='editing'
          unsavedImageUrl={imageUrl}
        />
        <BubbleDetails
          ref={r => this.bubble = r}
          onEditingChange={this.onEditingChange}
          nucleus={nucleus}
        />

        <ToolBar themeColor={'#956C95'} className='bubbleBuilderToolbar'>
          <ToolBarItem themeColor={'#956C95'} onClick={this.close}>
            <div>quit bubble builder</div>
          </ToolBarItem>
          <ToolBarItem themeColor={'#956C95'} onClick={this.publish}>
            <div>publish bubble!</div>
          </ToolBarItem>
        </ToolBar>
      </Root>
    )
  }

  renderBubbleButtonBuilder() {
    const {isUploadingImage, imageUrl, nucleus} = this.state
    return (
      <BubbleButtonRoot>
        <BubbleButtonSizeSlider
          value={nucleus.size}
          onChange={e => this.setState({
            nucleus: {
              ...nucleus,
              size: e.target.value,
            }
          })}
        />

        <BubbleButtonContent
          onClick={() => this.fileInput.click()}
          style={{
            width: +nucleus.size,
            height: +nucleus.size,
          }}>
          {isUploadingImage?
            <Spinnie show={true} /> :

            imageUrl?
              <img src={imageUrl} className='buttonContent' /> :
              <i className='fa fa-image' />
          }
          <input
            type='file' style={{visibility: 'hidden', position: 'absolute'}}
            onChange={this.onChangeFileInput}
            ref={r => this.fileInput = r}
          />
        </BubbleButtonContent>
      </BubbleButtonRoot>
    )
  }

  renderBubbleBuilderTools() {
    const {nucleus, existingBubbleIndex} = this.state
    const {renderCustomBuilderTools} = nucleus.Component
    return (
      <BubbleBuilderToolsRoot>
        <BubbleBuilderNameTool
          nucleus={nucleus}
          isExistingBubble={existingBubbleIndex}
          verifyBubbleIdExists={this.verifyBubbleIdExists}
          onChangeNucleus={this.onChangeNucleus}
        />

        <BubbleBuilderJourneyTool
          nucleus={nucleus}
          verifyBubbleIdExists={this.verifyBubbleIdExists}
          onChangeNucleus={this.onChangeNucleus}
        />

        <BubbleBuilderButtonTool
          nucleus={nucleus}
          onChangeNucleus={this.onChangeNucleus} />

        {renderCustomBuilderTools && renderCustomBuilderTools(
          nucleus,
          this.onChangeNucleus,
        )}
      </BubbleBuilderToolsRoot>
    )
  }

  @autobind
  close() {
    if (confirm('erase all your work on this bubble?')) {
      if (this.state.existingBubbleIndex) {
        this.reset()
      }
      this.props.onClose()
    }
  }

  @autobind
  onChangeNucleus(nucleus) {
    this.setState({
      nucleus: {
        ...nucleus,
      }
    })
  }

  @autobind
  onChangeFileInput(e) {
    const reader = new FileReader()
    const file = e.target.files[0]

    this.setState({
      isUploadingImage: true,
    })
    reader.onloadend = () => {
      this.setState({
        isUploadingImage: false,
        imageUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  @autobind
  onSelectFilter(opt) {
    if (opt === this.state.nucleus.type) return

    this.setState({
      nucleus: getNewNucleus(opt),
    })
  }

  @autobind
  onEditingChange(props) {
    this.setState({
      nucleus: {
        ...InitialNucleus,
        ...this.state.nucleus,
        ...props,
      },
    })
  }

  @autobind
  verifyBubbleIdExists(id) {
    return this.props.bubbleConfig.find(b => b.id === id)
  }

  @autobind
  publish() {
    const {nucleus, imageUrl, existingBubbleIndex} = this.state

    if (!nucleus.id) {
      alert('your new bubble gotsta have a name!')
      return document.getElementById('bubbleBuilderNameToolInput').focus()
    }

    const bubbleProps = JSON.stringify({
      ...nucleus,
      Component: undefined, // delete Component property
    })

    let body = `bubbleProps=${encodeURIComponent(bubbleProps)}`
    if (imageUrl.includes('base64')) {
      body += '&imageData=' + encodeURIComponent(imageUrl)
    }
    if (existingBubbleIndex) {
      body += '&existingBubbleIndex=' + existingBubbleIndex
    }

    this.setState({
      isPublishing: true,
    })

    fetch('/bubbles.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
    }).then(() => {
      const newBubbleConfig = [...this.props.bubbleConfig]
      if (existingBubbleIndex) {
        newBubbleConfig[existingBubbleIndex] = nucleus
      } else {
        newBubbleConfig.push(nucleus)
      }

      this.bubble.publish().then(() => {
        this.reset()
        this.props.onClose(nucleus.id, newBubbleConfig)
      })
    })
  }

  reset() {
    this.setState({
      nucleus: getNewNucleus(FilterOptionList[INITIAL_FILTER]),
      imageUrl: null,
      existingBubbleIndex: null,
      isPublishing: false,
    })
  }

}

function getNewNucleus(type) {
  return {
    ...InitialNucleus,
    type,
    Component: BubbleComponents[type],
  }
}

function getStoredNucleus(type) {
  const rawNucleus = window.localStorage.getItem(LOCAL_NUCLEUS_KEY + type)
  return JSON.parse(rawNucleus)
}

function storeNucleus(nucleus) {
  window.localStorage.setItem(
    LOCAL_NUCLEUS_KEY + nucleus.type,
    JSON.stringify({
      ...nucleus,
      Component: undefined,
    })
  )
}
