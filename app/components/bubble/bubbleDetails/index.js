import React from 'react'
import Spinnie from '../../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, ContentRoot, Title, ActionsRoot, Action, Subtitle, VariableActionsRoot, BubbleNameButton, BubbleEditButton, BubbleDeleteButton,
  BubbleOptions, Header, Footer, Mask
} from './styled'
import {Description} from '../bubbleItems/styled'

import {getButtonImageUrl, getFacebookUrl} from '../../../utils/bubbleverse'
import {canShowEditingTools} from '../../../utils/nav'
import autobind from 'autobind-decorator'
import {BubbleButtonActions} from '../config'
import ClipboardJS from 'clipboard'
import {connect} from 'react-redux'

import {onClickBubbleAction} from '../redux/actions'

const Clipboard = new ClipboardJS('.clipboardBtn')

@connect(d => ({}), undefined, undefined, {withRef: true})
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
      setTimeout(() => this.setState({
        idCopied: false,
        bubbleOptionsVisible: false
      }), 1000)
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
    this.setState({visible: false, bubbleOptionsVisible: false})
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
      title, subtitle, idCopied, isDeleting, nucleus,
      visible, bubbleOptionsVisible,
    } = this.state
    const {
      className, editing, onEditingChange,
    } = this.props
    const {
      id,
      actions = (Math.random() <= .27)? [{
        text: 'become a patron',
        type: BubbleButtonActions.OpenLink,
        props: {
          url: 'https://www.patreon.com/expressyourmess',
        },
      }] : [],
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

        <ContentRoot editing={editing} hasActions={!!actions.length}>
          {canShowEditingTools() && !editing &&
            <BubbleOptions>
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
                onClick={this.editBubble}>
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
            {!!actions.length && this.renderVariableActions(actions)}
            {this.renderDefaultActions()}
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

    this.setState({isDeleting: true, bubbleOptionsVisible: false})
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

  @autobind
  editBubble() {
    this.setState({bubbleOptionsVisible: false})
    this.props.onEdit()
  }

  renderDefaultActions() {
    const {
      nextBubbleId,
    } = this.state.nucleus

    return (
      <ActionsRoot>
        <Action onClick={this.onClickClose}>
          <div>close</div>
        </Action>
        {nextBubbleId &&
          <Action onClick={this.onClickJourneyButton}>
            <div>continue journey...</div>
            <i className='fa fa-caret-right' />
          </Action>
        }
      </ActionsRoot>
    )
  }

  renderVariableActions(actions) {
    return (
      <VariableActionsRoot>
        {actions.reverse().map(a => (
          <Action
            key={a.text}
            className={a.className}
            onClick={() => this.onClickAction(a)}>
            <div>{a.text}</div>
          </Action>
        ))}
      </VariableActionsRoot>
    )
  }

  @autobind
  onClickAction(action) {
    BubbleButtonActions[action.type](action.props)
    this.props.dispatch(onClickBubbleAction(this.state.nucleus.id, action))
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
