import React from 'react'
import PayPalLink from '../../components/payPalLink'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot, Background, Product, SocialNetworksRoot, SocialIcon,
  KeepPlayingToolbar, KeepPlayingToolbarItem, FinalWord, Finality, FinalFeedback,
  FeedbackArea, SendFeedback, ReachUs, ShopUs, ReachText, ReachIcons, ShopText,
  ShopIcons, Callout, ScrollRoot, FundText, FundIcons, KeepPlayingButton,
} from './styled'

import {SRC_URL} from '../../global/constants'
import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'
import autobind from 'autobind-decorator'

const BASE_URL = SRC_URL + 'outro/'
const ICON_URL = SRC_URL + 'icons/'
const Mode = makeEnum([
  'enter',
  'exit',
])

@connect(d => ({
  backgroundUrl: d.get('quarkArt').get('motherImageUrl'),
  themeColor: d.get('quarkArt').get('themeColor'),
}))
export default class Outro extends React.Component {

  constructor() {
    super()

    this.timers = []
    this.state = {
      mode: '',
      menuOpen: false,
      shareOpen: false,
      shopOpen: false,
      fundOpen: false,
      sendText: 'send'
    }
  }

  componentWillMount() {
    this.timers.push([
      setTimeout(() => this.setState({mode: Mode.enter})),
    ])
  }

  componentWillUnmount() {
    this.timers.forEach(clearTimeout)
  }

  render() {
    const {mode, menuOpen, shareOpen, shopOpen, fundOpen, sendText} = this.state
    const {backgroundUrl, themeColor} = this.props
    return (
      <Page className={'outro-' + mode}>
        <Background src={backgroundUrl} />
        <HeaderRoot themeColor={themeColor}>
          <Header className='outro-header'>
            ouroboros
          </Header>
        </HeaderRoot>

        <a href='https://www.redbubble.com/people/purplerepublic/works/28310647-feel-the-weird?p=leggings' target='__blank' className='product-link left'>
          <Callout>
            <span>⤴</span>swag for a cause
          </Callout>
          <Product className='product-left'>
            <img src={BASE_URL + 'leggings.png'} />
          </Product>
        </a>
        <a className='product-link right' href='https://www.redbubble.com/people/purplerepublic/works/28398513-cosmic-diversity-abstract-modern-art-tiny-worlds?p=tote-bag' target='__blank'>
          <Callout className='callout-right'>
            purple paraphernalia<span>⤵</span>
          </Callout>
          <Product className='product-right'>
            <img src={BASE_URL + 'tote.png'} />
          </Product>
        </a>

        <SocialNetworksRoot themeColor={themeColor}>
          <ReachUs>
            <ReachText
              onClick={() => this.toggle('share')}
              className={cx({
                hidden: shareOpen
              })}
              themeColor={themeColor}>
              reach us
            </ReachText>
            <ReachIcons visible={shareOpen}>
              <a href='https://www.facebook.com/purplerepublic.us' target='_blank'>
                <SocialIcon className='fa fa-facebook-square i1' />
              </a>
              <a href='https://www.medium.com/the-purple-republic' target='_blank'>
                <SocialIcon className='fa fa-medium i6' />
              </a>
              <a href='https://www.youtube.com/channel/UCne9Pv9CARxNz8rNMaDm7Dw' target='_blank'>
                <SocialIcon className='fa fa-youtube-square i5' />
              </a>
              <a href='https://www.twitter.com/1purplerepublic' target='_blank'>
                <SocialIcon className='fa fa-twitter-square i2' />
              </a>
              <a href='https://www.instagram.com/purple.republic' target='_blank'>
                <SocialIcon className='fa fa-instagram i3' />
              </a>
              <a href='mailto:rise@purplerepublic.us'>
                <SocialIcon className='fa fa-envelope-o i7' />
              </a>
            </ReachIcons>
          </ReachUs>
          <ShopUs>
            <ShopText
              className={cx({
                hidden: shopOpen
              })}
              onClick={() => this.toggle('shop')}
              themeColor={themeColor}>
              shop us
            </ShopText>
            <ShopIcons visible={shopOpen}>
              <a href='https://www.etsy.com/shop/purplerepublic' target='_blank'>
                <SocialIcon className='fa fa-etsy i4' />
              </a>
              <a href='https://www.redbubble.com/people/purplerepublic/portfolio' target='_blank'>
                <object data={ICON_URL + 'redbubble.svg'} className='i8' />
              </a>
            </ShopIcons>
            <FundText
              onClick={() => this.toggle('fund')}
              className={cx({
                hidden: fundOpen
              })}
              themeColor={themeColor}>
              fund us
            </FundText>
            <FundIcons visible={fundOpen}>
              <a href='https://www.patreon.com/purplerepublic' target='_blank'>
                <object data={ICON_URL + 'patreon.svg'} type='image/svg+xml' className='i11' />
              </a>
              <a onClick={() => this.payPalLink.click()}>
                <SocialIcon className='fa fa-paypal i9' />
                <PayPalLink ref={r => this.payPalLink = r} />
              </a>
            </FundIcons>
          </ShopUs>
        </SocialNetworksRoot>

        <Finality>
          <FinalWord themeColor={themeColor}>
            <div className='final-word-content'>
              thanks for playing with us ! we're here to think, make art and celebrate living. to simultaneously radically accept and critically question. to share the magic. because life is special. & we sometimes need reminders.

              <p>through the written word, video, visual art, events, theatre, performance, drag and discussion we aim to do our part for the revolution.</p>

              <p>if you like what we do, consider supporting our endeavors. you pick the price. funds go to projects aimed at healing the divide and promoting dialogue over dogma, creation over destruction, love over fear and division.</p>

              <p>come back for a new journey soon. life is a sandcastle built too close to the shore.</p>

              <hr />

              <p>purple republic is a movement of performance, politics, & play. of radical expression & rebellion. of art. just for the sake of it. of perpetual empowerment.</p>

              <p>let's celebrate life, chase curiosities, & play with this gift of breath. WE ARE ALIVE!</p>

              <p>maybe free will isn't real—but at least we get to choose where to focus. art saves lives. our mission is to share ourselves however it comes out.</p>

              <p>our dream is that one day everyone will know how perfect they already are.</p>

              namaste, beautiful !
            </div>
            <div className='read-more-indicator'>
              <i className='fa fa-arrows-v' />
            </div>
          </FinalWord>

          <FinalFeedback themeColor={themeColor}>
            <FeedbackArea themeColor={themeColor}>
              <textarea
                placeholder='comments, feedback, collaborations, funny stories (the library is open)...'
                ref={r => this.feedbackInput = r} />
              <SendFeedback
                themeColor={themeColor}
                onClick={this.sendFeedback}>
                {sendText}
              </SendFeedback>
            </FeedbackArea>
          </FinalFeedback>
        </Finality>

        <KeepPlayingToolbar
          visible={this.state.menuOpen}
          themeColor={themeColor}>
          <KeepPlayingToolbarItem
            onClick={this.toggle.bind(this, 'menu')}
            className='never-mind-button'
            themeColor={themeColor}>
            <div>never mind</div>
          </KeepPlayingToolbarItem>
          <KeepPlayingToolbarItem
            onClick={() => window.location = '#letsfocus'}
            themeColor={themeColor}>
            <div>more art</div>
          </KeepPlayingToolbarItem>
          <KeepPlayingToolbarItem
            onClick={() => window.location = '#letswrite'}
            themeColor={themeColor}>
            <div>more writing</div>
          </KeepPlayingToolbarItem>
          <KeepPlayingToolbarItem
            onClick={() => window.location = '#letsimprov'}
            themeColor={themeColor}>
            <div>more video</div>
          </KeepPlayingToolbarItem>
          <KeepPlayingToolbarItem
            onClick={() => window.location = ''}
            themeColor={themeColor}>
            <div>eat your own tail</div>
          </KeepPlayingToolbarItem>
        </KeepPlayingToolbar>

      <KeepPlayingButton
        onClick={this.toggle.bind(this, 'menu')}
        className={this.state.menuOpen && 'hidden'}
        themeColor={themeColor}>
        <div>keep playing</div>
      </KeepPlayingButton>

      </Page>
    )
  }

  @autobind
  toggle(item) {
    const key = `${item}Open`
    this.setState(prevState => ({
      [key]: !prevState[key],
    }))
  }

  @autobind
  sendFeedback() {
    const blob = new Blob(
      ['outro-feedback: ' + this.feedbackInput.value],
      {type: 'text/plain'})
    const body = new FormData()
    body.append('blob', blob)

    this.setState({sendText: 'sending'})

    fetch('/submissions.upload', {
      method: 'post',
      body,
    }).then(responseRaw => {
      console.log('finished uploading feedback', responseRaw)
      this.setState({sendText: 'sent!'})
      this.timers.push(
        setTimeout(() => this.setState({sendText: 'send'}), 3000)
      )
    }).catch(e => {
      console.warn('failed uploading feedback', e)
    })
  }

}
