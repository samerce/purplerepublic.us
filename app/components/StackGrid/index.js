import React from 'react'

import {
  Root, StackRoot, CircleAmy, CircleSue, CirclePat, Title, CircleRoot,
  Blurb, StackGroup,
} from './styled'
import {
  H1, H2,
} from '../../global/styled'

import autobind from 'autobind-decorator'
import {connect} from 'react-redux'

import {getButtonImageUrl} from '../../utils/bubbleverse'
import {Dimensions} from '../bubbleverse/config'
import {openBubbleverse} from '../bubbleverse/actions'

const randomOffset = (range) => Math.round(Math.random() * range)
const DimensionTypes = Object.keys(Dimensions)
const DimensionValues = Object.values(Dimensions)

@connect(d => ({}))
export default class StackGrid extends React.Component {

  constructor(props) {
    super(props)
    this.circleOffsets = []
    for (let i = 0; i < DimensionTypes.length; i++) {
      this.circleOffsets.push((randomOffset(10) + 5) * (Math.round(Math.random())? -1 : 1))
    }
  }

  render() {
    return (
      <Root>
        <H1>dive into us</H1>
        <H2>
          plunge into the dimensions below or&nbsp;
          <a href='#start/explore'>explore the overview</a>
        </H2>
        <StackGroup>
          {DimensionValues.map(this.renderStack)}
        </StackGroup>
      </Root>
    )
  }

  @autobind
  renderStack(s, i) {
    const {circleOffsets} = this
    return (
      <StackRoot key={i} onClick={(e) => this.onClickStack(i, e)}>
        <CircleRoot rotate={circleOffsets[i]}>
          <CircleAmy
            src={getButtonImageUrl(s.previewImages[0])}
          />
          <CircleSue
            src={getButtonImageUrl(s.previewImages[1])}
          />
          <CirclePat
            src={getButtonImageUrl(s.previewImages[2])}
          />
        </CircleRoot>

        <Title>{s.title}</Title>
      </StackRoot>
    )
  }

  @autobind
  onClickStack(i, event) {
    this.props.dispatch(openBubbleverse(DimensionTypes[i], {
      x: event.clientX,
      y: event.clientY,
    }))
    ga('send', 'event', {
      eventCategory: 'corkboard',
      eventAction: 'stack clicked',
      eventLabel: DimensionTypes[i],
    })
  }

  @autobind
  onClickExplore() {
    window.location = '#start/explore'
    ga('send', 'event', {
      eventCategory: 'corkboard',
      eventAction: 'explore clicked',
    })
  }

}
