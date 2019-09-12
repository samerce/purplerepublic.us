import React from 'react'

import {
  Root, Word, WordRollDuration,
} from './styled'

import autobind from 'autobind-decorator'

export default class WordRolodex extends React.Component {

  constructor() {
    super()
    this.wordRefs = []
    this.index = 0
  }

  componentDidMount() {
    this.wordRefs[0].innerHTML = this.props.words[this.index]
    this.prepNextRoll(this.wordRefs[1])
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Root className={this.props.className || ''}>
        <Word ref={r => this.wordRefs[0] = r} id='present' key='present' />
        <Word ref={r => this.wordRefs[1] = r} id='future' key='future' />
      </Root>
    )
  }

  @autobind
  update() {
    this.wordRefs.forEach(wr => this[wr.id + 'Update'](wr))
  }

  presentUpdate(wordRef) {
    wordRef.id = 'past'
    setTimeout(() => this.prepNextRoll(wordRef), WordRollDuration)
  }

  futureUpdate(wordRef) {
    wordRef.id = 'present'
  }

  @autobind
  prepNextRoll(wordRef) {
    const {words} = this.props
    this.index = (this.index + 1) % words.length

    wordRef.innerHTML = words[this.index]
    wordRef.id = 'future'

    setTimeout(this.update, 700)
  }

}
