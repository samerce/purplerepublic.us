import React from 'react'

import {
  Root, TimelineRowRoot, TimelineDot, TimelineArrow, RowContentRoot,
  TimelineTitle, TimelineSubtitle,
} from './styled'

export default class Timeline extends React.Component {

  render() {
    return (
      <Root>
        {this.props.items.map(this.renderTimelineRow)}
        <TimelineRowRoot className='fadeIntoNothing' />
        </Root>
    )
  }

  renderTimelineRow(r, i) {
    const side = (i % 2) == 0? 'right' : 'left'
    const arrow = (i % 2) == 0? 'left' : 'right'
    return (
      <TimelineRowRoot className={side} key={i}>
        <TimelineDot />
        <TimelineArrow className={'fa fa-angle-' + arrow} />
        <RowContentRoot>
          <TimelineTitle>
            {r.title}
          </TimelineTitle>
          <TimelineSubtitle>
            {r.subtitle}
          </TimelineSubtitle>
          {r.render && r.render()}
        </RowContentRoot>
      </TimelineRowRoot>
    )
  }

}
