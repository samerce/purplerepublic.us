import React from 'react'

import {ImageBubbleButton, Icon} from './styled'

import {SRC_URL} from '../../../global/constants'

export default class ShopBubbleButton extends React.PureComponent {

  render() {
    const {onClick, nucleus} = this.props
    return (
      <div>
        <ImageBubbleButton
          onClick={onClick}
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

}
