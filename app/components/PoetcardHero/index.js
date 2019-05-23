import React from 'react'
import {
  ClickableImage, SectionHeader
} from '../tinySpells'

import {
  Root, Button, ImageGroup, Body, TextInput, SecretCodeForm,
} from './styled'
import {
  H1, H2,
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import {pcUrl} from '../../utils/url'

import SecretCodeConfig from './secretCodeConfig'
import {SRC_URL} from '../../global/constants'

const InvalidCodeCheeky = [
  'nope! 🤪', 'nada 😛', 'nice try! 🤓', 'not the one 😂'
]

@connect(d => ({
  introMode: d.get('intro').get('mode'),
}))
export default class PoetcardHero extends React.PureComponent {

  render() {
    return (
      <Root className={this.props.introMode}>
        <SectionHeader text='poetcards' />

        <H1>
          our plan is to save the world with art
        </H1>
        <H2>
          write a postcard to a friend who needs it most!
        </H2>

        <ImageGroup>
          <ClickableImage src={pcUrl('be your own therapy')} />
          <ClickableImage src={pcUrl('ice cream poop')} />
        </ImageGroup>

        <Body className='mainBody'>
          <p>
            darling, sweetie.<br />
            wanna join the love revolution from your couch?
          </p>
          <Button onClick={this.onClickGetPoetcards}>
            check out all 50
          </Button>
        </Body>

        <SecretCodeForm>
          <p>got a poetcard secret code?</p>
          <TextInput
            onKeyPress={this.onKeyPressSecretCode}
            placeholder='enter it here!'
          />
        </SecretCodeForm>

        <ImageGroup>
          <ClickableImage src={pcUrl('amy')} />
          <ClickableImage src={pcUrl('di-no')} />
        </ImageGroup>
      </Root>
    )
  }

  @autobind
  onClickGetPoetcards() {
    window.location = '#start/bubble/buy-poetcards'

    ga('send', 'event', {
      eventCategory: 'poetcard hero',
      eventAction: 'get-poetcards clicked',
    })
  }

  @autobind
  onKeyPressSecretCode(e) {
    if (e.key !== 'Enter') return

    e.target.blur()

    const code = e.target.value.toLowerCase().trim()
    const handler = SecretCodeConfig[code]

    if (!handler) this.onInvalidCode(e.target)
    else this.onValidCode(e.target, handler)

    ga('send', 'event', {
      eventCategory: 'poetcard hero',
      eventAction: 'secret code entered',
      eventLabel: code,
    })
  }

  onValidCode(input, handler) {
    input.value = '🌞 opening treasure... 🌞'
    if (typeof handler === 'string') {
      window.location = '#start/bubble/secret-' + handler
    } else {
      handler()
    }
    setTimeout(() => input.value = '', 1000)
  }

  onInvalidCode(input) {
    const responseIndex = Math.floor(
      Math.random() * InvalidCodeCheeky.length
    )
    input.value = InvalidCodeCheeky[responseIndex]
    setTimeout(() => {
      input.value = ''
      input.focus()
    }, 1000)
  }

}
