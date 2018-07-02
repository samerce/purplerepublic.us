import React from 'react'

import {injectGlobal} from 'styled-components'
import {BubbleButtonImage} from '../bubbleButton/styled'
import {Description} from './styled'

import {SRC_URL} from '../../../global/constants'

export default class ShopBubble extends React.Component {

  static renderButtonContent(nucleus) {
    return (
      <div>
        <BubbleButtonImage
          size={nucleus.size}
          src={SRC_URL + 'commons/shop-art.jpg'} />
        <div className='bubbleShopText'>
          <div style={{lineHeight: '40px'}}>SHOP<br /></div>
          <span>with purpose</span>
        </div>
      </div>
    )
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Description>
        welcome to purple republic.<br /><br />
        we're here to think, make art and celebrate living. to simultaneously radically accept and critically question. to rebel against our static selves and deeply-held systems of belief.<br /><br />

        through the written word, video, visual art, events, theatre, performance, drag and discussion we aim to do our part for the revolution. <br /><br />

        click below to shop our art and spread the love!
      </Description>
    )
  }

}

injectGlobal`
  .bubbleShopText {
    transition: all .01s linear .2s;
    pointer-events: none;
    font-family: annie use your telescope;
    font-size: 62px;
    text-align: center;
    position: absolute;
    width: 100%;
    color: white;
    top: 0;
    user-select: none;
    text-shadow: 1px 1px rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    .focused & {
      transition-delay: 0s;
      opacity: 0;
    }

    span {
      font-size: 22px;
    }
  }
`
