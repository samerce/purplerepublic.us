import React from 'react'

import {ImageBubbleButton, Icon} from './styled'
import {connect} from 'react-redux'

@connect(d => ({
  activePostIndex: d.get('instagramBubble').get('activePostIndex'),
  posts: d.get('instagramBubble').get('posts'),
}))
export default class InstagramBubbleButton extends React.PureComponent {

  render() {
    const {
      onClick, nucleus, activePostIndex, posts, size,
    } = this.props
    return (
      <ImageBubbleButton
        onClick={onClick}
        size={size}
        src={posts.length > 0 &&
          posts[activePostIndex].image
        }>
        <Icon className={'fa fa-instagram'} />
      </ImageBubbleButton>
    )
  }

}
