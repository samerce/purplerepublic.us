import React from 'react'
import TimedTextBlurb from '../timedTextBlurb'
import {ImageBubbleButton} from '../bubble/bubbleButton/styled'

import {
  Root, Image, CaptionRoot, ImageHeight, Button, Row, Gap,
} from './styled'

import {
  setActiveInstagramPostIndex, setInstagramPosts
} from '../bubble/redux/actions'
import {openInNewTab} from '../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {INSTAGRAM_URL} from '../../global/constants'

@connect(d => ({
  activePostIndex: d.get('instagramBubble').get('activePostIndex'),
  posts: d.get('instagramBubble').get('posts'),
}))
export default class InstagramHero extends React.PureComponent {

  componentDidMount() {
    fetch('/instagram.posts.recent')
    .then((responseRaw) => responseRaw.json().then(response => {
      this.props.dispatch(setInstagramPosts(response.data.map(p => ({
        image: p.images.low_resolution,
        text: p.caption? p.caption.text : '#expressyourmess',
      }))))
    }))
  }

  render() {
    const {
      activePostIndex, posts,
    } = this.props
    const {image} = posts.length > 0 ? posts[activePostIndex] : {}
    return (
      <Root>
        <Row>
          <Image
            onClick={this.openInstagram}
            height={image? (image.height / image.width) * ImageHeight : 0}
            src={image? image.url : ''} />

          <Gap />
          <CaptionRoot>
            <i className='fa fa-instagram' />
            <TimedTextBlurb
              className='scrollable leftSide'
              items={this.props.posts}
              duration={10000}
              onUpdateIndex={this.onUpdateIndex}
            />
          </CaptionRoot>
        </Row>

        <Button onClick={this.openInstagram}>
          <div>view instagram</div>
        </Button>
      </Root>
    )
  }

  @autobind
  onUpdateIndex(newIndex) {
    this.props.dispatch(setActiveInstagramPostIndex(newIndex))
  }

  @autobind
  openInstagram() {
    ga('send', 'event', {
      eventCategory: 'corkboard',
      eventAction: 'instagram clicked',
    })
    openInNewTab(INSTAGRAM_URL)
  }

}
