import React from 'react'
import styled, {injectGlobal} from 'styled-components'

import {openInNewTab} from '../../../utils/nav'

import {BubbleButtonImage} from '../bubbleButton/styled'
import {SRC_URL} from '../../../global/constants'


module.exports = {
  className: 'bubbleButton-shop-art',
  title: 'isness with purpose',
  subtitle: 'vive la revolution',
  renderButtonContent,
  renderDescription,
  actions: [{
    text: 'shop art',
    onClick: () => openInNewTab('https://etsy.com/shop/purplerepublic')
  }],
  size: 'medium',
}

function renderButtonContent() {
  return (
    <div>
      <BubbleButtonImage src={SRC_URL + 'commons/shop-art.jpg'} />
      <div style={shopStyle} className='bubbleShopText'>
        <div style={{lineHeight: '40px'}}>SHOP<br /></div>
        <span>with purpose</span>
      </div>
    </div>
  )
}

function renderDescription() {
  return (
    <div>
      welcome to purple republic.<br /><br />
      we're here to think, make art and celebrate living. to simultaneously radically accept and critically question. to rebel against our static selves and deeply-held systems of belief.<br /><br />

      through the written word, video, visual art, events, theatre, performance, drag and discussion we aim to do our part for the revolution. <br /><br />

      click below to shop our art and spread the love!
    </div>
  )
}

var shopStyle = {
  fontFamily: 'annie use your telescope',
  fontSize: 62,
  textAlign: 'center',
  position: 'absolute',
  width: '100%',
  color: 'white',
  top: 0,
  userSelect: 'none',
  textShadow: '1px 1px rgba(0,0,0,.3)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
}

injectGlobal`
  .bubbleShopText {
    transition-delay: .2s;
    text-shadow: 2px 2px black;

    .focused & {
      transition-delay: 0s;
      display: none;
    }

    span {
      font-size: 22px;
    }
  }
`
