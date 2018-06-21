import React from 'react'

import autobind from 'autobind-decorator'
import {openInNewTab} from '../../../utils/nav'

import {
  Description, LinkInput, LinkRoot, ChangeLinkButton,
} from './styled'

import {SRC_URL} from '../../../global/constants'

export default class BubbleWriting extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mediumLink: props.mediumLink,
      teaserText: props.teaserText,
      shouldShowLinkInput: false,
    }
  }

  render() {
    const {editing} = this.props
    const {mediumLink, teaserText, shouldShowLinkInput} = this.state

    return (
      <Description>
        <span
          contentEditable={editing}
          placeholder={teaserText}
          onBlur={this.onBlurTeaser}
          onKeyPress={this.onTeaserKeyPress}>
          {teaserText}
        </span>. . .
        {editing && !shouldShowLinkInput &&
          <ChangeLinkButton onClick={this.showLinkInput}>
            {mediumLink? 'change' : 'add'} link
          </ChangeLinkButton>
        }
        {editing && shouldShowLinkInput &&
          <LinkRoot>
            <LinkInput
              onKeyPress={this.onLinkInputKeyPress}
              onBlur={this.onBlurLink}
              defaultValue={mediumLink}
              placeholder='link here!'
            />
          </LinkRoot>
        }
      </Description>
    )
  }

  @autobind
  onLinkInputKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

  @autobind
  onTeaserKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

  @autobind
  onBlurLink({target}) {
    this.setState({
      mediumLink: target.value,
      shouldShowLinkInput: false,
    })
    this.props.onEditingChange({mediumLink: target.value})
  }

  @autobind
  onBlurTeaser({target}) {
    this.setState({teaserText: target.innerText})
    this.props.onEditingChange({teaserText: target.innerText})
  }

  @autobind
  showLinkInput() {
    this.setState({
      shouldShowLinkInput: true,
    })
  }

}

BubbleWriting.getActions = ({blogLink}) => (blogLink? [
  {
    text: 'continue reading',
    onClick: openInNewTab.bind(this, blogLink),
  }
] : [])

BubbleWriting.getButtonImageUrl = ({blogLink}) => blogLink?
  SRC_URL + `bubbles/${blogLink.split('/').pop()}.jpg` :
  ''

BubbleWriting.defaultProps = {
  teaserText: 'fill me up with a little teaser, dahling',
}
