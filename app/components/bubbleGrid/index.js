import React from 'react'
import BubbleButton from '../bubble/bubbleButton'
import BubbleButtonBuilder from '../bubble/bubbleButton/builder'
import BubbleEditingPanel from '../bubble/bubbleBuilder'
import {BubbleArrangeButton} from '../bubble/bubbleBuilderButton'
import Spinnie from '../spinnie'

import {
  Root, BubbleGridItem, ArrangeButton, ArrangeIcon, ShowAllButton,
  ScrollContainer, BubbleGridAddItem,
} from './styled'
import {MaskAbsoluteFillParent} from '../../global/styled'

import {findDOMNode} from 'react-dom'
import {makeEnum} from '../../utils/lang'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {cx} from '../../utils/style'
import {
  toggleFullscreenBubbleGrid, setBubbles
} from '../bubbleverse/actions'
import {canShowEditingTools} from '../../utils/nav'

const Mode = makeEnum([
  'show',
  'arrange',
])

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  visibleBubbles: d.get('bubbleverse').get('visibleBubbles'),
  bubbles: d.get('bubbleverse').get('bubbles'),
  isBubbleGridFullscreen: d.get('bubbleverse').get('isBubbleGridFullscreen'),
  isPoetcardCheckoutOpen: d.get('bubbles').get('isPoetcardCheckoutOpen'),
  isBubbleBuilderOpen: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
export default class BubbleGrid extends React.PureComponent {

  constructor(props) {
    super(props)
    this.bubbleGridItems = {}
    this.state = {
      mode: Mode.show,
      arrangeSourceIndex: null,
      isSavingArrangement: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  componentDidUpdate(prevProps) {
    const {activeBubble, isBubbleBuilderOpen} = this.props
    if ((!isBubbleBuilderOpen && activeBubble && activeBubble !== prevProps.activeBubble) ||
    (!isBubbleBuilderOpen && prevProps.isBubbleBuilderOpen)) {
      const bubbleGridItem = this.bubbleGridItems[activeBubble.id]
      bubbleGridItem && findDOMNode(bubbleGridItem).scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
      })
    }
  }

  render() {
    const {
      dimension, visibleBubbles,
      isBubbleGridFullscreen, isPoetcardCheckoutOpen, isBubbleBuilderOpen,
    } = this.props
    const {
      mode, arrangeSourceIndex, isSavingArrangement
    } = this.state

    return (
      <Root
        id='bubbleGrid'
        className={cx({
          showAll: isBubbleGridFullscreen,
          hidden: isPoetcardCheckoutOpen,
        })}>
        <ScrollContainer>
          <BubbleGridItem className='gapItem' />

          {canShowEditingTools() &&
            <BubbleGridAddItem>
              <BubbleButtonBuilder />
            </BubbleGridAddItem>
          }

          {!isBubbleBuilderOpen && visibleBubbles.map((bubble, index) => (
            <BubbleGridItem
              ref={r => this.bubbleGridItems[bubble.id] = r}
              className={this.getBubbleGridItemClasses(bubble)}
              key={bubble.id}
              size={bubble.size}>

              {mode === Mode.arrange &&
                <ArrangeButton onClick={() => this.onClickArrangeButton(bubble)}>
                  <ArrangeIcon className={`fa
                    ${arrangeSourceIndex? 'fa-map-pin' : 'fa-bullseye'}`
                  } />
                </ArrangeButton>
              }

              <BubbleButton
                disabled={mode === Mode.arrange}
                nucleus={bubble}
              />
            </BubbleGridItem>
          ))}

          <BubbleGridItem className='gapItem' />
        </ScrollContainer>

        <BubbleEditingPanel />

        {!isBubbleBuilderOpen &&
          <ShowAllButton onClick={this.onClickShowAll}>
            <div>
              {isBubbleGridFullscreen? 'hide all' : 'see all'}
            </div>
          </ShowAllButton>
        }

        {(canShowEditingTools() && isBubbleGridFullscreen) &&
          <BubbleArrangeButton
            className='arrangeEntryButton'
            isArranging={mode === Mode.arrange}
            onClick={this.toggleArrangeMode}
          />
        }

        {isSavingArrangement &&
          <MaskAbsoluteFillParent show={isSavingArrangement}>
            <Spinnie show={isSavingArrangement} />
          </MaskAbsoluteFillParent>
        }
      </Root>
    )
  }

  getBubbleGridItemClasses({id}) {
    const {activeBubble} = this.props
    if (activeBubble && activeBubble.id === id) {
      return 'active'
    } else return ''
  }

  @autobind
  onClickShowAll() {
    this.props.dispatch(toggleFullscreenBubbleGrid())
    this.setState({
      mode: Mode.show,
      arrangeSourceIndex: null,
    })
  }

  @autobind
  toggleArrangeMode() {
    this.setState({
      mode: (this.state.mode === Mode.arrange)? Mode.show : Mode.arrange,
      arrangeSourceIndex: null,
    })
  }

  @autobind
  onClickArrangeButton(bubble) {
    const {arrangeSourceIndex} = this.state
    const index = this.props.bubbles.findIndex(b => b.id === bubble.id)

    if (arrangeSourceIndex) {
      this.rearrangeBubbles(arrangeSourceIndex, index)
    } else {
      this.setState({arrangeSourceIndex:  index})
    }
  }

  rearrangeBubbles(sourceIndex, destIndex) {
    const {bubbles} = this.props
    const destBubble = bubbles[destIndex]
    const sourceBubble = bubbles.splice(sourceIndex, 1)[0]
    const newDestBubbleIndex = bubbles.findIndex(b => b.id === destBubble.id)
    bubbles.splice(newDestBubbleIndex, 0, sourceBubble)

    this.setState({isSavingArrangement: true})

    fetch('/bubbles.update.arrangement', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bubbles),
    }).then(() => {
      this.props.dispatch(setBubbles(bubbles))
      this.setState({
        arrangeSourceIndex: null,
        isSavingArrangement: false
      })
    })
  }

}
