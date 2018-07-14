import React from 'react'
import WordsBubble from './words'

import {injectGlobal} from 'styled-components'
import {ImageBubbleButton, Icon} from '../bubbleButton/styled'

import {SRC_URL} from '../../../global/constants'

export default class ShopBubble extends React.PureComponent {

  static renderButtonContent(nucleus) {
    return (
      <div>
        <ImageBubbleButton
          size={nucleus.size}
          src={SRC_URL + 'commons/shop-art.jpg'}>
          <Icon className={'fa fa-shopping-bag'} />
        </ImageBubbleButton>
        <div className='bubbleShopText'>
          <div className='shopText'>SHOP<br /></div>
          <span>with purpose</span>
        </div>
      </div>
    )
  }

  render() {
    return <WordsBubble {...this.props} />
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

    .shopText {
      line-height: 40px;
    }
  }
`
