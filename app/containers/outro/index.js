import React from 'react'

import {cx} from '../../utils/style'
import {Header} from '../../global/styled'
import {
  Page, HeaderRoot, Background, Product, SocialNetworksRoot, SocialIcon,
  KeepPlayingToolbar, KeepPlayingToolbarItem, FinalWord, Finality, FinalFeedback,
  FeedbackArea, SendFeedback, ReachUs, ShopUs, ReachText, ReachIcons, ShopText,
  ShopIcons, Callout,
} from './styled'

import {SRC_URL} from '../../global/constants'
import {connect} from 'react-redux'
import {makeEnum} from '../../utils/lang'

const BASE_URL = SRC_URL + 'outro/'
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
    const {mode} = this.state
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
            purple paraphrenelia<span>⤵</span>
          </Callout>
          <Product className='product-right'>
            <img src={BASE_URL + 'tote.png'} />
          </Product>
        </a>

        <SocialNetworksRoot themeColor={themeColor}>
          <ReachUs>
            <ReachText themeColor={themeColor}>
              reach us
            </ReachText>
            <ReachIcons>
              <a href='https://www.facebook.com/purplerepublic.us' target='_blank'>
                <SocialIcon className='fa fa-facebook-square i1' />
              </a>
              <a href='https://www.medium.com/the-purple-republic' target='_blank'>
                <SocialIcon className='fa fa-medium i6' />
              </a>
              <a href='https://www.youtube.com/channel/UCHDkvhWZKjA6lnX1vcGvGPw' target='_blank'>
                <SocialIcon className='fa fa-youtube-square i5' />
              </a>
              <a href='https://www.twitter.com/1purplerepublic' target='_blank'>
                <SocialIcon className='fa fa-twitter-square i2' />
              </a>
              <a href='https://www.instagram.com/purple.republic' target='_blank'>
                <SocialIcon className='fa fa-instagram i3' />
              </a>
              <a href='mailto:rise@purplerepublic.us' target='_blank'>
                <SocialIcon className='fa fa-envelope-o i7' />
              </a>
            </ReachIcons>
          </ReachUs>
          <ShopUs>
            <ShopText themeColor={themeColor}>
              shop us
            </ShopText>
            <ShopIcons>
              <a href='https://www.etsy.com/shop/purplerepublic' target='_blank'>
                <SocialIcon className='fa fa-etsy i4' />
              </a>
              <a href='https://www.redbubble.com/people/purplerepublic/works' target='_blank'>
                <img src={BASE_URL + 'redbubble.png'} className='i8' />
              </a>
            </ShopIcons>
          </ShopUs>
        </SocialNetworksRoot>

        <Finality>
          <FinalWord>
            <div>
            we're here to share the magic. because life is special. & we sometimes need reminders.
  you pick the price. profits go to projects aimed at healing the divide and promoting dialogue over dogma, creation over destruction, love over fear and division.

  purple republic is a movement of performance, politics, & play. of radical expression & rebellion.

  let's celebrate life, chase curiosities, & play with this gift of breath. WE ARE ALIVE!

  maybe free will isn't real--but at least we get to choose where to focus.
  art saves lives. our mission is to share ourselves however it comes out.

  art has societal worth. & here, being a patron means you choose the value: community meet commodity. mindful capitalism led by radical expression could save our planet.

  our dream is that one day everyone will know how perfect they already are.

  check us out: purplerepublic.us

  namaste, beautiful !
            </div>
          </FinalWord>

          <FinalFeedback themeColor={themeColor}>
            <FeedbackArea>
              <textarea defaultValue='reeeeead us, hennie!'
                ref={r => this.feedbackInput = r} />
              <SendFeedback themeColor={themeColor}>
                send
              </SendFeedback>
            </FeedbackArea>
          </FinalFeedback>
        </Finality>

        <KeepPlayingToolbar themeColor={themeColor}>
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
        </KeepPlayingToolbar>

      </Page>
    )
  }


}
