import React from 'react'
import {Motion, spring} from 'react-motion'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, BitBoxRoot, BitBoxText, Background, ReviewTools, ReviewTool,
  BitBoxTextRoot, EditTools, EditTool, DoneEditingButton, BitArticle, BitArticleRoot, SubmitButton,
  MoreEditingButton, ContinueButton, MoreBitsDialogue, MoreBitsContent,
  MoreBitsContinue, MoreBitsNewText, MoreBitsTextEntry, BitBoxSubmit,
} from './styled'
import {transparentize, lighten, darken} from 'polished'

import originalWriting from './writing'

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

const MAX_CHUNK_LENGTH = 324 // characters
const SPLIT_TEST = /([.?!])+/
const STORE_KEY = 'purpleRepublic.bitText.bb680453da2ecfba3f645623d04d85092'
const writing = window.localStorage.getItem(STORE_KEY) || originalWriting

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
      bit: this.getBit(writing),
      hasEngaged: false,
      bitArticle: '' + writing,
      submitState: 'idle',
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
      submitState,
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
          what the hell is this, anyhow?
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

        {!this.props.isPreloading &&
          <div>
            <BitArticleRoot>
              <BitArticle
                height={(window.scrollHeight - 100) + 'px'}
                themeColor={themeColor}
                dangerouslySetInnerHTML={{__html: bitArticle}}>
              </BitArticle>
            </BitArticleRoot>

            <SubmitButton
              disabled={submitState !== 'idle'}
              onClick={this.submitArticle}
              themeColor={themeColor}>
              {submitState === 'idle' && <div>submit it!</div>}
              {submitState === 'pending' && <div>submitting</div>}
              {submitState === 'done' && <div>done!</div>}
              <i className='fa fa-cloud-upload' />
            </SubmitButton>

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
          </div>
        }
      </Page>
    )
  }

  @autobind
  onClickNewBitsSubmit() {
    this.setState({
      bitArticle: this.newBitsTextArea.value,
    })
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

    this.props.dispatch(requestRoutePreload('#letsimprov'))
  }

  @autobind
  onMoreEditing() {
    this.setState({
      mode: MODES.bitMorePrompt,
      submitState: 'idle',
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

  @autobind
  submitArticle() {
    const body = new FormData()
    body.append('blob', new Blob([this.state.bitArticle], {type: 'text/plain'}))

    this.setState({submitState: 'pending'})

    fetch('/submissions.upload', {
      method: 'post',
      body,
    }).then(responseRaw => {
      console.info('finished uploading bit article', responseRaw)
      this.setState({submitState: 'done'})
    }).catch(e => {
      console.warning('failed uploading ' + type, e)
    })
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
    const {bit, bitArticle} = this.state
    const {startIndex, endIndex} = bit

    const newArticleChars = bitArticle.split('')
    newArticleChars.splice(startIndex, endIndex - startIndex)

    const newArticle = newArticleChars.join('')
    this.setState({bitArticle: newArticle})
    window.localStorage.setItem(STORE_KEY, newArticle)

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
    const {bit, bitArticle} = this.state
    const {startIndex, endIndex} = bit

    const articleChars = bitArticle.split('')
    const newTextChars = this.bitTextArea.value.split('')
    articleChars.splice(startIndex, endIndex - startIndex, ...newTextChars)

    const newArticle = articleChars.join('')
    this.setState({bitArticle: newArticle})
    window.localStorage.setItem(STORE_KEY, newArticle)

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
    })
  }

  updateBit() {
    const bit = this.getBit()
    this.setState({bit})
    this.bitTextArea.value = bit.text
    resizeTextArea(this.bitTextArea)
  }

  @autobind
  getBit(article) {
    const bitArticle = (article || this.state.bitArticle)
    const startIndexSeed = Math.round(Math.random() * (bitArticle.length - 1))
    let startIndex = 0
    for (let i = startIndexSeed; i > 0; i--) {
      if (writing[i] === '.') {
        startIndex = i + 1
        break
      }
    }

    let text = []
    let shouldQuitAfterNextPeriod = false
    let endIndex = writing.length - 1
    for (let i = startIndex; i < writing.length - 1; i++) {
      text.push(writing[i])
      if (writing[i] === '.' && shouldQuitAfterNextPeriod) {
        endIndex = i
        break
      }
      if (text.length === MAX_CHUNK_LENGTH) {
        shouldQuitAfterNextPeriod = true
        if (writing[i] === '.') {
          endIndex = i
          break
        }
      }
    }

    while (!!text[0].match(/\s/g)) {
      text.splice(0, 1)
    }

    return {
      text: text.join('').replace(/(<p \/>)/g, '').replace(/(<br \/>)/g, ''),
      startIndex,
      endIndex,
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
    .filter(s => !!s && !s.match(SPLIT_TEST) && s !== '.')
}
