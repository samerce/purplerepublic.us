import React from 'react'
import Spinnie from '../../spinnie'
import {Helmet} from 'react-helmet'

import {
  Root, ContentRoot, Title, ActionsRoot, Action, Subtitle, BubbleNameButton, BubbleEditButton, BubbleDeleteButton, NavButton, ComponentRoot,
  BubbleOptions, Header, Footer, Mask
} from './styled'
import {Description} from '../bubbleItems/styled'

import {getButtonImageUrl, getFacebookUrl} from '../../../utils/bubbleverse'
import {canShowEditingTools} from '../../../utils/nav'
import autobind from 'autobind-decorator'
import {BubbleButtonActions} from '../config'
import ClipboardJS from 'clipboard'
import {connect} from 'react-redux'
import withTransitions from '../../hocs/withTransitions'

import {onClickBubbleAction} from '../redux/actions'
import {
  goToNextBubble, goToPrevBubble, updateBuilderNucleus, openBubbleBuilder
} from '../../bubbleverse/actions'

import {BubbleComponents} from '../config'

const Clipboard = new ClipboardJS('.clipboardBtn')

@connect(d => ({
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  isBubbleBuilderOpen: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}), undefined, undefined, {withRef: true})
export default class BubbleDetails extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      actionClicked: false,
      isDeleting: false,
      title: props.activeBubble && props.activeBubble.title,
      subtitle: props.activeBubble && props.activeBubble.subtitle,
      idCopied: false,
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
    this.setState({
      visible: true,
      title: nucleus.title,
      subtitle: nucleus.subtitle,
    }, callback)
  }

  @autobind
  close() {
    // this.setState({visible: false, bubbleOptionsVisible: false})
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
      title, subtitle, idCopied, isDeleting,
      bubbleOptionsVisible, visible,
    } = this.state
    const {
      isBubbleBuilderOpen, onEditingChange, activeBubble,
    } = this.props
    const {
      id,
      actions = [],
      nextBubbleId,
      type,
    } = activeBubble || {}
    const BubbleComponent = BubbleComponents[type]

    return (
      <Root className={isBubbleBuilderOpen && 'editing'}>
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

        <ContentRoot editing={isBubbleBuilderOpen} hasActions={!!actions.length}>
          {canShowEditingTools() && !isBubbleBuilderOpen &&
            <BubbleOptions className={bubbleOptionsVisible && 'visible'}>
              <i
                onClick={() => this.setState({
                  bubbleOptionsVisible: !bubbleOptionsVisible
                })}
                className='fa fa-pencil bubbleEditButton'
              />
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
              <BubbleEditButton
                onClick={this.editBubble}>
                edit
              </BubbleEditButton>
              <BubbleDeleteButton
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
                nucleus={activeBubble}
                editing={isBubbleBuilderOpen}
                onEditingChange={this.onEditingChange}
                ref={r => this.bubbleComponentRef = r}
              />
            }
          </ComponentRoot>


          <Footer>
            {!!actions.length && this.renderActions(actions)}
          </Footer>
        </ContentRoot>

        <NavButton onClick={this.onClickNext} className='right'>
          <i className='fa fa-chevron-circle-right' />
        </NavButton>
      </Root>
    )
  }

  @autobind
  onEditingChange(nucleus) {
    this.props.dispatch(updateBuilderNucleus(nucleus))
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
        bubbleId: this.props.activeBubble.id,
      }),
    }).then(() => window.location.reload())
  }

  @autobind
  editBubble() {
    this.setState({bubbleOptionsVisible: false})
    this.props.dispatch(openBubbleBuilder(true))
  }

  renderActions(actions) {
    return (
      <ActionsRoot>
        {actions.reverse().map(a => (
          <Action
            key={a.text}
            className={a.className}
            onClick={() => this.onClickAction(a)}>
            <div>{a.text}</div>
          </Action>
        ))}
      </ActionsRoot>
    )
  }

  @autobind
  onClickAction(action) {
    BubbleButtonActions[action.type](action.props)
    this.props.dispatch(onClickBubbleAction(this.state.activeBubble.id, action))
  }

  @autobind
  onClickJourneyButton() {
    const {isBubbleBuilderOpen, onNext, activeBubble} = this.props
    if (!isBubbleBuilderOpen) {
      ga('send', 'event', 'bubbles', 'continue journey clicked', activeBubble.id)
      onNext(activeBubble.nextBubbleId)
    }
  }

  @autobind
  onClickClose() {
    const {isBubbleBuilderOpen} = this.props
    if (!isBubbleBuilderOpen) {
      this.close()
    }
  }

}

BubbleDetails.defaultProps = {
  actions: [],
}
