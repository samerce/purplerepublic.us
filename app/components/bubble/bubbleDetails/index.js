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

  @autobind
  open(nucleus, callback) {
    clearTimeout(this.closeTimer)
    this.setState({
      nucleus: {
        ...nucleus,
      },
      visible: true,
      title: nucleus.title,
      subtitle: nucleus.subtitle,
    }, callback)
  }

  @autobind
  edit(nucleus) {
    this.open(nucleus, () => {
      const {bubbleComponentRef} = this
      bubbleComponentRef.edit && bubbleComponentRef.edit()
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
  editNucleus(nucleus) {
    this.setState({nucleus})
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
      visible, bubbleOptionsVisible,
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

        <ContentRoot editing={editing}>
          {canShowEditingTools() && !editing &&
            <BubbleOptions style={bubbleOptionsStyle}>
              <i
                onClick={() => this.setState({
                  bubbleOptionsVisible: !bubbleOptionsVisible
                })}
                className='fa fa-pencil bubbleEditButton'
              />
              <BubbleNameButton
                visible={bubbleOptionsVisible}
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
              <BubbleEditButton
                visible={bubbleOptionsVisible}
                onClick={onEdit}>
                edit
              </BubbleEditButton>
              <BubbleDeleteButton
                visible={bubbleOptionsVisible}
                disabled={isDeleting}
                onClick={this.deleteBubble}>
                <div hidden={isDeleting}>delete</div>
                <Spinnie show={isDeleting} />
              </BubbleDeleteButton>
            </BubbleOptions>
          }

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
              onEditingChange={onEditingChange}
              ref={r => this.bubbleComponentRef = r}
            />
          }

          <Footer>
            {nextBubbleId && this.renderJourneyButton()}
            {this.renderActions()}
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
    if (!editing) {
      ga('send', 'event', 'bubbles', 'continue journey clicked', nucleus.id)
      onNext(nucleus.nextBubbleId)
    }
  }

  @autobind
  onClickClose() {
    const {editing, onClose} = this.props
    if (!editing) {
      onClose && onClose()
      this.close()
    }
  }

  @autobind
  onInputKeyPress(e) {
    if (e.key === 'Enter') e.target.blur(e)
  }

}

BubbleDetails.defaultProps = {
  actions: [],
}
