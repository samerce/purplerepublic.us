import React from 'react'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, Spinner, BitBox,
} from './styled'
import writing from './writing'

import autobind from 'autobind-decorator'
import {Motion, spring} from 'react-motion'

const MODES = [
  'multipleChoice',
  'crop',
  'describe',
  'performCrop',
  'quarkArtGallery',
].reduce((modeMap, mode) => (modeMap[mode] = mode) && modeMap, {})
const sentences = writing.split('.').map(s => s.trim())

export default class BitByBit extends React.Component {

  constructor() {
    super()

    this.state = {
      mode: MODES.multipleChoice,
      isReady: true,
      bit: this.getBit(),
    }
  }

  componentDidMount() {

  }

  render() {
    const {
      mode,
      isReady,
      bit,
    } = this.state

    return (
      <Page>
        {this.renderSpinner('', `dark big opaque ${!isReady && 'show'}`)}
        <Header className='bitHeader'>
          what are your thoughts?
        </Header>
        <Motion
          defaultStyle={{scale: 0, opacity: 0}}
          style={this.getBitBoxStyleAnimation()}>
          {(values) => (
            <BitBox style={this.getBitBoxStyle(values)}>
              {bit}
            </BitBox>
          )}
        </Motion>
      </Page>
    )
  }

  renderSpinner(text, classNames = '') {
    return (
      <Spinner className={classNames}>
        <i className='fa fa-superpowers' />
        {text && <span>&nbsp; {text}</span>}
      </Spinner>
    )
  }

  @autobind
  onReady() {
    setTimeout(() => this.setState({isReady: true}), 1000)
  }

  getBit() {
    const MAX_SENTENCES = 4
    const numSentences = Math.round(Math.random() * MAX_SENTENCES) + 1
    const startIndex = Math.round(Math.random() * (sentences.length - MAX_SENTENCES - 2))
    return sentences.slice(startIndex, startIndex + numSentences).join('. ')
  }

  getBitBoxStyle({scale, opacity}) {
    return {
      transform: `scale(${scale})`,
      opacity,
    }
  }

  getBitBoxStyleAnimation() {
    const config = {stiffness: 150, damping: 13}
    return {
      scale: spring(1, config),
      opacity: spring(1, config),
    }
  }

}
