import React from 'react'
import {findDOMNode} from 'react-dom'
import Spinnie from '../../spinnie'

import {
  Root, ContentRoot, ActionsRoot, Action, BubbleEditButton, BubbleDeleteButton, NavButton, ComponentRoot,
  BubbleOptions, Header, Footer, Mask
} from './styled'

import {canShowEditingTools} from '../../../utils/nav'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import Touch from 'zingtouch'

import {onClickBubbleAction} from '../redux/actions'
import {
  goToNextBubble, goToPrevBubble, updateBuilderNucleus, openBubbleBuilder
} from '../../bubbleverse/actions'

import {BubbleComponents} from '../config'
import {BubbleButtonActions} from '../config'

@connect(d => ({
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  editing: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
export default class BubbleDetails extends React.PureComponent {

  constructor(props) {
    super(props)

    this.swipeGesture = new Touch.Swipe({
      escapeVelocity: .1,
    })
    this.state = {
      isDeleting: false,
      bubbleOptionsVisible: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.activeBubble) {
      this.setState({bubbleOptionsVisible: false})
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeBubble) {
      this.contentRootDom = findDOMNode(this.contentRoot)
      this.gestureHandler = Touch.Region(this.contentRootDom, false, false)
      this.gestureHandler.bind(this.contentRootDom, this.swipeGesture, this.onSwipe)
    } else if (this.contentRootDom) {
      this.gestureHandler.unbind(this.contentRootDom)
    }

    if (this.props.activeBubble !== prevProps.activeBubble && this.contentRoot) {
      findDOMNode(this.contentRoot).scrollTop = 0
    }
  }

  render() {
    const {
      isDeleting, bubbleOptionsVisible,
    } = this.state
    const {
      editing, activeBubble,
    } = this.props
    if (!activeBubble) return null

    const {actions = []} = activeBubble
    let BubbleComponent = BubbleComponents.Generic
    if (activeBubble.componentName) {
      BubbleComponent = BubbleComponents[activeBubble.componentName]
    }

    return (
      <Root className={editing && 'editing'}>
        <ContentRoot innerRef={r => this.contentRoot = r}>
          {this.renderEditMenuButton()}

          <ComponentRoot>
            <BubbleComponent nucleus={activeBubble} />
          </ComponentRoot>

          <Footer>
            {!!actions.length && this.renderActions(actions)}
          </Footer>
        </ContentRoot>
      </Root>
    )
  }

  renderEditMenuButton() {
    if (!canShowEditingTools() || this.props.editing) return ''

    const {
      bubbleOptionsVisible, isDeleting
    } = this.state
    return (
      <BubbleOptions className={bubbleOptionsVisible && 'visible'}>
        <i
          onClick={() => this.setState({
            bubbleOptionsVisible: !bubbleOptionsVisible
          })}
          className='fa fa-pencil bubbleEditButton'
        />
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
    )
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
  onClickAction(action) {
    BubbleButtonActions[action.type](action.props)
    this.props.dispatch(
      onClickBubbleAction(this.state.activeBubble.id, action)
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
        bubbleId: this.props.activeBubble.id,
      }),
    }).then(() => window.location.reload())
  }

  @autobind
  editBubble() {
    this.setState({bubbleOptionsVisible: false})
    this.props.dispatch(openBubbleBuilder(true))
  }

  @autobind
  onSwipe(e) {
    if (!e.detail.data.length) return

    const angle = e.detail.data[0].currentDirection
    if (angle < 45 || angle > 305) {
      this.onClickPrev()
    } if (angle > 135 && angle < 235) {
      this.onClickNext()
    }
  }

}

BubbleDetails.defaultProps = {
  actions: [],
}
