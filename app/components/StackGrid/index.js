import React from 'react'
import Bubbleverse from '../bubbleverse'

import {
  Root, StackRoot, CircleAmy, CircleSue, CirclePat, Title, CircleRoot,
} from './styled'
import {
  SectionHeader
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
        <SectionHeader>
          <hr />
          <div>get to know us</div>
        </SectionHeader>

        {DimensionValues.map(this.renderStack)}
      </Root>
    )
  }

  @autobind
  renderStack(s, i) {
    const {circleOffsets} = this
    return (
      <StackRoot key={i} onClick={() => this.onClickStack(i)}>
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
  onClickStack(i) {
    const dimension = DimensionTypes[i]
    this.props.dispatch(openBubbleverse(dimension))
  }

}
