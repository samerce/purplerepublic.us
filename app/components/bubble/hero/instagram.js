import React from 'react'
import TimedTextBlurb from '../../timedTextBlurb'

import {
  InstagramRoot as Root, BeggingButton,
} from './styled'

import {
  setActiveInstagramPostIndex, setInstagramPosts
} from '../redux/actions'
import {openInNewTab} from '../../../utils/nav'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

@connect(d => ({
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

  render() {
    return (
      <Root>
        <TimedTextBlurb
          className='scrollable leftSide'
          items={this.props.posts}
          duration={8000}
          onUpdateIndex={this.onUpdateIndex}
        />
        <BeggingButton onClick={this.onClickButton}>
          <div>view on instagram</div>
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
