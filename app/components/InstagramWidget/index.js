import React from 'react'
import TimedTextBlurb from '../timedTextBlurb'
import {ImageBubbleButton} from '../bubble/bubbleButton/styled'

import {
  InstagramRoot as Root, BeggingButton,
} from '../bubble/hero/styled'

import {
  setActiveInstagramPostIndex, setInstagramPosts
} from '../bubble/redux/actions'
import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

@connect(d => ({
  activePostIndex: d.get('instagramBubble').get('activePostIndex'),
  posts: d.get('instagramBubble').get('posts'),
}))
export default class InstagramHero extends React.PureComponent {

  componentDidMount() {
    fetch('/instagram.posts.recent')
    .then((responseRaw) => responseRaw.json().then(response => {
      this.props.dispatch(setInstagramPosts(response.data.map(p => ({
        image: p.images.low_resolution.url,
        text: p.caption? p.caption.text : '#expressyourmess',
      }))))
    }))
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.posts !== this.props.posts
  // }

  render() {
    const {
      activePostIndex, posts,
    } = this.props
    return (
      <Root>
        <ImageBubbleButton
          size={200}
          src={posts.length > 0 &&
            posts[activePostIndex].image
          }>
        </ImageBubbleButton>
        <TimedTextBlurb
          className='scrollable leftSide'
          items={this.props.posts}
          duration={10000}
          onUpdateIndex={this.onUpdateIndex}
        />
        <BeggingButton onClick={this.onClickButton}>
          <div>view instagram</div>
        </BeggingButton>
      </Root>
    )
  }

  @autobind
  onUpdateIndex(newIndex) {
    this.props.dispatch(setActiveInstagramPostIndex(newIndex))
  }

  @autobind
  onClickButton() {
    openInNewTab('https://www.instagram.com/expressyourmess')
  }

}
