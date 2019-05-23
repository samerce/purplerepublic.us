import React from 'react'

import {ImageBubbleButton} from './styled'
import {getButtonImageUrl} from '../../../utils/bubbleverse'

export default class ShopBubbleButton extends React.PureComponent {

  render() {
    const {onClick, nucleus, size} = this.props
    return (
      <div>
        <ImageBubbleButton
          onClick={onClick}
          size={size}
          src={getButtonImageUrl(nucleus.id)}>
        </ImageBubbleButton>
        <div className='bubbleShopText'>
          <div className='poetcardText'>poetcards<br /></div>
        </div>
      </div>
    )
  }

}
