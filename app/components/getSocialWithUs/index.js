import React from 'react'
import PayPalLink from '../../components/payPalLink'

import {
  Root, SocialButtonsRoot, SocialIcon,
} from './styled'

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
          <a href='https://www.facebook.com/purplerepublic' target='_blank'>
            <SocialIcon className='fa fa-facebook-square i1' />
            <div className='tooltip'>facebook</div>
          </a>
          <a href='https://www.medium.com/the-purple-republic' target='_blank'>
            <SocialIcon className='fa fa-medium i6' />
            <div className='tooltip'>medium</div>
          </a>
          <a href='https://www.youtube.com/channel/UCne9Pv9CARxNz8rNMaDm7Dw' target='_blank'>
            <SocialIcon className='fa fa-youtube-square i5' />
            <div className='tooltip'>youtube</div>
          </a>
          <a href='https://www.etsy.com/shop/purplerepublic' target='_blank'>
            <SocialIcon className='fa fa-etsy i4' />
            <div className='tooltip'>etsy</div>
          </a>
          <a href='https://www.redbubble.com/people/purplerepublic/portfolio' target='_blank' className='i8'>
            <object data={ICON_URL + 'redbubble.svg'} type='image/svg+xml' />
            <div className='tooltip'>red bubble</div>
          </a>
          <a href='https://www.twitter.com/1purplerepublic' target='_blank'>
            <SocialIcon className='fa fa-twitter-square i2' />
            <div className='tooltip'>twitter</div>
          </a>
          <a href='https://www.instagram.com/expressyourmess' target='_blank'>
            <SocialIcon className='fa fa-instagram i3' />
            <div className='tooltip'>instagram</div>
          </a>
          <a href='mailto:rise@purplerepublic.us' target='_blank'>
            <SocialIcon className='fa fa-envelope-o i4' />
            <div className='tooltip'>email</div>
          </a>
          <a href='https://www.patreon.com/expressyourmess' target='_blank' className='i10'>
            <object data={ICON_URL + 'patreon.svg'} type='image/svg+xml' />
            <div className='tooltip'>donate with patreon</div>
          </a>
          <a onClick={() => this.payPalLink.click()} className='i11'>
            <SocialIcon className='fa fa-paypal i9' />
            <PayPalLink ref={r => this.payPalLink = r} />
            <div className='tooltip'>donate with paypal</div>
          </a>
        </SocialButtonsRoot>
      </Root>
    )
  }

}
