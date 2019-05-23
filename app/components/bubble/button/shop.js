import React from 'react'

import {ImageBubbleButton} from './styled'

import {SRC_URL} from '../../../global/constants'

export default class ShopBubbleButton extends React.PureComponent {

  render() {
    const {onClick, nucleus, size} = this.props
    return (
      <div>
        <ImageBubbleButton
          onClick={onClick}
          size={size}
          src={SRC_URL + 'commons/shop-art.jpg'}>
        </ImageBubbleButton>
        <div className='bubbleShopText'>
          <div className='shopText'>SHOP<br /></div>
          <span>with purpose</span>
        </div>
      </div>
    )
  }

}
