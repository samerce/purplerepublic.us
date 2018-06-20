import React from 'react'
import {findDOMNode} from 'react-dom'
import Spinnie from '../../spinnie'
import UnoSelectPill from '../../unoSelectPill'

import Bubble from '..'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {Description} from '../bubbleItems/styled'

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

const InitialNucleusProps = {
  title: 'i am a cosmic title waiting to happen',
  subtitle: 'click! make me pretty',
  size: 'xlarge',
}
const InitialNucleusBuilder = BubbleNuclei.All[INITIAL_FILTER]
const InitialNucleus = InitialNucleusBuilder.Component.makeNucleus(InitialNucleusProps)

export default class BubbleBuilder extends React.Component {

  constructor(props) {
    super(props)

    this.timers = []
    this.nucleiInProgress = {
      [InitialNucleusBuilder.name]: InitialNucleus,
    }
    this.filterOptions = BubbleNuclei.All.map(opt => ({
      ...opt,
      onClick: this.onSelectFilter.bind(this, opt)
    }))

    this.state = {
      mode: Mode.willEnter,
      isUploadingImage: false,
      imageUrl: '',
      nucleus: InitialNucleus,
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
    const {mode, imageUrl, isUploadingImage} = this.state
    const {visible} = this.props

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
          editing={true}
          nucleus={{
            ...this.state.nucleus,
            onEditingChange: this.onEditingChange,
          }}
          ref={r => this.bubble = r}
        />

        <ToolBar themeColor={'#956C95'} style={{zIndex: 50, pointerEvents: 'all'}}>
          <ToolBarItem themeColor={'#956C95'} onClick={this.props.onClose}>
            <div>quit building</div>
          </ToolBarItem>
          <ToolBarItem themeColor={'#956C95'}>
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
        nucleus: {
          ...this.state.nucleus,
          buttonImageUrl: reader.result,
        },
        editedProps: {
          ...this.state.editedProps,
          buttonImageUrl: reader.result,
        },
      })
    }
    reader.readAsDataURL(file)
  }

  @autobind
  onSelectFilter(opt) {
    if (opt.Component === this.state.nucleus.Component) return

    const nucleus = opt.Component.makeNucleus({
      ...InitialNucleusProps,
    })
    this.setState({nucleus})
    this.nucleiInProgress[opt.name] = nucleus
  }

  @autobind
  onEditingChange(props) {
    const editedProps = {
      ...this.state.editedProps,
      ...props,
    }
    this.setState({
      editedProps,
      nucleus: this.state.nucleus.Component.makeNucleus({
        ...InitialNucleusProps,
        ...editedProps,
      })
    })
  }

}
