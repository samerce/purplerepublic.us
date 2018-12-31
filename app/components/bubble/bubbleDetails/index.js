import React from 'react'
import Spinnie from '../../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, ContentRoot, Title, ActionsRoot, Action, Subtitle, VariableActionsRoot, BubbleNameButton, BubbleEditButton, BubbleDeleteButton, NavButton, ComponentRoot,
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
import {
  goToNextBubble, goToPrevBubble
} from '../../bubbleverse/actions'

const Clipboard = new ClipboardJS('.clipboardBtn')

@connect(d => ({
  activeBubble: d.get('bubbleverse').get('activeBubble'),
}), undefined, undefined, {withRef: true})
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

  componentWillReceiveProps(nextProps) {
    const {activeBubble} = this.props
    const {activeBubble: nextActiveBubble} = nextProps
    if (nextActiveBubble) {
      if (!activeBubble || activeBubble.id !== nextActiveBubble.id) {
        this.open(nextActiveBubble)
      }
    } else if (activeBubble) {
      this.close()
    }
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

        <NavButton onClick={this.onClickPrev}>
          <i className='fa fa-chevron-circle-left' />
        </NavButton>

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

          <ComponentRoot>
            {BubbleComponent &&
              <BubbleComponent
                nucleus={nucleus}
                editing={editing}
                onEditingChange={onEditingChange}
                ref={r => this.bubbleComponentRef = r}
              />
            }
          </ComponentRoot>


          <Footer>
            {!!actions.length && this.renderVariableActions(actions)}
          </Footer>
        </ContentRoot>

        <NavButton onClick={this.onClickNext} className='right'>
          <i className='fa fa-chevron-circle-right' />
        </NavButton>
      </Root>
    )
  }

  @autobind
  onClickPrev() {
    this.props.dispatch(goToPrevBubble())
  }

  @autobind
  onClickNext() {
    this.props.dispatch(goToNextBubble())
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
    const {editing} = this.props
    if (!editing) {
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
