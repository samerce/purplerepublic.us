import React from 'react'
import BubbleButton from '../bubble/bubbleButton'

import {
  Root, BubbleGridItem, ArrangeButton, ArrangeIcon, ShowAllButton,
  ScrollContainer,
} from './styled'

import {HeroBubbleConfig} from '../bubble/config'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {cx} from '../../utils/style'
import {toggleFullscreenBubbleGrid} from '../bubbleverse/actions'

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  visibleBubbles: d.get('bubbleverse').get('visibleBubbles'),
  isBubbleGridFullscreen: d.get('bubbleverse').get('isBubbleGridFullscreen'),
  isPoetcardCheckoutOpen: d.get('bubbles').get('isPoetcardCheckoutOpen'),
}))
export default class BubbleGrid extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state
  }

  render() {
    const {
      isArranging, onArrange, arrangeSourceIndex, dimension, visibleBubbles,
      isBubbleGridFullscreen, isPoetcardCheckoutOpen
    } = this.props

    return (
      <Root
        id='bubbleGrid'
        className={cx({
          showAll: isBubbleGridFullscreen,
          hidden: isPoetcardCheckoutOpen,
        })}>
        <ScrollContainer>
          <BubbleGridItem className='gapItem' />

          {visibleBubbles.map((bubble, index) => (
            <BubbleGridItem
              className={this.getBubbleGridItemClasses(bubble)}
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
                disabled={isArranging}
                nucleus={bubble}
              />
            </BubbleGridItem>
          ))}

          <BubbleGridItem className='gapItem' />
        </ScrollContainer>

        <ShowAllButton onClick={this.onClickShowAll}>
          <div>
            {isBubbleGridFullscreen? 'hide all' : 'show all'}
          </div>
        </ShowAllButton>
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
  }

}
