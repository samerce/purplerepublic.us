import React from 'react'
import {findDOMNode} from 'react-dom'
import Spinnie from '../../spinnie'
import UnoSelectPill from '../../unoSelectPill'
import uuid from 'uuid/v1'

import Bubble from '..'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {Description} from '../bubbleItems/styled'
import {BubbleType, BubbleComponents} from '../bubbles'

import {cx} from '../../../utils/style'
import {
  Root, BubbleButtonRoot,
} from './styled'
import {
  ToolBar, ToolBarItem,
} from '../../../global/styled'

import {makeEnum} from '../../../utils/lang'
import autobind from 'autobind-decorator'

import BubbleNuclei from '../bubbleItems'

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

const DURATION_WILL_ENTER = 700
const DURATION_ENTER = DURATION_WILL_ENTER + 700
const INITIAL_FILTER = 0 //video

const InitialNucleus = {
  title: 'i am a cosmic title waiting to happen',
  subtitle: 'click! make me pretty',
  size: 'xlarge',
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
      imageUrl: '',
      nucleus: getNewNucleus(FilterOptionList[INITIAL_FILTER]),
      editedProps: {},
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

  show() {
    this.bubble.edit()
  }

  render() {
    const {mode, imageUrl, isUploadingImage, nucleus} = this.state
    const {visible} = this.props

    if (imageUrl) {
      nucleus.Component.getButtonImageUrl = () => imageUrl
    }

    return (
      <Root
        style={{display: visible? 'flex' : 'none'}}
        ref={r => this.root = r}
        className={'bubbleBuilder-' + mode}>

        <UnoSelectPill
          options={this.filterOptions}
          initialSelected={INITIAL_FILTER}
        />

        <BubbleButtonRoot onClick={() => this.fileInput.click()}>
          {isUploadingImage?
            <Spinnie show={true} /> :

            imageUrl?
            <img src={imageUrl} className='buttonContent' /> :
            <i className='buttonContent fa fa-image' />
          }
          <input type='file' style={{visibility: 'hidden'}}
            onChange={this.onChangeFileInput}
            ref={r => this.fileInput = r}/>
        </BubbleButtonRoot>

        <Bubble
          ref={r => this.bubble = r}
          nucleus={{
            ...nucleus,
            onEditingChange: this.onEditingChange,
          }}
        />

        <ToolBar themeColor={'#956C95'} style={{zIndex: 50, pointerEvents: 'all'}}>
          <ToolBarItem themeColor={'#956C95'} onClick={this.props.onClose}>
            <div>quit building</div>
          </ToolBarItem>
          <ToolBarItem themeColor={'#956C95'} onClick={this.publish}>
            <div>publish bubble!</div>
          </ToolBarItem>
        </ToolBar>
      </Root>
    )
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

    this.setState({
      nucleus: getNewNucleus(opt)
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
    const imageData = encodeURIComponent(imageUrl)
    const bubbleProps = JSON.stringify({
      ...nucleus,
      Component: undefined,
      id: uuid(),
    })

    fetch('/bubbles.upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `imageData=${imageData}&bubbleProps=${bubbleProps}`,
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
