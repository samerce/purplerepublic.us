import React from 'react'
import WordsBubble from './words'

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
