import React from 'react'
import BubbleButton from '.'
import Spinnie from '../../spinnie'

import {
  BubbleButtonBuilderRoot
} from './styled'

import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {
  openBubbleBuilder, updateBuilderNucleus
} from '../../bubbleverse/actions'

@connect(d => ({
  nucleus: d.get('bubbleverse').get('activeBubble'),
  isBubbleBuilderOpen: d.get('bubbleverse').get('isBubbleBuilderOpen'),
}))
export default class BubbleButtonBuilder extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingImage: false,
      imageUrl: null,
    }
  }

  render() {
    const {isBubbleBuilderOpen} = this.props
    const {isLoadingImage, imageUrl} = this.state
    const nucleus = isBubbleBuilderOpen? this.props.nucleus : {}
    return (
      <BubbleButtonBuilderRoot onClick={this.onClick}>
        {isLoadingImage?
          <Spinnie show={true} /> :
          (!imageUrl && nucleus.existingIndex === undefined) &&
          <i className={'prompt fa fa-' + (isBubbleBuilderOpen? 'image' : 'plus')} />
        }
        <input
          type='file'
          onChange={this.onChangeFileInput}
          ref={r => this.fileInput = r}
        />
        <BubbleButton
          {...this.props}
          disabled
          nucleus={nucleus}
          imageUrl={imageUrl}
          className='builder'
        />
      </BubbleButtonBuilderRoot>
    )
  }

  @autobind
  onClick() {
    const {isBubbleBuilderOpen, dispatch} = this.props
    if (isBubbleBuilderOpen) {
      this.fileInput.click()
    } else {
      dispatch(openBubbleBuilder())
    }
  }

  @autobind
  onChangeFileInput(e) {
    const reader = new FileReader()
    const file = e.target.files[0]

    this.setState({
      isLoadingImage: true,
    })
    reader.onloadend = () => {
      this.setState({
        isLoadingImage: false,
        imageUrl: reader.result,
      })
      this.props.dispatch(updateBuilderNucleus({imageUrl}))
    }
    reader.readAsDataURL(file)
  }

}
