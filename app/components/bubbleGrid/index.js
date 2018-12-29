import React from 'react'
import {findDOMNode} from 'react-dom'
import BubbleButton from '../bubble/bubbleButton'
import BubbleDetails from '../bubble/bubbleDetails'

import {
  Root, BubbleGridItem, ArrangeButton, ArrangeIcon,
} from './styled'

import autobind from 'autobind-decorator'
import {HeroBubbleConfig} from '../bubble/config'

const BDBubbles = [
  'twinkle', 'jamaica', 'magic', 'beauty', 'queen',
  'buy-postcards',
]
import {connect} from 'react-redux'

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension')
}))
export default class BubbleGrid extends React.PureComponent {

  constructor(props) {
    super(props)
    this.bubbleButtons = {}
    this.bubbleGridItems = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }

  @autobind
  openBubble(bubbleId) {
    const {focusedBubble} = this
    if (focusedBubble) {
      if (focusedBubble.id === bubbleId) return
      this.closeBubble()
    }

    this.bubbleButtons[bubbleId].onClick()
  }

  @autobind
  closeBubble() {
    const {id} = this.focusedBubble
    this.bubbleButtons[id].defocusIt()
    this.bubbleDetails.getWrappedInstance().close()
    this.props.onBubbleClosed()
    this.focusedBubble = null
    findDOMNode(this.bubbleGridItems[id]).style.zIndex = 0
  }

  render() {
    const {
      bubbles, hidden, onBubbleOpened, isArranging, onArrange,
      arrangeSourceIndex, dimension,
    } = this.props

    return (
      <Root
        id='bubbleGrid'
        hidden={!dimension}
        ref={r => this.bubbleGrid = r}>
        {bubbles.map((bubble, index) => (
          <BubbleGridItem
            innerRef={r => this.bubbleGridItems[bubble.id] = r}
            hidden={this.isBubbleHidden(bubble)}
            key={bubble.id}
            heroConfig={HeroBubbleConfig[bubble.id]}
            size={bubble.size}>

            {isArranging && (index !== 0) &&
              <ArrangeButton onClick={() => onArrange(index)}>
                <ArrangeIcon className={`fa
                  ${arrangeSourceIndex? 'fa-map-pin' : 'fa-bullseye'}`
                } />
              </ArrangeButton>
            }

            <BubbleButton
              onClick={this.onClickBubbleButton.bind(this, bubble)}
              disabled={isArranging}
              nucleus={bubble}
              ref={r => this.bubbleButtons[bubble.id] = r}
            />
          </BubbleGridItem>
        ))}

        <BubbleDetails
          onNext={this.onNextBubble}
          onEdit={this.props.onBubbleEdit}
          onClose={this.closeBubble}
          ref={r => this.bubbleDetails = r}
        />
      </Root>
    )
  }

  @autobind
  onClickBubbleButton(bubble) {
    this.focusedBubble = bubble
    this.bubbleDetails.getWrappedInstance().open(bubble)
    this.props.onBubbleOpened(bubble.id)
    findDOMNode(this.bubbleGridItems[bubble.id]).style.zIndex = 60
  }

  @autobind
  onNextBubble(bubbleId) {
    this.closeBubble()
    setTimeout(() => this.openBubble(bubbleId), 500)
  }

  @autobind
  isBubbleHidden({id, tags = ''}) {
    const {dimension} = this.props
    if (!dimension) return true

    const isFilteredOut = !tags.includes(dimension.toLowerCase())
    return (BDBubbles.includes(id) || isFilteredOut)
  }

}
