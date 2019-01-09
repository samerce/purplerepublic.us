import React from 'react'
import PayPalLink from '../../components/payPalLink'

import {
  Root, SocialButtonsRoot, SocialIcon,
} from './styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {
  SRC_URL, YOUTUBE_URL, INSTAGRAM_URL, MEDIUM_URL,
} from '../../global/constants'

const ICON_URL = SRC_URL + 'icons/'

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  timelineVisible: d.get('timeline').get('pastTimelineVisible') ||
    d.get('timeline').get('futureTimelineVisible'),
}))
export default class GetSocialWithUs extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.dimension !== nextProps.dimension
  }

  render() {
    const {dimension, timelineVisible} = this.props
    const hidden = dimension || timelineVisible
    return (
      <Root id='socialButtonsRoot' className={hidden && 'hidden'}>
        <SocialButtonsRoot>
          <a href={INSTAGRAM_URL} target='_blank'
            onClick={this.onClick.bind(this, 'instagram')}>
            <SocialIcon className='fa fa-instagram i3' />
            <div className='tooltip'>instagram</div>
          </a>
          <a href='mailto:rise@purplerepublic.us' target='_blank' onClick={this.onClick.bind(this, 'email')}>
            <SocialIcon className='fa fa-envelope i4' />
            <div className='tooltip'>email</div>
          </a>
          <a href='https://www.facebook.com/purplerepublic' target='_blank' onClick={this.onClick.bind(this, 'facebook')}>
            <SocialIcon className='fa fa-facebook-square i1' />
            <div className='tooltip'>facebook</div>
          </a>
          <a href={MEDIUM_URL} target='_blank'
            onClick={this.onClick.bind(this, 'medium')}>
            <SocialIcon className='fa fa-medium i6' />
            <div className='tooltip'>medium</div>
          </a>
          <a href={YOUTUBE_URL} target='_blank'
            onClick={this.onClick.bind(this, 'youtube')}>
            <SocialIcon className='fa fa-youtube-square i5' />
            <div className='tooltip'>youtube</div>
          </a>
          <a onClick={() => this.payPalLink.click()} className='i11' onClick={this.onClick.bind(this, 'paypal')}>
            <SocialIcon className='fa fa-paypal i9' />
            <PayPalLink ref={r => this.payPalLink = r} />
            <div className='tooltip'>donate with paypal</div>
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
