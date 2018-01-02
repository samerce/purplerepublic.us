import React from 'react'
import {Motion, spring} from 'react-motion'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, Spinner, BitBoxRoot, BitBoxText, Background, ReviewTools, ReviewTool,
  BitBoxTextRoot, EditTools, EditTool, DoneEditingButton, BitArticle, BitArticleRoot,
  MoreEditingButton, ContinueButton, MoreBitsDialogue, MoreBitsContent,
  MoreBitsContinue, MoreBitsNewText, MoreBitsTextEntry, BitBoxSubmit,
} from './styled'
import {transparentize, lighten, darken} from 'polished'

import writing from './writing'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {requestRoutePreload} from '../App/actions'

const MODES = [
  'willEnter',
  'bitEnter',
  'bitReview',
  'bitEdit',
  'bitDelete',
  'bitKeep',
  'readBitArticle',
  'bitMorePrompt',
  'bitMoreTextEntry',
  'bitExit',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})

const SPLIT_TEST = /([.?!\n])+/
const STORE_KEY = 'purpleRepublicBitText'
const storedWriting = window.localStorage.getItem(STORE_KEY)
let sentences = splitSentences(storedWriting || writing)

@connect(d => ({
  backgroundUrl: d.get('quarkArt').get('motherImageUrl'),
  themeColor: d.get('quarkArt').get('themeColor'),
}))
export default class BitByBit extends React.Component {

  constructor() {
    super()

    this.timers = []
    this.state = {
      mode: MODES.willEnter,
      bit: this.getBit(),
      hasEngaged: false,
      bitArticle: '',
    }
  }

  componentDidMount() {
    if (!this.props.isPreloading) this.onEnter()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPreloading && this.state.mode === MODES.willEnter) {
      this.onEnter()
    }
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    const {
      mode,
      bit,
      hasEngaged,
      bitArticle,
    } = this.state
    const {
      backgroundUrl,
      themeColor,
    } = this.props

    this.bitTextArea && resizeTextArea(this.bitTextArea)

    return (
      <Page
        themeColor={themeColor}
        className={mode}>
        <Background src={backgroundUrl} />
        <Header className='bit-header'>
          what are your thoughts?
        </Header>
        <Header className='bit-article-header'>
          paint away your tears
        </Header>

        <Motion
          defaultStyle={{scale: 0, opacity: 0, y: -1000}}
          style={this.getBitBoxStyleAnimation()}>
          {(values) => (
            <BitBoxRoot style={this.getBitBoxStyle(values)}>
              <BitBoxTextRoot
                style={this.getBitBoxTextStyle()}>
                <BitBoxText
                  defaultValue={bit.text}
                  innerRef={r => this.bitTextArea = r} />
              </BitBoxTextRoot>

              <ReviewTools
                themeColor={themeColor}>
                <ReviewTool
                  onClick={this.onDeleteBit}
                  style={this.reviewToolStyle()}
                  themeColor={themeColor}>
                  <div>delete</div>
                </ReviewTool>
                <ReviewTool
                  onClick={this.onEditBit}
                  style={this.reviewToolStyle(.15)}
                  themeColor={themeColor}>
                  <div>edit</div>
                </ReviewTool>
                <ReviewTool
                  onClick={this.onKeepBit}
                  style={this.reviewToolStyle(.3)}
                  themeColor={themeColor}>
                  <div>keep</div>
                </ReviewTool>
              </ReviewTools>

              <EditTools themeColor={themeColor}>
                <EditTool
                  onClick={this.onEditBitCanceled}
                  style={this.editToolStyle()}
                  themeColor={themeColor}>
                  <div>never mind</div>
                </EditTool>
                <EditTool
                  onClick={this.onEditBitFinished}
                  style={this.editToolStyle(.15)}
                  themeColor={themeColor}>
                  <div>looks good</div>
                </EditTool>
              </EditTools>
            </BitBoxRoot>
          )}
        </Motion>

        <DoneEditingButton
          onClick={this.onFinishedBitting}
          className={cx({show: hasEngaged})}
          themeColor={themeColor}>
          <div>done editing</div>
        </DoneEditingButton>

        <BitArticleRoot>
          <BitArticle
            height={(window.scrollHeight - 100) + 'px'}
            themeColor={themeColor}>
            {bitArticle}
          </BitArticle>
        </BitArticleRoot>

        <MoreEditingButton
          onClick={this.onMoreEditing}
          themeColor={themeColor}>
          <i className='fa fa-cubes' />
          <div>more bits!</div>
        </MoreEditingButton>

        <ContinueButton
          onClick={this.onExit}
          themeColor={themeColor}>
          <div>now what?</div>
          <i className='fa fa-compass' />
        </ContinueButton>

        <MoreBitsDialogue>
          <MoreBitsContent themeColor={themeColor}>
            <MoreBitsContinue onClick={this.onClickMoreBitsContinue}>
              <div>keep editing</div>
            </MoreBitsContinue>
            <MoreBitsNewText onClick={this.onClickMoreBitsNewText}>
              <div>edit new work</div>
            </MoreBitsNewText>
            <MoreBitsTextEntry themeColor={themeColor}>
              <BitBoxText
                className='newBitsInput'
                placeholder='your new bits here'
                innerRef={r => this.newBitsTextArea = r} />
              <BitBoxSubmit onClick={this.onClickNewBitsSubmit}>
                <div>edit this!</div>
              </BitBoxSubmit>
            </MoreBitsTextEntry>
          </MoreBitsContent>
        </MoreBitsDialogue>
      </Page>
    )
  }

  @autobind
  onClickNewBitsSubmit() {
    sentences = splitSentences(this.newBitsTextArea.value)
    this.updateBit()
    this.setState({
      mode: MODES.bitReview,
    })
  }

  @autobind
  onClickMoreBitsContinue() {
    this.setState({mode: MODES.bitReview})
  }

  @autobind
  onClickMoreBitsNewText() {
    this.setState({mode: MODES.bitMoreTextEntry})
  }

  onEnter() {
    this.timers.push(setTimeout(() => this.setState({mode: MODES.bitEnter})))
    this.timers.push(setTimeout(() => {
      this.setState({mode: MODES.bitReview})
    }, 4000))

    // this.props.dispatch(requestRoutePreload('#letsimprov'))
  }

  @autobind
  onMoreEditing() {
    this.setState({
      mode: MODES.bitMorePrompt,
    })
    this.newBitsTextArea.focus()
  }

  @autobind
  onExit() {
    this.setState({
      mode: MODES.bitExit,
    })
    this.timers.push(setTimeout(() => window.location = '#letsimprov', 2000))
  }

  reviewToolStyle(delay = 0) {
    const styles = {
      [MODES.bitEnter]: {},
      [MODES.bitReview]: {
        transitionDelay: .5 + delay + 's',
      },
      [MODES.bitEdit]: {
        transitionDelay: delay + 's',
      },
      fallback: {
        transitionDelay: delay + 's',
      }
    }
    return styles[this.state.mode] || styles.fallback
  }

  editToolStyle(delay = 0) {
    const styles = {
      [MODES.bitEnter]: {},
      [MODES.bitReview]: {
        transitionDelay: delay + 's',
      },
      [MODES.bitEdit]: {
        transitionDelay: .5 + delay + 's',
      },
      fallback: {
        transitionDelay: delay + 's',
      }
    }
    return styles[this.state.mode] || styles.fallback
  }

  @autobind
  onDeleteBit() {
    const {bit} = this.state
    sentences.splice(bit.startIndex, bit.numSentences)
    window.localStorage.setItem(STORE_KEY, sentences.join('. '))

    this.setState({
      mode: MODES.bitDelete,
      hasEngaged: true,
    })
    this.timers.push(setTimeout(() => {
      this.setState({
        mode: MODES.bitReview,
      })
      this.updateBit()
    }, 1000))
  }

  @autobind
  onEditBit() {
    this.setState({
      mode: MODES.bitEdit,
    })
    this.bitTextArea.focus()
    this.uneditedBitText = this.bitTextArea.value
  }

  @autobind
  onEditBitFinished() {
    const {bit} = this.state
    const newSentences = splitSentences(this.bitTextArea.value)
    sentences.splice(bit.startIndex, bit.numSentences, ...newSentences)

    window.localStorage.setItem(STORE_KEY, sentences.join('. '))
    this.onKeepBit()
  }

  @autobind
  onKeepBit() {
    this.setState({
      mode: MODES.bitKeep,
      hasEngaged: true,
    })
    this.timers.push(setTimeout(() => {
      this.setState({
        mode: MODES.bitReview,
      })
      this.updateBit()
    }, 1200))
  }

  @autobind
  onEditBitCanceled() {
    this.bitTextArea.value = this.uneditedBitText
    this.bitTextArea.blur()
    this.setState({mode: MODES.bitReview})
  }

  @autobind
  onFinishedBitting() {
    this.setState({
      mode: MODES.readBitArticle,
      bitArticle: sentences.join('. '),
    })
  }

  updateBit() {
    const bit = this.getBit()
    this.setState({bit})
    this.bitTextArea.value = bit.text
    resizeTextArea(this.bitTextArea)
  }

  renderSpinner(text, classNames = '') {
    return (
      <Spinner className={classNames}>
        <i className='fa fa-superpowers' />
        {text && <span>&nbsp; {text}</span>}
      </Spinner>
    )
  }

  getBit() {
    const MAX_SENTENCES = Math.min(4, sentences.length)
    const numSentences = Math.round(Math.random() * MAX_SENTENCES) + 1
    const startIndex = Math.round(Math.random() * (sentences.length - MAX_SENTENCES - 2))
    return {
      text: sentences.slice(startIndex, startIndex + numSentences).join('. ') + '.',
      startIndex,
      numSentences,
    }
  }

  getBitBoxStyle({scale, opacity, y}) {
    return {
      opacity,
      transform: `translateY(${y}px)`,
    }
  }

  getBitBoxStyleAnimation() {
    const {mode} = this.state
    const config = {stiffness: 70, damping: 18}

    if (mode === MODES.willEnter || mode === MODES.bitEnter) return {
      opacity: spring(0, {stiffness: 30, damping: 18}),
      y: spring(1000, {stiffness: 30, damping: 18}),
    }
    return {
      opacity: spring(1, config),
      y: spring(0, config),
    }
  }

  getBitBoxTextStyle() {
    const {mode} = this.state
    const {themeColor} = this.props

    if (mode === MODES.bitEdit) return {
      border: '1px solid ' + lighten(.6, themeColor),
      background: darken(.1, themeColor),
    }
    return {
      border: '1px solid ' + lighten(.1, themeColor),
      background: transparentize(.2, themeColor),
    }
  }

}

function resizeTextArea(textarea) {
  textarea.style.height = textarea.scrollHeight + 'px'
}

function splitSentences(text) {
  return text
    .trim()
    .split(SPLIT_TEST)
    .map(s => s.trim())
    .filter(s => !!s && !s.match(SPLIT_TEST))
}
