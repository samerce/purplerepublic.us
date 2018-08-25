import React from 'react'
import PayPalLink from '../../components/payPalLink'

import {
  Root, SocialButtonsRoot, SocialIcon,
} from './styled'

import autobind from 'autobind-decorator'

import {SRC_URL} from '../../global/constants'

const ICON_URL = SRC_URL + 'icons/'

export default class GetSocialWithUs extends React.Component {

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Root id='socialButtonsRoot'>
        <SocialButtonsRoot>
          <a href='https://www.facebook.com/purplerepublic' target='_blank' onClick={this.onClick.bind(this, 'facebook')}>
            <SocialIcon className='fa fa-facebook-square i1' />
            <div className='tooltip'>facebook</div>
          </a>
          <a href='https://www.medium.com/the-purple-republic' target='_blank' onClick={this.onClick.bind(this, 'medium')}>
            <SocialIcon className='fa fa-medium i6' />
            <div className='tooltip'>medium</div>
          </a>
          <a href='https://www.youtube.com/channel/UCne9Pv9CARxNz8rNMaDm7Dw' target='_blank' onClick={this.onClick.bind(this, 'youtube')}>
            <SocialIcon className='fa fa-youtube-square i5' />
            <div className='tooltip'>youtube</div>
          </a>
          <a onClick={() => this.payPalLink.click()} className='i11' onClick={this.onClick.bind(this, 'paypal')}>
            <SocialIcon className='fa fa-paypal i9' />
            <PayPalLink ref={r => this.payPalLink = r} />
            <div className='tooltip'>donate with paypal</div>
          </a>
          <a href='https://www.instagram.com/expressyourmess' target='_blank' onClick={this.onClick.bind(this, 'instagram')}>
            <SocialIcon className='fa fa-instagram i3' />
            <div className='tooltip'>instagram</div>
          </a>
          <a href='mailto:rise@purplerepublic.us' target='_blank' onClick={this.onClick.bind(this, 'email')}>
            <SocialIcon className='fa fa-envelope-o i4' />
            <div className='tooltip'>email</div>
          </a>
        </SocialButtonsRoot>
      </Root>
    )
  }

  @autobind
  onClick(type) {
    ga('send', 'event', {
      eventCategory: 'social',
      eventAction: 'sidebar clicked',
      eventLabel: type,
    })
  }

}
