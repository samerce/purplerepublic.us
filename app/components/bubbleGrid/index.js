import React from 'react'
import BubbleButton from '../bubble/bubbleButton'

import {
  Root, BubbleGridItem, ArrangeButton, ArrangeIcon,
} from './styled'

import {HeroBubbleConfig} from '../bubble/config'
import {connect} from 'react-redux'

@connect(d => ({
  dimension: d.get('bubbleverse').get('dimension'),
  activeBubble: d.get('bubbleverse').get('activeBubble'),
  visibleBubbles: d.get('bubbleverse').get('visibleBubbles'),
}))
export default class BubbleGrid extends React.PureComponent {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props
  }

  render() {
    const {
      isArranging, onArrange, arrangeSourceIndex, dimension, visibleBubbles
    } = this.props

    return (
      <Root
        id='bubbleGrid'
        hidden={!dimension}>
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
      </Root>
    )
  }

  getBubbleGridItemClasses({id}) {
    const {activeBubble} = this.props
    if (activeBubble && activeBubble.id === id) {
      return 'active'
    } else return ''
  }

}
