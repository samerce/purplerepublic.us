import React from 'react'
import Spinnie from '../../spinnie'
import UnoSelectPill from '../../unoSelectPill'
import {
  BubbleBuilderNameTool,
  BubbleBuilderButtonTool,
  BubbleBuilderJourneyTool,
} from '../bubbleBuilderTools'

import Bubble from '..'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {Description} from '../bubbleItems/styled'
import {BubbleType, BubbleComponents} from '../bubbles'

import {cx} from '../../../utils/style'
import {
  Root, BubbleButtonRoot, BubbleBuilderToolsRoot, BubbleButtonContent,
  BubbleButtonSizeSlider,
} from './styled'
import {
  ToolBar, ToolBarItem, PublishMask,
} from '../../../global/styled'

import {makeEnum} from '../../../utils/lang'
import autobind from 'autobind-decorator'

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

const DURATION_WILL_ENTER = 700
const DURATION_ENTER = DURATION_WILL_ENTER + 700
const INITIAL_FILTER = 0 //video

const InitialNucleus = {
  title: 'i am a cosmic title waiting to happen',
  subtitle: 'click! make me pretty',
  size: 200,
}
const FilterOptionList = [
  // BubbleType.gallery,
  BubbleType.video,
  BubbleType.writing,
]

export default class BubbleBuilder extends React.Component {

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
    // const localNucleus = getStoredNucleus(this.state.nucleus.type)
    // if (localNucleus) this.setState({
    //   nucleus: {
    //     ...this.state.nucleus,
    //     ...localNucleus,
    //   },
    // })

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

  show() {
    this.bubble.edit()
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

        <PublishMask show={isPublishing}>
          <Spinnie show={true} />
        </PublishMask>

        <UnoSelectPill
          options={this.filterOptions}
          initialSelected={INITIAL_FILTER}
        />

        {this.renderBubbleButtonBuilder()}
        {this.renderBubbleBuilderTools()}

        <Bubble
          ref={r => this.bubble = r}
          unsavedImageUrl={imageUrl}
          nucleus={{
            ...nucleus,
            onEditingChange: this.onEditingChange,
          }}
        />

        <ToolBar themeColor={'#956C95'} style={{position: 'fixed', zIndex: 50, pointerEvents: 'all'}}>
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
          type='range' min='150' max='300' step='6'
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
    const {nucleus} = this.state
    const {renderCustomBuilderTools} = nucleus.Component
    return (
      <BubbleBuilderToolsRoot>
        <BubbleBuilderNameTool
          nucleus={nucleus}
          onChangeNucleus={this.onChangeNucleus}
        />

        <BubbleBuilderJourneyTool
          nucleus={nucleus}
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
        image: file,
        imageUrl: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  @autobind
  onSelectFilter(opt) {
    if (opt === this.state.nucleus.type) return

    // const localNucleus = getStoredNucleus(opt)
    this.setState({
      nucleus: getNewNucleus(opt),
      // ...localNucleus,
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
  publish() {
    const {nucleus, imageUrl} = this.state

    if (!nucleus.id) {
      alert('your new bubble gotsta have a name!')
      return document.getElementById('bubbleBuilderNameToolInput').focus()
    }

    const imageData = encodeURIComponent(imageUrl)
    const bubbleProps = JSON.stringify({
      ...nucleus,
      Component: undefined, // delete Component property
    })

    this.setState({
      isPublishing: true,
    })

    fetch('/bubbles.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `imageData=${imageData}&bubbleProps=${bubbleProps}`,
    }).then(() => {
      // window.localStorage.removeItem(LOCAL_NUCLEUS_KEY + nucleus.type)
      window.bubbles[nucleus.id] = nucleus
      window.location = '/#start?spotlight=' + nucleus.id
      this.setState({
        nucleus: getNewNucleus(nucleus.type),
        image: null,
        imageData: null,
        isPublishing: false,
      })
      this.props.onClose()
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
