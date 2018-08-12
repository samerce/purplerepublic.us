import React from 'react'
import Spinnie from '../../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, ContentRoot, Title, ActionsRoot, Action, Subtitle, JourneyButtonRoot, BubbleNameButton, BubbleEditButton, BubbleDeleteButton,
  BubbleOptions, Header, Footer, Mask
} from './styled'
import {Description} from '../bubbleItems/styled'

import {getButtonImageUrl, getFacebookUrl} from '../../../utils/bubbleverse'
import {canShowEditingTools} from '../../../utils/nav'
import autobind from 'autobind-decorator'
import {BubbleButtonActions} from '../config'
import ClipboardJS from 'clipboard'

const Clipboard = new ClipboardJS('.clipboardBtn')

export default class BubbleDetails extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      actionClicked: false,
      isDeleting: false,
      title: props.nucleus && props.nucleus.title,
      subtitle: props.nucleus && props.nucleus.subtitle,
      idCopied: false,
      nucleus: {},
    }

    Clipboard.on('success', () => {
      this.setState({idCopied: true})
      setTimeout(() => this.setState({idCopied: false}), 1000)
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    const newState = {}

    // if (this.props.nucleus.title !== nextProps.nucleus.title) {
    //   newState.title = nextProps.nucleus.title
    // }
    // if (this.props.nucleus.subtitle !== nextProps.nucleus.subtitle) {
    //   newState.subtitle = nextProps.nucleus.subtitle
    // }
    // if (this.state.nucleus.nextBubbleId !== nextState.nucleus.nextBubbleId) {
    //   newState.bubbleOptionsStyle = getBubbleOptionsStyle(nextProps.nucleus.nextBubbleId)
    // }

    // Object.keys(newState).length > 0 && this.setState(newState)
  }

  @autobind
  open(nucleus) {
    clearTimeout(this.closeTimer)
    this.setState({
      nucleus: {
        ...nucleus,
      },
      visible: true,
      title: nucleus.title,
      subtitle: nucleus.subtitle,
    })
  }

  @autobind
  close() {
    this.setState({visible: false})
    this.closeTimer = setTimeout(() => this.setState({nucleus: {}}), 700)
    const {bubbleComponentRef} = this
    bubbleComponentRef && bubbleComponentRef.onClose &&
      bubbleComponentRef.onClose()
  }

  @autobind
  publish() {
    if (this.bubbleComponentRef) {
      const {publish} = this.bubbleComponentRef
      if (publish) return publish()
    }
    return new Promise(resolve => resolve())
  }

  render() {
    const {
      title, subtitle, bubbleOptionsStyle, idCopied, isDeleting, nucleus,
      visible,
    } = this.state
    const {
      className, editing, onEditingChange, onEdit,
    } = this.props
    const {
      id,
      nextBubbleId,
      Component: BubbleComponent,
    } = nucleus

    return (
      <Root visible={visible} editing={editing}>
        {visible &&
          <Helmet>
            <meta property='og:type' content='article' />
            <meta property='og:title' content={title} />
            <meta property='og:image' content={getButtonImageUrl(id)} />
            <meta property='og:image:secure_url' content={getButtonImageUrl(id)} />
            <meta property='og:url' content={getFacebookUrl(id)} />
            <meta property='og:description' content={subtitle} />
          </Helmet>
        }

        <Mask
          onClick={this.onClickClose}
          show={visible}
          className='bubbleMask'
        />

        <ContentRoot>
          <Header>
            <Subtitle
              editing={editing}
              onBlur={e => onEditingChange({subtitle: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({subtitle: e.target.value})}
              value={subtitle}
            />
            <Title
              editing={editing}
              onBlur={e => onEditingChange({title: e.target.value})}
              onKeyPress={this.onInputKeyPress}
              onChange={e => this.setState({title: e.target.value})}
              value={title}
            />
            <hr />
          </Header>

          {BubbleComponent &&
            <BubbleComponent
              nucleus={nucleus}
              editing={editing}
              ref={r => this.bubbleComponentRef = r}
            />
          }

          <Footer>
            {nextBubbleId && this.renderJourneyButton()}
            {this.renderActions()}
            {canShowEditingTools() && !editing &&
              <BubbleOptions style={bubbleOptionsStyle}>
                <BubbleNameButton
                  className='clipboardBtn'>
                  <div id='bubbleId'>{id}</div>
                  <button
                    className='clipboardBtn'
                    data-clipboard-text={id}
                  />
                  <div className={`copiedMsg ${idCopied && 'show'}`}>
                    copied!
                  </div>
                </BubbleNameButton>
                <BubbleEditButton onClick={onEdit}>
                  edit bubble
                </BubbleEditButton>
                <BubbleDeleteButton
                  disabled={isDeleting}
                  onClick={this.deleteBubble}>
                  <div hidden={isDeleting}>delete bubble</div>
                  <Spinnie show={isDeleting} />
                </BubbleDeleteButton>
              </BubbleOptions>
            }
          </Footer>
        </ContentRoot>
      </Root>
    )
  }

  @autobind
  deleteBubble() {
    if (this.state.isDeleting) return
    if (!confirm(
      'the bubble will be gone forever!\n\n click OK to destroy it. D:'
    )) return

    this.setState({isDeleting: true})
    fetch('/bubbles.delete', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bubbleId: this.state.nucleus.id,
      }),
    }).then(() => window.location.reload())
  }

  renderActions() {
    const {
      actions = [],
    } = this.state.nucleus

    return (
      <ActionsRoot>
        <Action onClick={this.onClickClose}>
          <div>close</div>
        </Action>
        {actions.length > 1 &&
          <Action
            className={actions[1].className}
            onClick={() => this.onClickAction(actions[1])}>
            <div>{actions[1].text}</div>
          </Action>
        }
        {actions.length > 0 && !this.state.actionClicked &&
          <Action
            className={actions[0].className}
            onClick={() => this.onClickAction(actions[0])}>
            <div>{actions[0].text || 'explore'}</div>
          </Action>
        }
      </ActionsRoot>
    )
  }

  renderJourneyButton() {
    return (
      <JourneyButtonRoot onClick={this.onClickJourneyButton}>
        <div>continue journey...</div>
        <i className='fa fa-caret-right' />
      </JourneyButtonRoot>
    )
  }

  @autobind
  onClickAction(action) {
    BubbleButtonActions[action.type](action.props)
  }

  @autobind
  onClickJourneyButton() {
    const {editing, onNext} = this.props
    const {nucleus} = this.state
    if (!this.editing) {
      ga('send', 'event', 'bubbles', 'continue journey clicked', nucleus.id)
      onNext(nucleus.nextBubbleId)
    }
  }

  @autobind
  onClickClose() {
    this.props.onClose && this.props.onClose()
    this.close()
  }

  @autobind
  onInputKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

}

BubbleDetails.defaultProps = {
  actions: [],
}
